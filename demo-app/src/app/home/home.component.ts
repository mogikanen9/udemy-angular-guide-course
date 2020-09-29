import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignInClick(): void {
    this.authService.signIn();
  }

  onSignOutClick(): void {
    this.authService.signOut();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
