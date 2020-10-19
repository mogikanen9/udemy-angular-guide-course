import { Component, OnInit } from '@angular/core';
import { MyAuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: MyAuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}

