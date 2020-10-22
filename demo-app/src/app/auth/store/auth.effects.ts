import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse } from '../auth.model';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { MyAuthService } from '../auth.service';

const apiKey = environment.firebaseApiKey;

const handleError = (errorResponse) => {
    console.log('effect authLogin#error->', errorResponse);
    let errorMessage = 'Unknown server internal error';
    if (errorResponse.error && errorResponse.error.error) {

        switch (errorResponse.error.error.message) {


            case 'EMAIL_EXISTS': {
                errorMessage = 'Ups, Email already registered';
                break;
            }

            case 'EMAIL_NOT_FOUND': {
                errorMessage = 'Email not registered/Unknown user email';
                break;
            }

            case 'INVALID_PASSWORD': {
                errorMessage = 'Invalid password';
                break;
            }

            case 'USER_DISABLED': {
                errorMessage = 'User was dsabled';
                break;
            }
        }
    }

    return of(new AuthActions.AuthFailAction(errorMessage));
};

@Injectable()
export class AuthEffects {

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStartAction) => {
            return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map((responseData: AuthResponse) => {

                        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
                        const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);

                        localStorage.setItem('demoAppUserData', JSON.stringify(user));

                        this.authService.autoLogout(expirationDate.getTime() - new Date().getTime());

                        return new AuthActions.AuthSuccessAction({
                            email: responseData.email,
                            id: responseData.localId,
                            token: responseData.idToken,
                            tokenExpirationDate: expirationDate
                        });
                    }),
                    catchError(error => {
                        return handleError(error);
                    }
                    ));
        })
    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTH_SUCCESS), tap(() => {
        this.router.navigate(['/']);
    }));

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authData: AuthActions.SignupStartAction) => {
            return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map((responseData: AuthResponse) => {

                        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
                        const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);

                        localStorage.setItem('demoAppUserData', JSON.stringify(user));

                        this.authService.autoLogout(expirationDate.getTime() - new Date().getTime());

                        return new AuthActions.AuthSuccessAction({
                            email: responseData.email,
                            id: responseData.localId,
                            token: responseData.idToken,
                            tokenExpirationDate: expirationDate
                        });
                    }),
                    catchError(error => {
                        return handleError(error);
                    }
                    ));
        })
    );

    @Effect({ dispatch: false })
    autoLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
        this.router.navigate(['/auth']);
        localStorage.removeItem('demoAppUserData');
    }));

    @Effect()
    autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), map(() => {
        const userData = localStorage.getItem('demoAppUserData');
        if (!userData) {
            return { type: 'DEFAULT' };
        } else {
            const loadedUser = JSON.parse(userData);
            const user = new User(loadedUser.email, loadedUser.id, loadedUser._token, loadedUser._tokenExpirationDate);

            if (user.token) {

                const expDur = loadedUser._tokenExpirationDate.getTime() - new Date().getTime();
                this.authService.autoLogout(expDur);

                return new AuthActions.AuthSuccessAction({
                    id: loadedUser.id, email: loadedUser.email,
                    token: loadedUser._token, tokenExpirationDate: loadedUser._tokenExpirationDate
                });
            }

            return { type: 'DEFAULT' };

        }
    }));

    constructor(
        private actions$: Actions, private http: HttpClient, private router: Router,
        private authService: MyAuthService) { }

}
