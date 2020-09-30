import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping/shopping.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    private theRecipes = [
        new Recipe('q1', 'Baked shripms with rice',
            ' Simple Description ',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636',
            [
                new Ingredient('Rice', 1),
                new Ingredient('Shrimp', 10)
            ]),
        new Recipe('a2', 'Super Salad', ' Super Salad Description2 ',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/epic-summer-salad-7539748.jpg?quality=90&resize=500%2C454',
            [
                new Ingredient('Tomatoes', 1),
                new Ingredient('Lattuce', 0.5),
                new Ingredient('Red Pepper', 0.5),
            ])
    ];


    constructor(private shoppingService: ShoppingService) { }

    get recipes(): Recipe[] {
        return this.theRecipes.slice();
    }

    addRecipe(newRecipe: Recipe): void {
        if (newRecipe) {
            this.theRecipes.push(newRecipe);
        } else {
            throw new Error('newRecipe cannot be undefined!');
        }
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]): void {
        this.shoppingService.addIngredients(ingredients);
    }

    getRecipeById(id: string): Recipe {
        const rs = this.theRecipes.filter((recipe) => recipe.rid === id);
        if (rs.length > 0) {
            return Object.assign(rs[0]);
        } else {
            throw new Error(`Recipe with id ${id} was not found!`);
        }
    }
}
