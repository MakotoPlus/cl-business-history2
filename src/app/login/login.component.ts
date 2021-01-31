import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Login } from './login';
import { LoginService} from '../service/login.service';
import { IfUserinfo } from '../interface/userinfo';
// subscribe を保持するための Subscription を import
import { Subscription } from 'rxjs';

@Component({
  //selector: 'app-login',
  //moduleId: module.id,
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * CommonService の変数の参照を取得するプロパティ
   *
   * @type {String}
   * @memberof Sample1Component
   */
  public serviceProp: String = 'Initialized by Sample1Component';

 /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof Sample1Component
   */
  private subscription!: Subscription;


  model = new Login('', '','passwd');
 /**
   * コンストラクタ. LoginComponent のインスタンスを生成する
   *
   * @param {LoginService} loginService ログインサービス
   */
  constructor(private router: Router, private loginservice: LoginService) { }

  // ログイン情報
  logininfo : IfUserinfo;

  /**
   * ライフサイクルメソッド｡コンポーネントの初期化で使用する
   *
   */
  ngOnInit(): void {
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.loginservice.sharedDataSource$.subscribe(
      msg => {
        console.log('[LoginComponent] shared data updated.');
        this.serviceProp = msg;
      }
    );
  }

  /**
   * コンポーネント終了時の処理
   *
   */
  ngOnDestroy() {
    console.log('[LoginComponent] ngOnDestroy');
    //  リソースリーク防止のため loginservice から subcribe したオブジェクトを破棄する
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.model.loginId == this.model.password) {
        this.loginservice.putLogin()
          .subscribe(logininfo => this.logininfo = logininfo)
            console.log('putLogin OK!!');
            console.log(this.logininfo);
            // loginserviceのデータ更新を行う
            this.loginservice.onNotifySharedDataChanged('Updated by LoginComponent.');
            this.router.navigate(['menu']);
    } else {
        this.model.message = "ログインに失敗しました";
    }
  }
}
