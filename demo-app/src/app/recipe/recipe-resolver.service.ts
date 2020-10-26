import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, tap, map, switchMap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Recipe } from './recipe.model';
import * as RecipeActions from './store/recipe.actions';
import { RecipeState } from './store/recipe.reducer';
@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

        return this.store.select('recipes').pipe(take(1), switchMap((recipeState) => {

            console.log('recipeState.recipes.length->', recipeState.recipes.length);
            if (recipeState.recipes.length === 0) {
                this.store.dispatch(new RecipeActions.FetchAllRecipes());
                return this.actions$.pipe(ofType(RecipeActions.RECIPE_UPDATE_ALL), take(1));
            } else {
                return of(recipeState.recipes);
            }

        }));
    }

}
