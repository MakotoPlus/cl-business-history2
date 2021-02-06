import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import Amplify, { Auth } from 'aws-amplify';
import { SignUpParams } from '@aws-amplify/auth/lib-esm/types';
import { environment } from './../../environments/environment';
//import { FunctionCall } from '@angular/compiler';
//import {AuthenticationDetails, CognitoUser, CognitoIdToken, CognitoUserSession, CognitoUserAttribute} from "amazon-cognito-identity-js";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedIn: BehaviorSubject<boolean>;
  password: String;
  family_name: String;
  given_name: String;
  email : String;
  signUpParams : SignUpParams;

  constructor(private router: Router) {
    Amplify.configure(environment.amplify);
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  signup_data : any;

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
    console.log(this.signUpParams);
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
    return from(Auth.signIn(email, password)).pipe(
      tap(() => this.loggedIn.next(true))
    );
  }

  /** ログインユーザ情報の取得 */
  public getData(): Observable<any> {
    return from(Auth.currentAuthenticatedUser());
  }

  /** idtokenを取得 */
  public getIdToken(): Promise<string> {
    return Auth.currentSession()
      .then(session => {
        console.log('getIdToken::then');
        console.log(session);
        console.log('getIdToken::payload');
        let payload = session.getIdToken().payload;
        console.log(payload);
        /**
        this.email = payload['email'];
        this.given_name = payload['given_name'];
        this.family_name = payload['family_name'];
         */
        return session.getIdToken().getJwtToken();
      })
      .catch( e => {
          console.log('getIdToken::error');
          console.log(e);
          return e;
      })
  }


  /** ログイン状態の取得 */
  public isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser()).pipe(
      map(result => {
        this.loggedIn.next(true);
        return true;
      }),
      catchError(error => {
        this.loggedIn.next(false);
        return of(false);
      })
    );
  }

  /** ログアウト */
  public signOut() {
    from(Auth.signOut()).subscribe(
      result => {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      },
      error => {
        console.log('signOut()Error!!');
        console.log(error);
      }
    );
  }
}
