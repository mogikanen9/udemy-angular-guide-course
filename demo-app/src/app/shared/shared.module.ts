import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
    declarations: [
        DropdownDirective,
        LoadingSpinnerComponent, AlertComponent, PlaceholderDirective
    ],
    exports: [
        DropdownDirective, LoadingSpinnerComponent, AlertComponent, PlaceholderDirective
    ]
})
export class SharedModule {

}