import { Component, OnInit,Input } from '@angular/core';
//import { IfUserinfo } from '../interface/userinfo';
import { IfUserinfo } from './../interface/userinfo';
// subscribe を保持するための Subscription を import
import { Subscription } from 'rxjs';
import { LoginService} from '../service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  //template: '<h1>Menu</h1><a routerLink="/login">ログアウト</a>',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
/**
   * LoginService の変数の参照を取得するプロパティ
   *
   * @type {String}
   */
  //public serviceProp: String = 'Initialized by Sample2Component';
  public serviceProp: String;

  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   */
  private subscription!: Subscription;


  //@Input() userinfo: IfUserinfo;
  userinfo: IfUserinfo;
  /**
   * コンストラクタ. ServiceSample2Component のインスタンスを生成する
   *
   * @param {LoginService} loginservice ログインサービス
   */
  constructor(private loginservice: LoginService) {  }

  ngOnInit(): void {
    console.log('MenuComponent.ngOnInit()')
    console.log(this.loginservice.userinfo)
    this.userinfo = this.loginservice.userinfo;
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.loginservice.sharedDataSource$.subscribe(
      msg => {
        console.log('[MenuComponent] shared data updated.');
        this.serviceProp = msg;
        this.userinfo = this.loginservice.userinfo;
        console.log(this.userinfo);
      }
    );
  }
  public onTectBtnClick(): void {
    // loginservice のデータ更新を行う
    console.log('[MenuComponent] onClicSendMessage fired.');
    this.loginservice.onNotifySharedDataChanged('Updated by MenuComponent.');
  }
  /**
   * コンポーネント終了時の処理
   *
   */
  ngOnDestroy() {
    //  リソースリーク防止のため loginservice から subcribe したオブジェクトを破棄する
    console.log('[MenuComponent] ngOnDestroy');
    this.subscription.unsubscribe();
  }
}
