import { Recipe } from './recipe.model';

export class RecipeService {

    private _recipies: Recipe[] = [
        new Recipe('Test Recipe', ' Simple Description ',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636'),
        new Recipe('Test2 Recipe2', ' Simple2 Description2 ',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/epic-summer-salad-7539748.jpg?quality=90&resize=500%2C454')
    ];

    get recipies(): Recipe[] {
        return this._recipies;
    }

    addRecipe(newRecipe: Recipe): void {
        if (newRecipe) {
            this._recipies.push(newRecipe);
        } else {
            throw new Error('newRecipe cannot be undefined!');
        }
    }
}
