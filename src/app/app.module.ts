import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule }   from '@angular/router';
import { AppComponent } from './app.component';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule }   from '@angular/forms';
import { LoginService} from './service/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
  ],
imports: [
  AppRoutingModule,
  NgbPaginationModule,
  NgbAlertModule,
  NgbModule,
  BrowserModule,
  FormsModule,
  RouterModule.forRoot([
    { path: 'menu', component: MenuComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }
  ])
],
// サービスを登録する (これでDIすればアプリ全体で共有されることになる)
providers: [LoginService],
bootstrap: [AppComponent]
})
export class AppModule { }
