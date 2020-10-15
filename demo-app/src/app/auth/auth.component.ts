import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert/alert.component';
import { LoggingService } from '../shared/logging.service';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponse } from './auth.model';
import { MyAuthService } from './auth.service';

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

  constructor(
    private authService: MyAuthService,
    private router: Router,
    private loggingService: LoggingService,
    private componentFactoryResolver: ComponentFactoryResolver) { }
  ngOnDestroy(): void {
    if(this.alertEventSub){
      this.alertEventSub.unsubscribe();
    }
  }

  ngOnInit(): void {
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

    let operation: Observable<AuthResponse>;

    if (this.isLoginMode) {
      operation = this.authService.signIn({ email: emailValue, password: pwdValue, returnSecureToken: true });
    } else {
      operation = this.authService.signUp({ email: emailValue, password: pwdValue, returnSecureToken: true });
    }

    operation.subscribe(
      (resp: AuthResponse) => {
        this.loggingService.debug('resp->', resp);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, (errorMessage) => {
        // this.error = errorMessage;
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
      });

    authForm.reset();
  }

  onHandleError(): void {
    // this.error = null;
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
