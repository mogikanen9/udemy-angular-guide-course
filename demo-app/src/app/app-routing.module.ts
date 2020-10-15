import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectComponent } from './project/project.component';
import { ShoppingComponent } from './shopping/shopping.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent }, 
    { path: 'shopping-list', component: ShoppingComponent },
    { path: 'project', component: ProjectComponent },
    { path: 'auth', component: AuthComponent },
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