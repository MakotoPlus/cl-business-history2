import { Injectable } from '@angular/core';
import { Subscription, Observable,AsyncSubject,BehaviorSubject,Subject} from 'rxjs';
import {MessageService} from './../../service/message.service';
import { User } from './../../component/user';
import {ConstType} from './../../component/common/ConstType';
import { AuthService } from './../../auth/auth.service';
import {RestapiService} from '../../service/restapi.service';
import {HistoryData} from '../../component/common/HistoryData';
import { debug } from 'console';

@Injectable({
  providedIn: 'root'
})
export class HistorylistService {
  private subscription!: Subscription;
  //historyObservable: BehaviorSubject<HistoryData[]>;
  historyObservable: Subject<HistoryData[]> = new Subject<HistoryData[]>();
  // 更新イベント用
  //historyUpdateSubject : BehaviorSubject<HistoryData> = new BehaviorSubject<HistoryData>(undefined);
  historyUpdateSubject : AsyncSubject<HistoryData> = new AsyncSubject<HistoryData>();
  //historyUpdateSubject : PublishSubject<HistoryData> = new PublishSubject<HistoryData>(undefined);


  // ログインユーザ情報
  user : User;
  // 履歴データ
  //historyData : HistoryData[] = [];

  Issubscribe = true;

  constructor(
    private auth: AuthService
    ,private messageService : MessageService
    ,private restapi : RestapiService
  ) {
    console.debug('HistorylistService::constructor()--------------');
    //this.initHistoryData();
    this.getUser();
  }
  private getUser(){
    this.subscription = this.auth.loggedIn.subscribe((login : User)=>{
      this.user = login;
      if (login.isLogin){
        //なんもしない
        //this.getHistory();
        console.debug("HistorylistService::subscribe.login!!");
        console.debug(login);
      }else{
        console.debug("HistorylistService::subscribe.logoff!!");
      }
    });
  }

  /*
  initHistoryData(){
    this.subscription = this.auth.loggedIn.subscribe((login : User)=>{
      //
      // ユーザが二回目のログイン時は、Sigin、isAuthenticatedからイベントが発生する。
      // そうすると二回同じデータを取得してしまうため、ここでは既に保存されている
      // ログインユーザと同じユーザ情報であった場合にメッセージを取得すると重複していしまうため
      // 何もしないで終了するようにする。
      if (login.isLogin){
        if (this.loginUser != undefined){
          // 前回と同じログイン情報の場合は何もしない。
          if ( this.loginUser.id_user == login.id_user && this.loginUser.idToken == login.idToken){
            return;
          }
        }
        // BehaviorSubject生成
        this.loginUser = login;
        this.historyObservable = new BehaviorSubject<HistoryData[]>([]);
        console.debug("ProfileService::subscribe.login!!");
        this.getHistory();
      } else{
        console.debug('HistorylistService::Logout....');
        this.loginUser = undefined ;
        // イベントストップ
        if (this.historyObservable != undefined){
          this.historyObservable.unsubscribe();
          this.historyObservable = undefined;
        }
      }
    });
  }
  */

  getHistory(index : number = 0){
    if (this.user.isLogin){
      console.debug('HistorylistService::getHistory restapi call');
      let ret = this.restapi.getHistoryList(index).subscribe(result =>{
          let HistoryDatas : HistoryData[] =[];
          for ( let i = 0; i < result.length; i++){
            let hd : HistoryData = new HistoryData();
            hd.setData(result[i]);
            HistoryDatas.push(hd);
          }
          this.historyObservable.next(HistoryDatas);
        },error =>{
          this.messageService.Output(ConstType.TYPE.DANGER, '業務経歴一覧 取得失敗');
          console.error(`業務経歴一覧 取得失敗:${error.message}`);
      });
      console.debug('restapi.getHistoryList() Return');
      console.debug(ret);
    }
  }


  eventReset(){
   // 更新イベント用
   console.debug('eventReset');
   this.historyUpdateSubject.closed;
   this.historyUpdateSubject  = new AsyncSubject<HistoryData>();
   //this.getHistory(0);
  }
  //
  // 業務履歴更新画面へデータ引渡メソッド
  showHistoryDetail(historyData : HistoryData){
    console.debug('behaSubjectHistory.next()');
    this.historyUpdateSubject.next(historyData);
    this.historyUpdateSubject.complete();
  }
}
