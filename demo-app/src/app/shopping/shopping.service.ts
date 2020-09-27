import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../shared/logging.service';

@Injectable()
//named ShoppingListService in the udemy course tutorial
export class ShoppingService {

    ingredientUpdate = new EventEmitter<Ingredient[]>();

    constructor(private loggingService: LoggingService) { }

    private theIngredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Ketchup', 1)
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
}