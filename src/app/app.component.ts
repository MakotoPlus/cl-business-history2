import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';
import { LoginService } from './service/login.service';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { debug } from 'console';

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
  username: String;
  loggedIn: boolean;
  session : CognitoUserSession;

  constructor(public auth: AuthService, private cdr: ChangeDetectorRef
    ,private loginService : LoginService) {
    //this.username = localStorage.getItem(
    //  environment.localstorageBaseKey + 'LastAuthUser'
    //);
    //console.log(this.loginService);
    //this.session = this.loginService
  }

  ngOnInit() {
    this.subscription = this.auth.isAuthenticated().subscribe(result => {
      this.loggedIn = result;
      //ユーザ情報取得
      this.auth.getData().subscribe(result => {
        this.username = result.attributes.family_name + ' ' + result.attributes.given_name;
      });
    });

    //--------------------------------------------------------
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscriptionLogin = this.loginService.sharedDataSource$.subscribe(
      msg => {
        console.log('[Sample1Component] shared data updated.');
        this.username = msg;
      }
    );
    //--------------------------------------------------------

  }

  ngAfterViewChecked() {
    //this.username = localStorage.getItem(
    //  environment.localstorageBaseKey + 'LastAuthUser'
    //);
    //console.log('ユーザ情報取得-ngAfterViewChecked');
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
    this.username = '';
    this.auth.signOut();
  }
}
