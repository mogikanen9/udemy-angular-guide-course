import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(state: AuthState = initialState, action: AuthActions.AuthActions): AuthState {

    switch (action.type) {

        case AuthActions.AUTH_SUCCESS: {

            const authUser = new User(action.payload.id, action.payload.email, action.payload.token, action.payload.tokenExpirationDate);

            return {
                ...state,
                user: authUser,
                loading: false,
                authError: null
            };
        }

        case AuthActions.LOGOUT: {
            return {
                ...state,
                user: null,
                loading: false,
                authError: null
            };
        }

        // group login start and signup start together
        case AuthActions.LOGIN_START:

        case AuthActions.SIGNUP_START: {
            return {
                ...state,
                authError: null,
                loading: true
            };
        }

        case AuthActions.AUTH_FAIL: {
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };
        }

        case AuthActions.CLEAR_ERROR: {
            return {
                ...state,
                authError: null
            };
        }

        default: {
            return {
                ...state
            };
        }
    }

}