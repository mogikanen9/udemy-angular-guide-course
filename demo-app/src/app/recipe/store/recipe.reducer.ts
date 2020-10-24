import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface RecipeState {
    recipes: Recipe[];
}

const initialState: RecipeState = {
    recipes: []
};


export function recipeReducer(state: RecipeState = initialState, action: RecipeActions.RecipeActions): RecipeState {

    switch (action.type) {

        case RecipeActions.RECIPE_ADD: {
            const copy = [...state.recipes];
            copy.push(action.payload);
            return {
                ...state,
                recipes: copy
            };
        }

        case RecipeActions.RECIPE_DELETE: {

            const copy = state.recipes.slice();
            const recipe = action.payload;

            const idx = copy.map((e) => e.rid).indexOf(recipe.rid);
            if (idx >= 0) {
                copy.splice(idx, 1);
            } else {
                console.log(`Recipe with id '${recipe.rid}' was not found to be deleted!`);
            }

            return {
                ...state,
                recipes: copy
            };
        }

        case RecipeActions.RECIPE_UPDATE: {

            const copy = state.recipes.slice();
            const updatedRecipe = action.payload;
            const index = copy.findIndex((rcp) => rcp.rid === updatedRecipe.rid);
            if (index !== -1) {
                copy[index] = Object.assign(updatedRecipe);
            } else {
                console.log(`updateRecipe. Recipe with id ${updatedRecipe.rid} was not found!`);
            }

            return {
                ...state,
                recipes: copy
            };
        }

        case RecipeActions.RECIPE_UPDATE_ALL: {

            return {
                ...state,
                recipes: action.payload.slice()
            };
        }

        default: {
            return {
                ...state
            };
        }

    }
}