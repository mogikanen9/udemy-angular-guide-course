import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth-guard.service';
import { MyAuthService } from './auth/auth.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { LoggingService } from './shared/logging.service';
import { ShoppingEditComponent } from './shopping/shopping-edit/shopping-edit.component';
import { ShoppingListItemComponent } from './shopping/shopping-list/shopping-list-item/shopping-list-item.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProjectComponent } from './project/project.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipeResolverService } from './recipe/recipe-resolver.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipeService } from './recipe/recipe.service';
import { ShoppingService } from './shopping/shopping.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipe/recipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingComponent,
    ShoppingListComponent,

    ShoppingEditComponent,
    ShoppingListItemComponent,
    DropdownDirective,
    HomeComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    ProjectComponent, AuthComponent, LoadingSpinnerComponent, AlertComponent, PlaceholderDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RecipesModule,
    AppRoutingModule
  ],
  providers: [LoggingService, AuthGuard, MyAuthService, ShoppingService, RecipeService,
    DataStorageService, RecipeResolverService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
