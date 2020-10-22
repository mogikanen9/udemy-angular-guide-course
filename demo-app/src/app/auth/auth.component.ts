import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert/alert.component';
import { LoggingService } from '../shared/logging.service';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponse } from './auth.model';
import { MyAuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { AuthState } from './store/auth.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  // error: string = null;

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  private alertEventSub: Subscription;

  private storeSub: Subscription;

  constructor(
    // private authService: MyAuthService,
    // private router: Router,
    private loggingService: LoggingService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    if (this.alertEventSub) {
      this.alertEventSub.unsubscribe();
    }

    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState: AuthState) => {
      this.isLoading = authState.loading;
      if (authState.authError) {
        this.showErrorAlert(authState.authError);
      }
    });
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      this.loggingService.debug('Auth Form is invalid');
      return;
    }
    const value = authForm.form.value;
    const emailValue = value.email;
    const pwdValue = value.pwd;

    this.isLoading = true;
    // this.error = null;

    // let operation: Observable<AuthResponse>;

    if (this.isLoginMode) {
      // operation = this.authService.signIn({ email: emailValue, password: pwdValue, returnSecureToken: true });
      this.store.dispatch(new AuthActions.LoginStartAction({ email: emailValue, password: pwdValue }));
    } else {
      this.store.dispatch(new AuthActions.SignupStartAction({ email: emailValue, password: pwdValue }));
      // operation = this.authService.signUp({ email: emailValue, password: pwdValue, returnSecureToken: true });
    }

    /* operation.subscribe(
      (resp: AuthResponse) => {
        this.loggingService.debug('resp->', resp);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, (errorMessage) => {
        // this.error = errorMessage;
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
      }); */



    authForm.reset();
  }

  onHandleError(): void {
    this.store.dispatch(new AuthActions.ClearErrorAction());
  }

  private showErrorAlert(msg: string): void {

    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // clear what was rendered before

    const myAlertRef = hostViewContainerRef.createComponent(alertComponentFactory);

    myAlertRef.instance.message = msg;
    this.alertEventSub = myAlertRef.instance.close.subscribe(() => {
      this.alertEventSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
