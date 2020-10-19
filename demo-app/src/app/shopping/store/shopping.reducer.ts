import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingActions from './shopping.actions';

const initialSTate = {
    ingredients: [
        new Ingredient('Salt', 1)
    ]
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

            const idx = state.ingredients.map((e) => e.name).indexOf(action.payload.oldItem.name);
            const udpatedIngredients = [...state.ingredients];
            if (idx >= 0) {
                udpatedIngredients[idx] = action.payload.newItem;
            } else {
                throw new Error(`Ingredient with name '${action.payload.oldItem.name}' was not found to be udpated!`);
            }

            return {
                ...state,
                ingredients: udpatedIngredients
            };
        }

        case ShoppingActions.DELETE_INGREDIENT: {

            const item = action.payload;
            const udpatedIngredients = [...state.ingredients];
            const idx = udpatedIngredients.map((e) => e.name).indexOf(item.name);
            if (idx >= 0) {
                udpatedIngredients.splice(idx, 1);

                return {
                    ...state,
                    ingredients: udpatedIngredients
                };
            } else {
                throw new Error(`Ingredient with name '${item.name}' was not found to be deleted!`);
            }
        }

        default: return state;
    }
}
