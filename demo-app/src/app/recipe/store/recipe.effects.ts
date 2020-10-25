import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, exhaustMap, take, map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Injectable } from '@angular/core';

const RECIPES_API_URL = 'https://recipe-demo-service.firebaseio.com/recipes.json';

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipeActions.RECIPE_FETCH_ALL),
        switchMap(() => {
            return this.store.select('auth').pipe(take(1), map((userState) => userState.user.token));
        }),
        switchMap((token) => {
            return this.http.get<Recipe[]>(RECIPES_API_URL, {
                params: new HttpParams().set('auth', token)
            });
        }), map((respData): Recipe[] => {
            const recepeArray: Recipe[] = [];
            for (const key in respData) {
                if (respData.hasOwnProperty(key)) {
                    const recipe = respData[key];
                    recepeArray.push({ ...recipe, rid: key, ingredients: recipe.ingredients ? recipe.ingredients : [] });
                }
            }
            return recepeArray;
        }),
            map((recepeArray) => {
                return new RecipeActions.UpdateAllRecipes(recepeArray);
            }));

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>) { }
}

/**
 *
 *  return this.store.select('auth').pipe(take(1),
                exhaustMap((userState) => {
                    return this.http.get<Recipe[]>(RECIPES_API_URL, {
                        params: new HttpParams().set('auth', userState.user.token)
                    });
                }),
                map((respData): Recipe[] => {
                    const recepeArray: Recipe[] = [];
                    for (const key in respData) {
                        if (respData.hasOwnProperty(key)) {
                            const recipe = respData[key];
                            recepeArray.push({ ...recipe, rid: key, ingredients: recipe.ingredients ? recipe.ingredients : [] });
                        }
                    }
                    return recepeArray;
                })
            );
 */

/* return this.store.select('auth').pipe(take(1),
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
    this.store.dispatch(new RecipesActions.UpdateAllRecipes(recipes));
})
); */