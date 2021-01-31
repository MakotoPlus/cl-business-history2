import { Injectable } from '@angular/core';
import { USERINFO } from '../mok-data';
import { IfUserinfo } from '../interface/userinfo';
import { Observable, of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * データの変更を通知するためのオブジェクト
   */
  private sharedDataSource = new Subject<string>();


  /**
   * Subscribe するためのプロパティ
   * コンポーネント間で共有するためのプロパティ
   *
   * $はグローバルアクセスになるらしい。
   */
  public sharedDataSource$ = this.sharedDataSource.asObservable();

  /**
   * データの更新イベント
   *
   * @param {string} updateed 更新データ
   * @memberof CommonService
   */
  public onNotifySharedDataChanged(updateed: string){
    console.log('[LoginService] onNotifySharedDataChanged fired.');
    this.sharedDataSource.next(updateed);
  }

  userinfo : IfUserinfo = USERINFO;

  constructor() { }
  putLogin(): Observable<IfUserinfo> {
    // TODO: send the message _after_ fetching the heroes
    //return of(USERINFO);
    return of(this.userinfo);
  }
}
