import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectComponent } from './project/project.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipe/recipe-resolver.service';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AuthGuard } from './shared/auth-guard.service';
import { ShoppingComponent } from './shopping/shopping.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'recipes', component: RecipeComponent,
        children: [
            { path: '', component: RecipeStartComponent, resolve: [RecipeResolverService] },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]},
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] }
        ]
    },
    { path: 'shopping-list', component: ShoppingComponent, canActivate: [AuthGuard] },
    { path: 'project', component: ProjectComponent},
    { path: 'auth', component: AuthComponent},
    { path: '404', component: PageNotFoundComponent },
    {
        path: '500', component: ErrorPageComponent,
        data: {
            message: 'My Error Message'
        }
    },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
        //RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}