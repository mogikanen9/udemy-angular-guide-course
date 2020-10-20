import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingActions from './shopping.actions';

export interface IngredientState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
}

const initialSTate: IngredientState = {
    ingredients: [
        new Ingredient('Salt', 1)
    ],
    editedIngredient: null
};
export function shoppingListReducer(
    state = initialSTate,
    action: ShoppingActions.ShoppingListActions): any {

    switch (action.type) {
        case ShoppingActions.ADD_INGREDIENT: {

            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        }

        case ShoppingActions.ADD_INGREDIENTS: {

            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        }

        case ShoppingActions.UPDATE_INGREDIENT: {

            const oldItem = state.editedIngredient;
            const idx = state.ingredients.map((e) => e.name).indexOf(oldItem.name);
            const udpatedIngredients = [...state.ingredients];
            if (idx >= 0) {
                udpatedIngredients[idx] = action.payload;
            } else {
                throw new Error(`Ingredient with name '${oldItem.name}' was not found to be udpated!`);
            }

            return {
                ...state,
                ingredients: udpatedIngredients,
                editedIngredient: null
            };
        }

        case ShoppingActions.DELETE_INGREDIENT: {

            const item = state.editedIngredient;
            const udpatedIngredients = [...state.ingredients];
            const idx = udpatedIngredients.map((e) => e.name).indexOf(item.name);
            if (idx >= 0) {
                udpatedIngredients.splice(idx, 1);
                return {
                    ...state,
                    ingredients: udpatedIngredients,
                    editedIngredient: null
                };
            } else {
                throw new Error(`Ingredient with name '${item.name}' was not found to be deleted!`);
            }
        }

        case ShoppingActions.START_EDIT_INGREDIENT: {
            return {
                ...state,
                editedIngredient: { ...action.payload }
            };
        }

        case ShoppingActions.STOP_EDIT_INGREDIENT: {
            return {
                ...state,
                editedIngredient: null
            };
        }

        default: return state;
    }
}
