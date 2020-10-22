import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthRequest, AuthResponse } from '../auth.model';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

    return of(new AuthActions.LoginFailAction(errorMessage));
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
                    tap((data) => {
                        console.log(data);
                    }, map((responseData: AuthResponse) => {
                        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
                        return new AuthActions.LoginAction({
                            email: responseData.email,
                            id: responseData.localId,
                            token: responseData.idToken,
                            tokenExpirationDate: expirationDate
                        });
                    }),
                        catchError(error => {
                            return handleError(error);
                        }
                        )));
        })
    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(ofType(AuthActions.LOGIN), tap(() => {
        this.router.navigate(['/']);
    }));

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }

}
