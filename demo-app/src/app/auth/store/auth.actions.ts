import { Action } from '@ngrx/store';

export const AUTH_SUCCESS = '[Auth] AUTH_SUCCESS';

export const LOGIN_START = '[Auth] LOGIN_START';

export const AUTH_FAIL = '[Auth] AUTH_FAIL';

export const LOGOUT = '[Auth] LOGOUT';

export const SIGNUP_START = '[Auth] SIGNUP_START';

export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';

export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';

export class AuthSuccessAction implements Action {
    readonly type = AUTH_SUCCESS;
    constructor(readonly payload: { email: string, id: string, token: string, tokenExpirationDate: Date, redirect: boolean }) { }
}

export class LoginStartAction implements Action {
    readonly type = LOGIN_START;
    constructor(readonly payload: { email: string, password: string }) { }
}

export class LogoutAction implements Action {
    readonly type = LOGOUT;
}

export class AuthFailAction implements Action {
    readonly type = AUTH_FAIL;
    constructor(readonly payload: string) { }
}


export class SignupStartAction implements Action {
    readonly type = SIGNUP_START;
    constructor(readonly payload: { email: string, password: string }) { }
}

export class ClearErrorAction implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLoginAction implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = AuthSuccessAction | LogoutAction | LoginStartAction | AuthFailAction
    | SignupStartAction | ClearErrorAction | AutoLoginAction;
