import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import Amplify, { Auth } from 'aws-amplify';
import { SignUpParams } from '@aws-amplify/auth/lib-esm/types';
import { environment } from './../../environments/environment';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
//import { FunctionCall } from '@angular/compiler';
//import {AuthenticationDetails, CognitoUser, CognitoIdToken, CognitoUserSession, CognitoUserAttribute} from "amazon-cognito-identity-js";
import { IfUserinfo } from './../interface/userinfo';
import { User } from '../component/user';

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

  signUpParams : SignUpParams;

  constructor(private router: Router) {
    Amplify.configure(environment.amplify);
    //this.loggedIn = new BehaviorSubject<boolean>(false);
    this.loginUser.clear();
  }

  //signup_data : any;

  /** サインアップ */
  public signUp(email : string , password : string ,family_name : string ,given_name : string ): Observable<any> {
  //public signUp(email : string , password : string): Observable<any> {
    console.log('no log--------?');
    this.signUpParams = {
        username: email
        ,password: password
        ,attributes : {
            'name': email
            ,'email': email
            ,'family_name': family_name
            ,'given_name': given_name
          }
    };
    console.log('no log--------01?');
    console.log('signUp Call OK111!');
    let abc  =  Auth.signUp(this.signUpParams);
    console.log('signUp Call OK333!');
    return from(abc);
  }


  /** 検証 */
  public confirmSignUp(email, code): Observable<any> {
    return from(Auth.confirmSignUp(email, code));
  }

  /** ログイン */
  public signIn(email, password): Observable<any> {
    return from(Auth.signIn(email, password).then((result) =>{
      console.log('sigIn Success');
      this.loginUser.set(true, result);
      this.loggedIn.next(this.loginUser);
    }));
    /*********************
  public signIn(email, password): Observable<any> {
    return from(Auth.signIn(email, password)).pipe(
      tap(() => {
        this.loggedIn.next(true)
      })
    );
    */
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
        return session.getIdToken().getJwtToken();
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
    console.log('isAuthenticated');
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

  /** ログアウト */
  public signOut() {
    from(Auth.signOut()).subscribe(
      result => {
        this.loginUser.clear();
        this.loggedIn.next(this.loginUser);
        //this.loggedIn.next(false);
        this.router.navigate(['/login']);
      },
      error => {
        console.log('signOut()Error!!');
        this.loginUser.clear();
        console.log(error);
      }
    );
  }
}
