import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { MyAuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { LoggingService } from '../shared/logging.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        // private authService: MyAuthService, 
        private loggingService: LoggingService,
        private store: Store<fromApp.AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loggingService.debug('AuthInterceptorService: inside');
        return this.store.select('auth').pipe(take(1),
            exhaustMap((userState) => {
                if (userState && userState !== null && userState.user != null) {
                    const modifiedReq = req.clone({
                        params: new HttpParams().set('auth', userState.user.token)
                    });
                    this.loggingService.debug('AuthInterceptorService: request was cloned', modifiedReq);
                    return next.handle(modifiedReq);
                } else {
                    return next.handle(req);
                }
            })
        );
    }

}