import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSignUpRequest, AuthSignUpResponse } from './auth.model';

const apiKey = 'AIzaSyDzyAO0rVzPTCbVy6eROPRoECKDmtt27jE';

@Injectable({ providedIn: 'root' })
export class MyAuthService {

    constructor(private http: HttpClient) { }

    signUp(request: AuthSignUpRequest): Observable<AuthSignUpResponse> {

        return this.http.post<AuthSignUpResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
            request);
    }
}