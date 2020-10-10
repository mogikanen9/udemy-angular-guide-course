import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
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

  constructor(private authService: MyAuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      console.log('Auth Form is invalid');
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
        console.log('resp->', resp);
        console.log('idTOken->', resp.idToken);
        this.isLoading = false;
      }, (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;

      });

    authForm.reset();
  }

}
