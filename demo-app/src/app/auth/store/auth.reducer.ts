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

    console.log('auth reducer#action->', action);

    switch (action.type) {

        case AuthActions.LOGIN: {

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

        case AuthActions.LOGIN_START: {
            return {
                ...state,
                authError: null,
                loading: true
            };
        }

        case AuthActions.LOGIN_FAIL: {
            console.log('auth reducer#AuthActions.LOGIN_FAIL->', action.payload);
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };
        }

        default: {
            return {
                ...state
            };
        }
    }

}