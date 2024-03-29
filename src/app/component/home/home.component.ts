import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
// subscribe を保持するための Subscription を import
// Angular Ver.6.x.x では rxjs から直接importするように変更された
import { Subscription } from 'rxjs';
// サービスを登録するための import
// アプリ全体でのサービスの共有､コンポーネント単位でのサービスの共有に関わらず､ここの import は必要
import { LoginService } from '../../service/login.service';
import {IfUserinfo} from '../../interface/userinfo';
import {RestapiService} from '../../service/restapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: String;
  errmessage : string;
  user : IfUserinfo;


  constructor(private auth: AuthService
    ,private loginService : LoginService
    , private restapi : RestapiService
    , private router : Router
    ) {}

  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof Sample1Component
   */
  private subscription!: Subscription;

  ngOnInit() {

    this.subscription = this.auth.loggedIn.subscribe(userdata=>{
      if (!userdata.isLogin){
        console.debug("HomeComponent logout ");
        this.router.navigate(['/login']);
      }else{
        console.debug(userdata);
        //this.user.family_name = result.attributes.family_name;
        this.username = userdata.user_name
        this.user=userdata;
        //this.loginService.onNotifySharedDataChanged(String(this.username));
        //this.loginService.onNotifySharedDataChanged(result);
      }
    })

    //this.getData();
  }

  // ログイン時に重複して業務一覧データを取得してしまうためコメントアウトして
  // loginイベントから取得するよう変更
  /*
  getData(): void {
    this.auth.getData().subscribe(
      result => {
        console.debug('HomeComponent::getData()');
        console.debug(result);
        //this.user.family_name = result.attributes.family_name;
        this.username = result.attributes.family_name + ' ' + result.attributes.given_name;
        //this.loginService.onNotifySharedDataChanged(String(this.username));
        //this.loginService.onNotifySharedDataChanged(result);
      },
      error => {
        console.log('HomeComponent::getData()');
        console.log(error);
      }
    );
    //token id取得して serviceに設定する
    //this.auth.getIdToken().then( token => {
    //  console.log('profile ngOnInit::getIdToken');
    //  //他からアクセスしても間に合わない場合があるんだよなこれが・・。
    //  //this.restapi.token = token;
    //});

  }
  */

  ngOnDestroy(){
    console.debug('ngOnDestroy--!!');
    this.subscription.unsubscribe();
    //--------------------------------------------------------
  }
}
