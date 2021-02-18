import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';
import { LoginService } from './service/login.service';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
//import { debug } from 'console';
import { IfUserinfo } from './interface/userinfo';
import { User } from './component/user';

@Component({
  //moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  //template: '<router-outlet></router-outlet>'
})

//export class AppComponent {
//  title = 'cl-business-history2';
//}
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  subscription: Subscription;
  subscriptionLogin: Subscription;
  //username: String;
  //loggedIn: boolean;
  //session : CognitoUserSession;
  title = 'cl-business-history2';
  loggedIn : boolean = false;

  constructor(public auth: AuthService, private cdr: ChangeDetectorRef
    ,private loginService : LoginService) {
    //this.username = localStorage.getItem(
    //  environment.localstorageBaseKey + 'LastAuthUser'
    //);
    //console.log(this.loginService);
    //this.session = this.loginService
    console.log(this.auth);
  }

  ngOnInit() {
    this.subscription = this.auth.isAuthenticated().subscribe(result => {
      //this.loggedIn = result;
      //ユーザ情報取得
      //this.auth.getData().subscribe(result => {
      //  this.username = result.attributes.family_name + ' ' + result.attributes.given_name;
      console.log('AppComponent::ngOnInit');
      console.log(result);
    });
    //this.auth.loginState.subscribe((login : boolean)=>{
    //  console.log("AppComponent::login change " + login );
    //});


    /*

    this.auth.loginState.subscribe((login : User)=>{
      if (login){
        console.log("AppComponent::login!!")
        this.auth.loginUser = login;
        console.log( this.auth.loginUser)
        this.loggedIn = login.isLogin;
      }else{
        console.log("AppComponent::logout....")
        this.auth.loginUser.clear();
        this.loggedIn = false;
      }
    });
*/
    //--------------------------------------------------------
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    /*
    this.subscriptionLogin = this.loginService.sharedDataSource$.subscribe(
      msg => {
        console.log('[Sample1Component] shared data updated.');
        this.username = msg;
      }
    );
    //--------------------------------------------------------
    */
   console.log(this.auth);
  }

  ngAfterViewChecked() {
    //this.username = localStorage.getItem(
    //  environment.localstorageBaseKey + 'LastAuthUser'
    //);
    console.log('ユーザ情報取得-ngAfterViewChecked');
    //this.auth.getData().subscribe(result => {
    //  this.username = result.attributes.family_name + ' ' + result.attributes.given_name;
    //});
   // this.cdr.detectChanges();
 }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionLogin.unsubscribe();
  }

  onClickLogout() {
    //this.username = '';
    this.auth.signOut();
    this.loggedIn = false;
  }
}
