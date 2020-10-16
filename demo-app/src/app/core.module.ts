import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { MyAuthService } from './auth/auth.service';
import { RecipeResolverService } from './recipe/recipe-resolver.service';
import { RecipeService } from './recipe/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { LoggingService } from './shared/logging.service';
import { ShoppingService } from './shopping/shopping.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    providers: [LoggingService, AuthGuard, MyAuthService, ShoppingService, RecipeService,
        DataStorageService, RecipeResolverService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
})
export class CoreModule {

}