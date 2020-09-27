import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../shared/logging.service';

@Injectable()
export class ShoppingService {

    constructor(private loggingService: LoggingService) { }

    private _ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Ketchup', 1)
    ];

    get ingredients(): Ingredient[] {
        return this._ingredients;
    }

    addIngredient(newIngedient: Ingredient): void {
        if (newIngedient) {
            this._ingredients.push(newIngedient);
            this.loggingService.log('ShoppingService#addIngredient->' + newIngedient);
        } else {
            throw new Error('newIngredient cannot be undefined!');
        }
    }
}