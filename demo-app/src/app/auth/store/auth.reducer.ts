import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
    user: User;
}

const initialState: AuthState = {
    user: null
};

export function authReducer(state: AuthState = initialState, action: AuthActions.AuthActions): AuthState {
    switch (action.type) {

        case AuthActions.LOGIN: {

            const authUser = new User(action.payload.id, action.payload.email, action.payload._token, action.payload._tokenExpirationDate);

            return {
                ...state,
                user: authUser
            };
        }

        case AuthActions.LOGOUT: {
            return {
                ...state,
                user: null
            };
        }

        default: {
            return {
                ...state
            };
        }
    }

}