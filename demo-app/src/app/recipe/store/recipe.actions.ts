import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';


export const RECIPE_ADD = '[Recipe] RECIPE_ADD';
export const RECIPE_DELETE = '[Recipe] RECIPE_DELETE';
export const RECIPE_UPDATE = '[Recipe] RECIPE_UPDATE';
export const RECIPE_UPDATE_ALL = '[Recipe] RECIPE_UPDATE_ALL';
export const RECIPE_FETCH_ALL = '[Recipe] RECIPE_FETCH_ALL';

export class AddRecipe implements Action {
    readonly type = RECIPE_ADD;
    constructor(readonly payload: Recipe) { }
}

export class DeleteRecipe implements Action {
    readonly type = RECIPE_DELETE;
    constructor(readonly payload: Recipe) { }
}

export class UpdateRecipe implements Action {
    readonly type = RECIPE_UPDATE;
    constructor(readonly payload: Recipe) { }
}

export class UpdateAllRecipes implements Action {
    readonly type = RECIPE_UPDATE_ALL;
    constructor(readonly payload: Recipe[]) { }
}

export class FetchAllRecipes implements Action {
    readonly type = RECIPE_FETCH_ALL;
}


export type RecipeActions = AddRecipe | DeleteRecipe | UpdateRecipe | UpdateAllRecipes | FetchAllRecipes;
