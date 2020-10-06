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

    recipeUpdates = new Subject<Recipe[]>();

    constructor(private shoppingService: ShoppingService) { }

    get recipes(): Recipe[] {
        return this.theRecipes.slice();
    }

    addRecipe(newRecipe: Recipe): void {

        if (newRecipe && newRecipe.rid) {
            this.theRecipes.push(Object.assign(newRecipe));
            this.recipeUpdates.next(this.recipes);
        } else {
            throw new Error('newRecipe or newRecipe.rid cannot be undefined!');
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
            throw new Error(`getRecipeById. Recipe with id ${id} was not found!`);
        }
    }

    updateRecipe(updatedRecipe: Recipe): void {
        const index = this.theRecipes.findIndex((rcp) => rcp.rid === updatedRecipe.rid);
        console.log('index->', index);
        if (index !== -1) {
            this.theRecipes[index] = Object.assign(updatedRecipe);
            this.recipeUpdates.next(this.recipes);
        } else {
            throw new Error(`updateRecipe. Recipe with id ${updatedRecipe.rid} was not found!`);
        }
    }

    genNewRecupeId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteRecipe(recipe: Recipe): void {
        const idx = this.theRecipes.map((e) => e.rid).indexOf(recipe.rid);
        if (idx >= 0) {
            this.theRecipes.splice(idx, 1);
            this.recipeUpdates.next(this.recipes);
        } else {
            throw new Error(`Recipe with id '${recipe.rid}' was not found to be deleted!`);
        }
    }
}
