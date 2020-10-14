import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { MyAuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: MyAuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.userSubject.pipe(map(user => {
            const isAUth = !!user;
            if(isAUth){
                return true;
            }else{
                return this.router.createUrlTree(['/auth']);
            }
        }));
    }

}