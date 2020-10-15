import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe.component';

const recipeRoutes: Routes = [
    {
        path: 'recipes', component: RecipeComponent,
        children: [
            { path: '', component: RecipeStartComponent, resolve: [RecipeResolverService] },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] }
        ],
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}
