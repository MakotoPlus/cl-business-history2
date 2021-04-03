import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import Amplify, { Auth, auth0SignInButton } from 'aws-amplify';
import { SignUpParams } from '@aws-amplify/auth/lib-esm/types';
import { environment } from './../../environments/environment';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
//import { FunctionCall } from '@angular/compiler';
//import {AuthenticationDetails, CognitoUser, CognitoIdToken, CognitoUserSession, CognitoUserAttribute} from "amazon-cognito-identity-js";
import { IfUserinfo } from './../interface/userinfo';
import { User } from '../component/user';
import { MessageService} from './../service/message.service';
import {ConstType} from './../component/common/ConstType';
//import {RestapiService} from './../service/restapi.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // これにするとユーザ情報は連携できているが、loggedIn(boolean)を参照しているapp.component.htmlが正しく動作しなくなるため
  // 時間も遅いので一旦元に戻す。
  loggedIn: BehaviorSubject<IfUserinfo> = new BehaviorSubject<IfUserinfo>(new User());
  //public loginState = this.loggedIn.asObservable();


  password: String;
  public session : CognitoUserSession;
  public loginUser : User = new User();  // ログインユーザ情報
  public tokein : string;

  signUpParams : SignUpParams;

  constructor(private router: Router
    ,private messageService : MessageService
    //,private restapiService :RestapiService
    ) {
    Amplify.configure(environment.amplify);
    //this.loggedIn = new BehaviorSubject<boolean>(false);
    this.loginUser.clear();
  }

  //signup_data : any;

  /** サインアップ */
  public signUp(email : string , password : string
    ,family_name : string ,given_name : string ): Observable<any> {
  //public signUp(email : string , password : string): Observable<any> {
    console.debug('no log--------?');
    this.signUpParams = {
        username: email
        ,password: password
        ,attributes : {
            'name': email
            ,'email': email
            ,'family_name': family_name
            ,'given_name': given_name
            ,'custom:admin': '0'
          }
    };
    console.debug('no log--------01?');
    console.debug('signUp Call OK111!');
    let abc  =  Auth.signUp(this.signUpParams);
    console.debug(this.signUpParams);
    return from(abc);
  }


  /** 検証 */
  public confirmSignUp(email, code): Observable<any> {
    return from(Auth.confirmSignUp(email, code));
  }

  /** ログイン */
  /*public signIn(email, password): Observable<any> {
    return from(Auth.signIn(email, password).then((result) =>{
      console.log('sigIn Success');
      this.loginUser.set(true, result);
      this.loggedIn.next(this.loginUser);
    }));
    */
  public signIn(email, password): Observable<any> {
    return from(Auth.signIn(email, password)).pipe(
      tap((result) => {
        this.loginUser.set(true, result);
        this.loggedIn.next(this.loginUser);
          //this.loggedIn.next(true)
      })
    );
  }

  /** ログインユーザ情報の取得 */
  public getData(): Observable<any> {
    //public getData(): Observable<CognitoUserSession> {
    return from(Auth.currentAuthenticatedUser());
  }

  /** idtokenを取得 */
  public getIdToken(): Promise<string> {
    return Auth.currentSession()
      .then(session => {
        /**
        console.log('getIdToken::then');
        console.log(session);
        console.log('getIdToken::payload');
        let payload = session.getIdToken().payload;
        console.log(payload);
         */
        console.log(session);
        this.session = session;
        this.tokein = session.getIdToken().getJwtToken();
        return this.tokein;
      })
      .catch( e => {
          console.log('getIdToken::error');
          console.log(e);
          return e;
      })
  }


  /** ログイン状態の取得
  public isAuthenticated(): Observable<IfUserinfo> {
    console.log('isAuthenticated');
    return from(Auth.currentAuthenticatedUser()).pipe(
      map(result => {
        console.log('sigIn Success');
        this.loginUser.set(true, result);
        this.loggedIn.next(this.loginUser);
        return this.loginUser;
    }),
    catchError(error => {
      console.log( 'isAuthenticated::error');
      console.log( error);
      this.loginUser.clear();
      this.loggedIn.next(this.loginUser);
      //this.loggedIn.next(false);
      //return of(false);
      return of(this.loginUser);
    })
  );
  }
*/
  public isAuthenticated(): Observable<boolean> {
    console.debug('isAuthenticated');
    return from(Auth.currentAuthenticatedUser()).pipe(
      map(result => {
        //console.log(result);
        this.loginUser.set(true, result);
        this.loggedIn.next(this.loginUser);
        //this.loggedIn.next(true);
        return true;
      }),
      catchError(error => {
        this.loginUser.clear();
        this.loggedIn.next(this.loginUser);
        //this.loggedIn.next(false);
        return of(false);
      })
    );
  }

  /** パスワード再設定の認証コード送信 */
  public forgotPassword(userid : string) : Promise<any>{
    return Auth.forgotPassword(userid);
  }

  /** パスワード再設定 */
  public forgotPasswordSubmit(userid : string, verificationCode : string, newPassword : string ) : Promise<void> {
    return Auth.forgotPasswordSubmit(userid, verificationCode, newPassword);
  }

  /** ユーザ情報変更 */
  public currentAuthenticatedUser(family_name : string
    , given_name : string, successfullySignup : boolean, email?:string ){
    //パラメータ設定
    let updateUserAttributesParam = {};
    if (email == undefined){
      updateUserAttributesParam = {
        family_name : family_name,
        given_name : given_name,
      };
    }else{
      updateUserAttributesParam = {
        family_name : family_name,
        given_name : given_name,
        email : email,
        name : email
      };
    }
    // 念のため最新ユーザ情報取得
    Auth.currentAuthenticatedUser().then( current_user =>{
      //console.log('currentUser');
      //console.log(current_user);
      //console.log('change-------------');
      //console.log("Userinfo[" + email + "][" + family_name + "][" + given_name + "]");

      Auth.updateUserAttributes(current_user,updateUserAttributesParam).then(value =>{
        console.debug('updateUserAttributes-OK');
        console.debug(value);
        if (email != undefined){
          successfullySignup = true;
        }
        this.messageService.Output(ConstType.TYPE.SUCCESS, 'ユーザ情報変更正常終了');
      }).catch(error =>{
        this.messageService.Output(ConstType.TYPE.DANGER, 'ユーザ情報変更失敗');
        console.log('updateUserAttributes-ERROR');
        console.log(error);
      });
    }).catch(error =>{
      this.messageService.Output(ConstType.TYPE.DANGER, 'ユーザ情報変更失敗');
      console.log('currentAuthenticatedUser-ERROR');
      console.log(error);
    });
  }

  /** 変更Eメールアドレスを有効化 */
  public verifyAttribute(confirmationCode){
    //Auth.currentUserInfo
    Auth.currentUserPoolUser().then(cognitoUser =>{
      Auth.verifyUserAttributeSubmit(cognitoUser, 'email', confirmationCode).then(
        result =>{
        console.debug('verfyAttribute Success');
        console.debug(result);
        this.messageService.Output(ConstType.TYPE.SUCCESS, '認証正常終了');
      })
      .catch((error) => {
        this.messageService.Output(ConstType.TYPE.DANGER, '認証失敗');
        console.log('verfyAttribute Error');
        console.log(error);
      })
    }).catch((error) => {
      this.messageService.Output(ConstType.TYPE.DANGER, '認証失敗');
      console.log('verfyAttribute Error');
      console.log(error);
    });
  }


/*    }
    Auth.verifyUserAttribute(
      this.loginUser, confirmationCode,
      {"email_verfied" : "true"}).then( result =>{
        console.log('verfyAttribute Success');
      }).catch(error =>{
        console.log('verfyAttribute Error');
        console.log(error);
      });
  }
/*
      }
      this.currentUser.verifyAttribute("email", confirmationCode, {
        onSuccess: (result) => {
          console.log('email verification success')
          var user = store.getters.user
          user["email_verified"] = "true"
          store.commit('setUser', user)

          resolve(result)
        },
        onFailure: (err) => {
          console.log('email verification failed')
          reject(err)
        }
      })
    })
  }
*/
  /** ログアウト */
  public signOut() {
    from(Auth.signOut()).subscribe(
      result => {
        //this.loggedIn.next(false);
        this.router.navigate(['/login']);
        this.loginUser.clear();
        this.loggedIn.next(this.loginUser);
      },
      error => {
        console.log('signOut()Error!!');
        this.loginUser.clear();
        console.log(error);
      }
    );
  }
}
