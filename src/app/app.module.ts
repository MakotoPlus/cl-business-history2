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
import { MaintabCtlComponent } from './component-main-tab/maintab-ctl/maintab-ctl.component';
import { Sub01tabCtlComponent } from './component-sub01-tab/sub01tab-ctl/sub01tab-ctl.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { EmailchangeComponent } from './component/emailchange/emailchange.component';
import { UserinfoComponent } from './component/userinfo/userinfo.component';
import { ModalConfirmComponent } from './component/common/modal-confirm/modal-confirm.component';
import { UserinfoConfirmComponent } from './component/userinfo-confirm/userinfo-confirm.component';
import { UserinfoDeleteComponent } from './component/userinfo-delete/userinfo-delete.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DemoMaterialModule} from './material-module';
import {MatDatepicker} from '@angular/material/datepicker';
import { OutputComponent } from './component-sub01-tab/output/output.component';

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
    MaintabCtlComponent,
    Sub01tabCtlComponent,
    ForgotPasswordComponent,
    //ForgotPasswordSubmitComponent,
    EmailchangeComponent,
    UserinfoComponent,
    ModalConfirmComponent,
    UserinfoConfirmComponent,
    UserinfoDeleteComponent,
    OutputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DemoMaterialModule
  ],
  exports : [
    MatDatepickerModule,
    MatDatepicker,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
