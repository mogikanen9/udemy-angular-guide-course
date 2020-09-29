import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AuthGuard } from './shared/auth-guard.service';
import { ShoppingComponent } from './shopping/shopping.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'recipies', component: RecipeComponent , canActivate: [AuthGuard]},
    { path: 'shopping-list', component: ShoppingComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}