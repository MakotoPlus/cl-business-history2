import { IfUserinfo } from './../interface/userinfo';
import {AppSettings} from './../appsettings';
import { CdkAccordion } from '@angular/cdk/accordion';
import { ISignUpResult, CognitoUser, MFAOption, CognitoUserSession, CognitoUserAttribute, NodeCallback } from 'amazon-cognito-identity-js';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { Router } from '@angular/router';

export class User implements IfUserinfo {
  public isLogin = false;
  public id_user = 0;
  public user_name = '';
  public email = '';
  public family_name = '';
  public given_name = '';
  public name = '';
  public sub = '';
  public companycd = 0;
  public company_name = '';
  public idToken = '';
  public authority = AppSettings.AUTHORITY_USER;
  public cognitoUser : CognitoUser = undefined;
  constructor(login? : boolean,  userinfo? :any,
    loggedIn? : BehaviorSubject<IfUserinfo>, router?:Router){
    if ( login == undefined){
      this.isLogin = false;
      return;
    }
    this.set(login, userinfo, loggedIn, router);
  }

  public clear(){
    this.isLogin = false;
    this.id_user = 0;
    this.user_name = '';
    this.email = '';
    this.family_name = '';
    this.given_name = '';
    this.name = '';
    this.sub = '';
    this.companycd = 0;
    this.company_name = '';
    this.idToken = '';
    this.authority = AppSettings.AUTHORITY_USER;
    this.cognitoUser = undefined;
  }

  // ログイン情報格納
  public set( login : boolean , userinfo? : CognitoUser,
    loggedIn? : BehaviorSubject<IfUserinfo>, router? : Router ) : void {
    //this.isLogin = login;
    if ( userinfo == undefined){
      this.isLogin = false;
      this.cognitoUser = undefined;
      return;
    }else{
      this.cognitoUser = userinfo;
      getUserAttributes(this, userinfo, loggedIn, router);
    }
  }

}

function getUserAttributes(user : User
  , userinfo?:CognitoUser, loggedIn? : BehaviorSubject<IfUserinfo>
  , router? : Router ) : void {

  if (userinfo){
    userinfo.getUserAttributes(( error, result )=>{
      if (error){
        console.error("User Info Get Error!!");
        console.error(error);
        user.isLogin = false;
        return;
      }
      console.debug('ログイン情報格納');
      let currentUserData = [];
      for( let i = 0; i < result.length; i++){
        console.debug( `Name=${result[i].getName()}, Value=${result[i].getValue()}`);
        currentUserData[result[i].getName()] = result[i].getValue();
      }
      console.debug(userinfo);
      user.family_name = currentUserData["family_name"];
      user.given_name = currentUserData["given_name"];
      user.email = currentUserData["email"];
      user.sub = currentUserData["sub"];
      user.user_name = user.family_name + ' ' + user.given_name;
      user.companycd = currentUserData["custom:companycd"];
      /*
      this.family_name = userinfo.attributes.family_name;
      this.given_name = userinfo.attributes.given_name;
      this.email = userinfo.attributes.email;
      this.sub = userinfo.attributes.sub;
      this.user_name = this.family_name + ' ' + this.given_name;
      this.companycd = userinfo.attributes['custom:companycd'];
      //token id 設定
      //if (userinfo.signInUserSession){
      //  this.idToken = userinfo.signInUserSession.getIdToken().getJwtToken();
      //}
      */

      userinfo.getSession((error, result) =>{
          if (error){
            console.error("User Info Get Error!!");
            console.error(error);
            return;
          }
          user.idToken = result.getIdToken().getJwtToken();
          user.isLogin = true;
          if (loggedIn){
            loggedIn.next(user);
            if (router){
              router.navigate(['/']);
              // .signInUserSession.getIdToken().getJwtToken();
            }
          }
        });
    });
  }

    /*
    console.log('ログイン情報格納');
    console.log(userinfo);
    this.family_name = userinfo.attributes.family_name;
    this.given_name = userinfo.attributes.given_name;
    this.email = userinfo.attributes.email;
    this.sub = userinfo.attributes.sub;
    this.user_name = this.family_name + ' ' + this.given_name;
    this.companycd = userinfo.attributes['custom:companycd'];
    //token id 設定
    if (userinfo.signInUserSession){
      this.idToken = userinfo.signInUserSession.getIdToken().getJwtToken();
    }
    */

}

/*
private async getUserAttributes(userinfo : CognitoUser){
  userinfo.getUserAttributes(( error, result )=>{
    if (error){
      console.error("User Info Get Error!!");
      console.error(error);
      //return;
    }
    console.debug('ログイン情報格納');
    let currentUserData = [];
    for( let i = 0; i < result.length; i++){
      console.debug( `Name=${result[i].getName()}, Value=${result[i].getValue()}`);
      currentUserData[result[i].getName()] = result[i].getValue();
    }
    console.debug(userinfo);
    this.family_name = currentUserData["family_name"];
    this.given_name = currentUserData["given_name"];
    this.email = currentUserData["email"];
    this.sub = currentUserData["sub"];
    this.user_name = this.family_name + ' ' + this.given_name;
    this.companycd = currentUserData["custom:companycd"];
    /*
    this.family_name = userinfo.attributes.family_name;
    this.given_name = userinfo.attributes.given_name;
    this.email = userinfo.attributes.email;
    this.sub = userinfo.attributes.sub;
    this.user_name = this.family_name + ' ' + this.given_name;
    this.companycd = userinfo.attributes['custom:companycd'];
    //token id 設定
    //if (userinfo.signInUserSession){
    //  this.idToken = userinfo.signInUserSession.getIdToken().getJwtToken();
    //}
    */


    /*
    userinfo.getSession((error, result) =>{
        if (error){
          console.error("User Info Get Error!!");
          console.error(error);
          return;
        }
        this.idToken = result.getIdToken().getJwtToken();
        // .signInUserSession.getIdToken().getJwtToken();
    });
  });
  /*
  console.log('ログイン情報格納');
  console.log(userinfo);
  this.family_name = userinfo.attributes.family_name;
  this.given_name = userinfo.attributes.given_name;
  this.email = userinfo.attributes.email;
  this.sub = userinfo.attributes.sub;
  this.user_name = this.family_name + ' ' + this.given_name;
  this.companycd = userinfo.attributes['custom:companycd'];
  //token id 設定
  if (userinfo.signInUserSession){
    this.idToken = userinfo.signInUserSession.getIdToken().getJwtToken();
  }

}
*/
