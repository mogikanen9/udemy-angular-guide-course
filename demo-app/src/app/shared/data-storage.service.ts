import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecipeService } from '../recipe/recipe.service';
import * as fromApp from '../store/app.reducer';
import { LoggingService } from './logging.service';

const RECIPES_API_URL = 'https://recipe-demo-service.firebaseio.com/recipes.json';




@Injectable()
export class DataStorageService {

    constructor(
        private recipeService: RecipeService,
        private http: HttpClient,
        private loggingService: LoggingService,
        private store: Store<fromApp.AppState>) { }

    saveRecepies(): void {

        this.store.select('recipes').subscribe((recipesState) => {

            this.http.put<{ name: string }>(RECIPES_API_URL,
                recipesState.recipes).subscribe((responseData) => {
                    this.loggingService.debug('saveRecepies#responseData->', responseData);
                });
        });

    }

}
