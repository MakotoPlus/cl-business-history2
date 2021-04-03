import { Injectable } from '@angular/core';
//import { USERINFO } from '../mok-data';
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
  //private sharedDataSource = USERINFO;

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
  //public onNotifySharedDataChanged(updateed: string){
  public onNotifySharedDataChanged(updateed: any){
    console.debug('[LoginService] onNotifySharedDataChanged fired.');
    this.sharedDataSource.next(updateed);
    /*
    this.sharedDataSource.user_name = updateed.attributes.family_name + ' ' + updateed.attributes.given_name;
    this.sharedDataSource.family_name =updateed.attributes.family_name;
    this.sharedDataSource.given_name =updateed.attributes.given_name;
    this.sharedDataSource.email =updateed.attributes.email;
    this.sharedDataSource.sub = updateed.attributes.sub;
    */
  }

  //userinfo : IfUserinfo = USERINFO;
/*
  constructor() { }
  putLogin(): Observable<IfUserinfo> {
    // TODO: send the message _after_ fetching the heroes
    //return of(USERINFO);
    return of(this.userinfo);
  }
  */
}
