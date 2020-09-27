import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../shared/logging.service';

@Injectable()
//named ShoppingListService in the udemy course tutorial
export class ShoppingService {

    ingredientUpdate = new EventEmitter<Ingredient[]>();

    constructor(private loggingService: LoggingService) { }

    private theIngredients: Ingredient[] = [
        new Ingredient('Salt', 1)
    ];

    get ingredients(): Ingredient[] {
        return this.theIngredients.slice();
    }

    addIngredient(newIngedient: Ingredient): void {
        if (newIngedient) {
            this.theIngredients.push(newIngedient);
            this.loggingService.log('ShoppingService#addIngredient->' + newIngedient);
            this.ingredientUpdate.emit(this.theIngredients.slice());
        } else {
            throw new Error('newIngredient cannot be undefined!');
        }
    }

    addIngredients(newIngedients: Ingredient[]): void {
        if(this.ingredients){
            this.theIngredients.push(...newIngedients);
            this.ingredientUpdate.emit(this.theIngredients.slice());
        }else {
            throw new Error('newIngedients cannot be undefined!');
        }
    }
}