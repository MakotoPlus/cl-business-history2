import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';
import { LoginService } from './service/login.service';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
//import { debug } from 'console';
import { IfUserinfo } from './interface/userinfo';
import { User } from './component/user';
import {MessageService} from './service/message.service';
import {Alert} from './interface/Alert';
import {ConstType} from './component/common/ConstType';


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
  messageSubscription: Subscription;
  subscriptionLogin: Subscription;
  //username: String;
  //loggedIn: boolean;
  //session : CognitoUserSession;
  title = 'cl-business-history2';
  loggedIn : boolean = false;
  logoutMessage : boolean = false;
  loginuser : User;
  //message : string = '';
  messages : Alert[] = [];

  constructor(public auth: AuthService
    , private cdr: ChangeDetectorRef
    ,private loginService : LoginService
    ,private messageService : MessageService
    ) {
    //this.username = localStorage.getItem(
    //  environment.localstorageBaseKey + 'LastAuthUser'
    //);
    //console.log(this.loginService);
    //this.session = this.loginService
    console.log(this.auth);
  }

  ngOnInit() {
    this.subscription = this.auth.isAuthenticated().subscribe(result => {
      //ユーザ情報取得
      //this.auth.getData().subscribe(result => {
      //  this.username = result.attributes.family_name + ' ' + result.attributes.given_name;
      console.log('AppComponent::ngOnInit');
      console.log(result);
      if (result){
        console.log("AppComponent::isAuthenticated.login!!")
        //this.loginuser = result;
        console.log( this.auth.loginUser)
        this.loggedIn = result;
        this.logoutMessage = true;
      }else{
        console.log("AppComponent::logout....")
        this.auth.loginUser.clear();
        this.loggedIn = false;
        this.logoutMessage = false;
      }

    });
    /*
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

    */
    this.subscriptionLogin = this.auth.loggedIn.subscribe((login : User)=>{
      if (login.isLogin){
        console.log("AppComponent::subscribe.login!!")
        this.auth.loginUser = login;
        console.log( this.auth.loginUser)
        this.loggedIn = login.isLogin;
        this.logoutMessage = true;
      }else{
        console.log("AppComponent::subscribe.logout....")
        this.auth.loginUser.clear();
        this.loggedIn = false;
        if ( this.logoutMessage ){
          this.messageService.Output(ConstType.TYPE.SUCCESS, 'ログアウトしました');
          this.logoutMessage = false;
        }
      }
    });


    this.messageSubscription = this.messageService.messageState.subscribe((message:Alert)=>{
      this.messages.push(message);
      console.log(`Message output:${message}`);
    });

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
    // ここ常に呼出される・・。一旦なにもしないいいのか？
    //console.log('ユーザ情報取得-ngAfterViewChecked');
 }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.messageSubscription.unsubscribe();
    this.subscriptionLogin.unsubscribe();
  }

  onClickLogout() {
    //this.username = '';
    this.auth.signOut();
    //this.loggedIn = false;
  }
}
