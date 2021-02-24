import { IfUserinfo } from './../interface/userinfo';
import {AppSettings} from './../appsettings';

export class User implements IfUserinfo {
  public isLogin = false;
  public id_user = 0;
  public user_name = '';
  public email = '';
  public family_name = '';
  public  given_name = '';
  public name = '';
  public sub = '';
  public id_company = 0;
  public company_name = '';
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
    this.id_company = 0;
    this.company_name = '';
    this.authority = AppSettings.AUTHORITY_USER;
  }

  // ログイン情報格納
  public set( login : boolean , userinfo? : any ) : void {
    this.isLogin = login;
    if ( userinfo == undefined){
      return;
    }
    console.log(userinfo);
    this.family_name = userinfo.attributes.family_name;
    this.given_name = userinfo.attributes.given_name;
    this.email = userinfo.attributes.email;
    this.sub = userinfo.attributes.sub;
    this.user_name = this.family_name + ' ' + this.given_name;
  }
};

