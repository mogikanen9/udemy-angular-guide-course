import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot([{ path: 'auth', component: AuthComponent }])
    ],
    exports: [RouterModule]

})
export class AuthModule {

}
