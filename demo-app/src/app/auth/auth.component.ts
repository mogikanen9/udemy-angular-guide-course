import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggingService } from '../shared/logging.service';
import { AuthResponse } from './auth.model';
import { MyAuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: MyAuthService, private router: Router, private loggingService: LoggingService) { }

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
    this.error = null;

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
        this.error = errorMessage;
        this.isLoading = false;

      });

    authForm.reset();
  }

}
