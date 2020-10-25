import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Recipe } from './recipe.model';
import * as RecipeActions from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(
        // private dataStorageService: DataStorageService,
        // private recipeService: RecipeService.
        private store: Store<fromApp.AppState>,
        private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {


        this.store.dispatch(new RecipeActions.FetchAllRecipes());
        return this.actions$.pipe(ofType(RecipeActions.RECIPE_UPDATE_ALL), take(1));

        // const recipes = this.recipeService.recipes;
/*         this.store.select('recipes').subscribe((recipesState) => {

            const recipes = recipesState.recipes;

            if (recipes.length === 0) {
                return this.dataStorageService.fetchRecipes();
            } else {
                return recipes;
            }
        });
 */
    }

}
