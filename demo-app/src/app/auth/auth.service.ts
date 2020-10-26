import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as AuthActions from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';

const apiKey = environment.firebaseApiKey;

@Injectable()
export class MyAuthService {

    private tokenExpTimer: any;

    constructor(
        private store: Store<fromApp.AppState>) { }

    autoLogout(expDuration: number): void {
        this.tokenExpTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.LogoutAction());

        }, expDuration);
    }

    clearLogoutTimer(): void {
        if (this.tokenExpTimer) {
            this.tokenExpTimer = null;
        }
    }
}
