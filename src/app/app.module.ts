import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
//import { RouterModule }   from '@angular/router';
//import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import { LoginComponent } from './login/login.component';
//import { MenuComponent } from './menu/menu.component';
//import { LoginService} from './service/login.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SignupComponent } from './component/signup/signup.component';
import { PetComponent } from './component/pet/pet.component';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HistorylistComponent } from './component-main-tab/historylist/historylist.component';
import { HistoryComponent } from './component-main-tab/history/history.component';
import { JsonComponent } from './component-main-tab/json/json.component';
import { ProfileComponent } from './component-sub01-tab/profile/profile.component';
import { CompanyComponent } from './component-sub01-tab/company/company.component';
import { ReportlistComponent } from './component-sub01-tab/reportlist/reportlist.component';
import { MaintabCtlComponent } from './component-main-tab/maintab-ctl/maintab-ctl.component';
import { Sub01tabCtlComponent } from './component-sub01-tab/sub01tab-ctl/sub01tab-ctl.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/*
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    SignupComponent,
    PetComponent,
    HomeComponent,
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
******/
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PetComponent,
    HistorylistComponent,
    HistoryComponent,
    JsonComponent,
    ProfileComponent,
    CompanyComponent,
    ReportlistComponent,
    MaintabCtlComponent,
    Sub01tabCtlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
