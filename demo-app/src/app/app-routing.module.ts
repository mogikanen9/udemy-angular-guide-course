import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectComponent } from './project/project.component';

const appRoutes: Routes = [
    
    // { path: 'recipes', loadChildren: () => import('./recipe/recipes.module').then(m => m.RecipesModule) },
    // { path: 'shopping-list', loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule) },
    { path: '', redirectTo: 'recipes', pathMatch: 'full'},
    { path: 'project', component: ProjectComponent },
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
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
        //RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}