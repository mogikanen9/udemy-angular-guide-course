import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {

    private theRecipies = [
        new Recipe('Test Recipe', ' Simple Description ',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636'),
        new Recipe('Test2 Recipe2', ' Simple2 Description2 ',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/epic-summer-salad-7539748.jpg?quality=90&resize=500%2C454')
    ];

    recepeSelected = new EventEmitter<Recipe>();

    get recipies(): Recipe[] {
        return this.theRecipies.slice();
    }

    addRecipe(newRecipe: Recipe): void {
        if (newRecipe) {
            this.theRecipies.push(newRecipe);
        } else {
            throw new Error('newRecipe cannot be undefined!');
        }
    }
}
