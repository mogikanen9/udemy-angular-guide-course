import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = '[Auth] LOGIN';

export const LOGIN_START = '[Auth] LOGIN_START';

export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';

export const LOGOUT = '[Auth] LOGOUT';

export class LoginAction implements Action {
    readonly type = LOGIN;
    constructor(readonly payload: { email: string, id: string, token: string, tokenExpirationDate: Date }) { }
}

export class LoginStartAction implements Action {
    readonly type = LOGIN_START;
    constructor(readonly payload: { email: string, password: string }) { }
}

export class LogoutAction implements Action {
    readonly type = LOGOUT;
}

export class LoginFailAction implements Action {
    readonly type = LOGIN_FAIL;
    constructor(readonly payload: string) { }
}

export type AuthActions = LoginAction | LogoutAction | LoginStartAction | LoginFailAction;
