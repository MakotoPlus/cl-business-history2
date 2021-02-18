import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
// subscribe を保持するための Subscription を import
// Angular Ver.6.x.x では rxjs から直接importするように変更された
import { Subscription } from 'rxjs';
// サービスを登録するための import
// アプリ全体でのサービスの共有､コンポーネント単位でのサービスの共有に関わらず､ここの import は必要
import { LoginService } from '../../service/login.service';
import {IfUserinfo} from '../../interface/userinfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: String;
  subscriptionLogin: Subscription;

  user_info : IfUserinfo;


  constructor(private auth: AuthService
    ,private loginService : LoginService
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
    this.getData();
}
  getData(): void {
    this.auth.getData().subscribe(
      result => {
        console.log(result);
        //this.user_info.family_name = result.attributes.family_name;
        this.username = result.attributes.family_name + ' ' + result.attributes.given_name;
        //this.loginService.onNotifySharedDataChanged(String(this.username));
        //this.loginService.onNotifySharedDataChanged(result);
      },
      error => {
        console.log('HomeComponent::getData()');
        console.log(error);
      }
    );
  }

    //--------------------------------------------------------

}
