import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
// import { MyAuthService } from '../auth/auth.service';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import { LoggingService } from './logging.service';

const RECIPES_API_URL = 'https://recipe-demo-service.firebaseio.com/recipes.json';


import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipe/store/recipe.actions';


@Injectable()
export class DataStorageService {

    constructor(
        private recipeService: RecipeService,
        private http: HttpClient,
        private loggingService: LoggingService,
        // private authService: MyAuthService,
        private store: Store<fromApp.AppState>) { }

    saveRecepies(): void {

        //const recipes = this.recipeService.recipes;


        this.store.select('recipes').subscribe1111((recipesState) => {

            this.http.put<{ name: string }>(RECIPES_API_URL,
                recipesState.recipes).subscribe((responseData) => {
                    this.loggingService.debug('saveRecepies#responseData->', responseData);
                });
        });



        /*this.authService.userSubject.pipe(take(1),
            exhaustMap((user) => {
                return this.http.put<{ name: string }>(RECIPES_API_URL,
                    recipes, {
                    params: new HttpParams().set('auth', user.token)
                });
            })
        ).subscribe((responseData) => {
            this.loggingService.debug('saveRecepies#responseData->', responseData);
        });*/
    }

    fetchRecipes(): Observable<Recipe[]> {

        /**
         * Not really needed since the code to add user token was added to AuthInterceptrService and
         * works for all HTTP requests
         * Keep it for DEMO purpose only
         */
        return this.store.select('auth').pipe(take(1),
            exhaustMap((userState) => {
                return this.http.get<Recipe[]>(RECIPES_API_URL, {
                    params: new HttpParams().set('auth', userState.user.token)
                });
            }),
            map((respData) => {
                const recepeArray: Recipe[] = [];
                for (const key in respData) {
                    if (respData.hasOwnProperty(key)) {
                        const recipe = respData[key];
                        recepeArray.push({ ...recipe, rid: key, ingredients: recipe.ingredients ? recipe.ingredients : [] });
                    }
                }
                return recepeArray;
            }),
            tap((recipes) => {
                 // this.recipeService.updateAllRecipes(recipes);
                this.store.dispatch(new RecipesActions.UpdateAllRecipes(recipes));
            })
        );

        /*return this.http.get<Recipe[]>(RECIPES_API_URL)
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
            )
            ;*/
    }
}
