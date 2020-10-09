import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';

const RECIPES_API_URL = 'https://recipe-demo-service.firebaseio.com/recipes.json';

@Injectable()
export class DataStorageService {

    constructor(private recipeService: RecipeService, private http: HttpClient) { }

    saveRecepies(): void {

        const recipes = this.recipeService.recipes;

        this.http.put<{ name: string }>(RECIPES_API_URL,
            recipes).subscribe((responseData) => {
                console.log('responseData->', responseData);
            });
    }

    fetchRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(RECIPES_API_URL)
            .pipe(map((respData) => {
                const recepeArray: Recipe[] = [];
                for (const key in respData) {
                    if (respData.hasOwnProperty(key)) {
                        const recipe = respData[key];
                        recepeArray.push({ ...recipe, rid: key, ingredients: recipe.ingredients ? recipe.ingredients : [] });
                    }
                }
                return recepeArray;
            }), tap((recipes) => {
                this.recipeService.updateAllRecipes(recipes);
            })
            )/* .subscribe((recipes) => {
                this.recipeService.updateAllRecipes(recipes);
            }) */
            ;
    }
}
