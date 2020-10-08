import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

    fetchRecipes(): void {
        this.http.get<{ [key: string]: Recipe }>(RECIPES_API_URL)
            .pipe(map((respData) => {
                const recepeArray: Recipe[] = [];
                for (const key in respData) {
                    if (respData.hasOwnProperty(key)) {
                        recepeArray.push({ ...respData[key], rid: key });
                    }
                }
                return recepeArray;
            })).subscribe((recipes) => {
                this.recipeService.updateAllRecipes(recipes);
            });
    }
}
