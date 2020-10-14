import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyAuthService } from '../auth/auth.service';
import { interval, Subscription, Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  //private firstSub: Subscription;

  constructor(private authService: MyAuthService) { }
  ngOnDestroy(): void {
    //this.firstSub.unsubscribe();
  }

  ngOnInit(): void {
    /*this.firstSub = interval(1000).subscribe((count) => {
      console.log('count->', count);
    });*/
    /*const customIntervalObservable = Observable.create((observer: Observer<number>) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
       }, 1000);
    });

    customIntervalObservable.subscribe((count) => {
      //console.log('count2->', count);
    });*/
  }

  onSignInClick(): void {
    //this.authService.signIn();
  }

  onSignOutClick(): void {
    //this.authService.signOut();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
