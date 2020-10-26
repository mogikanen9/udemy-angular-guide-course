import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingActions from '../shopping/store/shopping.actions';
import { AppState } from '../store/app.reducer';


@Injectable()
export class RecipeService {

    constructor(
        private store: Store<AppState>) { }

    addIngredientsToShoppingList(ingredients: Ingredient[]): void {
        this.store.dispatch(new ShoppingActions.AddIngredients(ingredients));
    }

    genNewRecupeId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

}
