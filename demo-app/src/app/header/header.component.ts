import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogoutAction } from '../auth/store/auth.actions';
import { FetchAllRecipes } from '../recipe/store/recipe.actions';
import { DataStorageService } from '../shared/data-storage.service';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import { AboutComponent } from './about/about.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  userSub: Subscription;
  isAuthenticated = false;

  @ViewChild(PlaceholderDirective, { static: false }) appAboutHost: PlaceholderDirective;

  private aboutSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }

  ngAfterViewInit(): void {
    console.log('appAboutHost->', this.appAboutHost);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.store.select('auth').pipe(map(userState => userState.user)).subscribe(user => {
      this.isAuthenticated = (user && user != null);
    });
  }

  onFetchClick(): void {
    this.store.dispatch(new FetchAllRecipes());
  }

  onSaveClick(): void {
    this.dataStorageService.saveRecepies();
  }

  onLogout(): void {
    this.store.dispatch(new LogoutAction());
  }

  onAboutClick(): void {
    this.loadAboutDilg();
  }

  loadAboutDilg(): void {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AboutComponent);

    const viewContainerRef = this.appAboutHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AboutComponent>(componentFactory);
    componentRef.instance.data = 'This demo app is cool';

    this.aboutSub = componentRef.instance.close.subscribe(() => {
      this.aboutSub.unsubscribe();
      viewContainerRef.clear();
    });

  }

}
