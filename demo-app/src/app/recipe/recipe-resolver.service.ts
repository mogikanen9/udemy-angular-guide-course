import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(
        private dataStorageService: DataStorageService,
        // private recipeService: RecipeService.
        private store: Store<fromApp.AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

        // const recipes = this.recipeService.recipes;
        this.store.select('recipes').subscribe((recipesState) => {

            const recipes = recipesState.recipes;

            if (recipes.length === 0) {
                return this.dataStorageService.fetchRecipes();
            } else {
                return recipes;
            }
        });

    }

}
