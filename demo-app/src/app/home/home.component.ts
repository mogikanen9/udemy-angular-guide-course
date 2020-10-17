import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyAuthService } from '../auth/auth.service';
import { AboutComponent } from '../header/about/about.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective, { static: false }) myHost: PlaceholderDirective;
  private aboutSub: Subscription;

  // @ViewChildren(PlaceholderAboutDirective) formatHostDirectives: QueryList<PlaceholderAboutDirective>;

  // private firstSub: Subscription;

  constructor(private authService: MyAuthService, private componentFactoryResolver: ComponentFactoryResolver) { }
  ngOnDestroy(): void {
    // this.firstSub.unsubscribe();
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
    // this.authService.signIn();
  }

  onSignOutClick(): void {
    // this.authService.signOut();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onAboutClick(): void {
    // this.showErrorAlert('koko');
    this.loadAboutDilg();
  }

  loadAboutDilg(): void {


    console.log('loadAlertDilg');

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AboutComponent);

    const viewContainerRef = this.myHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AboutComponent>(componentFactory);
    componentRef.instance.data = 'This demo app is cool';
    console.log('loadAlertDilg created');

    this.aboutSub = componentRef.instance.close.subscribe(() => {
      this.aboutSub.unsubscribe();
      viewContainerRef.clear();
    });


  }

}
