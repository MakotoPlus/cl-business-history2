import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { PetComponent } from './component/pet/pet.component';
import { UserinfoComponent } from './component/userinfo/userinfo.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { UserinfoDeleteComponent } from './component/userinfo-delete/userinfo-delete.component';
import {DemoMaterialModule} from './material-module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'userinfo', component: UserinfoComponent, canActivate: [AuthGuard] },
  { path: 'userdelete', component: UserinfoDeleteComponent, canActivate: [AuthGuard] },
  //{ path: 'forgotPasswordSubmit', component: ForgotPasswordSubmitComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
