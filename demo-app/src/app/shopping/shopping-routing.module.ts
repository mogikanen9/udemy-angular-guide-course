import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingComponent } from './shopping.component';

const shoppingRoutes: Routes = [
    { path: 'shopping-list', component: ShoppingComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(shoppingRoutes)
    ],
    exports: [RouterModule]
})
export class ShoppingRoutingModule {

}
