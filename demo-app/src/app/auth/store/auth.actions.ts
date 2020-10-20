import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class LoginAction implements Action {
    readonly type = LOGIN;
    constructor(readonly payload: { email: string, id: string, _token: string, _tokenExpirationDate: Date }) { }
}

export class LogoutAction implements Action {
    readonly type = LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction;
