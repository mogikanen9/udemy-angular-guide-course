import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthRequest, AuthResponse } from './auth.model';

const apiKey = 'AIzaSyDzyAO0rVzPTCbVy6eROPRoECKDmtt27jE';

@Injectable({ providedIn: 'root' })
export class MyAuthService {

    constructor(private http: HttpClient) { }

    signUp(request: AuthRequest): Observable<AuthResponse> {

        return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
            request).pipe(catchError(this.handleError));
    }

    signIn(signInRequest: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
            signInRequest).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse): Observable<never> {
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
}