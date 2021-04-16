import { IfUserinfo } from './../interface/userinfo';
import {AppSettings} from './../appsettings';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { CdkAccordion } from '@angular/cdk/accordion';

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

  constructor(login? : boolean,  userinfo? :any){
    if ( login == undefined){
      this.isLogin = false;
      return;
    }
    this.set(login, userinfo);
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
  }

  // ログイン情報格納
  public set( login : boolean , userinfo? : any ) : void {
    this.isLogin = login;
    if ( userinfo == undefined){
      return;
    }
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
};

