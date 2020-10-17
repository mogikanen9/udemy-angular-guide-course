import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyAuthService } from './auth.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { LoggingService } from '../shared/logging.service';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: MyAuthService, private loggingService: LoggingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loggingService.debug('AuthInterceptorService: inside');
        return this.authService.userSubject.pipe(take(1),
            exhaustMap((user) => {
                if (user && user !== null) {
                    const modifiedReq = req.clone({
                        params: new HttpParams().set('auth', user.token)
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