import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggingService } from '../shared/logging.service';
import { AuthRequest, AuthResponse } from './auth.model';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

const apiKey = environment.firebaseApiKey;

@Injectable()
export class MyAuthService {

    // userSubject = new BehaviorSubject<User>(null);
    private tokenExpTimer: any;

    constructor(
        // private http: HttpClient, private loggingService: LoggingService,
        // private router: Router, 
        private store: Store<fromApp.AppState>) { }

    /* signUpRenamed(request: AuthRequest): Observable<AuthResponse> {
 
         const emitUserInfo = tap<AuthResponse>({
             next: (responseData) => {
                 this.handleAuthentication(
                     responseData.email, responseData.localId,
                     responseData.idToken, +responseData.expiresIn);
             }
         });
 
         return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
             request).pipe(catchError(this.handleErrorRenamed), emitUserInfo);
     }
 
     signInRenamed(signInRequest: AuthRequest): Observable<AuthResponse> {
         const emitUserInfo = tap<AuthResponse>({
             next: (responseData) => {
                 this.handleAuthentication(
                     responseData.email, responseData.localId,
                     responseData.idToken, +responseData.expiresIn);
             }
         });
         return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
             signInRequest).pipe(catchError(this.handleErrorRenamed), emitUserInfo);
     }*/

    /* private handleErrorRenamed(errorResponse: HttpErrorResponse): Observable<never> {
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

        return throwError(errorMessage);
    }
 */
    /*     private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
    
            const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
            const user = new User(email, userId, token, expirationDate);
            // this.userSubject.next(user);
            this.store.dispatch(new AuthActions.AuthSuccessAction({ id: userId, email, token, tokenExpirationDate: expirationDate }));
    
            this.loggingService.debug('handleAuthentication#user emited->', user);
    
            localStorage.setItem('demoAppUserData', JSON.stringify(user));
            this.autoLogout(+expiresIn * 1000);
    
        }
     */
    /*  autoLoginRenamed(): void {
         const userData = localStorage.getItem('demoAppUserData');
         if (!userData) {
             return;
         } else {
             const loadedUser = JSON.parse(userData);
             const user = new User(loadedUser.email, loadedUser.id, loadedUser._token, loadedUser._tokenExpirationDate);
 
             if (user.token) {
                 // this.userSubject.next(user);
                 this.store.dispatch(new AuthActions.AuthSuccessAction({
                     id: loadedUser.id, email: loadedUser.email,
                     token: loadedUser._token, tokenExpirationDate: loadedUser._tokenExpirationDate
                 }));
                 const expDur = loadedUser._tokenExpirationDate.getTime() - new Date().getTime();
                 this.autoLogout(expDur);
             }
         }
 
     } */

    /* isAuthenticated(): boolean {
        return true;
    } */

    /* logoutRenamed(): void {
        // this.userSubject.next(null);
        this.store.dispatch(new AuthActions.LogoutAction());
        this.router.navigate(['/auth']);
        localStorage.removeItem('demoAppUserData');
        if (this.tokenExpTimer) {
            clearTimeout(this.tokenExpTimer);
        }
    } */

    autoLogout(expDuration: number): void {
        this.tokenExpTimer = setTimeout(() => {
            //       this.logoutRenamed();
            this.store.dispatch(new AuthActions.LogoutAction());

        }, expDuration);
    }

    clearLogoutTimer(): void {
        if (this.tokenExpTimer) {
            this.tokenExpTimer = null;
        }
    }
}
