import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of,Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from './message.service';
import {ConstType} from './../component/common/ConstType';
import {Alert} from './../interface/Alert';
import { AuthService } from './../auth/auth.service';
import { User } from './../component/user';

//
// REST API通信サービスクラス
//
@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  private Url = environment.apiBaseUrl + '/pets';
  messages : Alert[] = [];
  subscription : Subscription;
  user : User;

  //public token : string ;

  constructor(private http: HttpClient
    ,public messageService : MessageService
    ,private auth: AuthService
  ) {
    this.subscription = this.auth.loggedIn.subscribe((login : User)=>{
      if (login.isLogin){
        console.debug("RestapiService::subscribe.login!!");
        console.debug(login);
      }
      this.user = login;
    });
  }


    private getHeader() : any{
      return {
        headers: { Authorization: this.user.idToken }
        ,'Content-Type': 'application/json'
      };
    /*
  //private getHeader(token : string ) : any{
    return {
      headers: { Authorization: token }
      ,'Content-Type': 'application/json'
    };
    */
  }
  //------------------------------------------------------------------------------
  //
  // ユーザ情報取得API(GET)
  //------------------------------------------------------------------------------
  public getUser(): Observable<any> {
    const httpOptions = this.getHeader();
    this.Url = environment.apiBaseUrl + '/userinfo/' + this.user.sub;
    console.debug('Header=');
    console.debug(httpOptions);
    return this.http.get<any>(this.Url, httpOptions);
    //return this.http.get<any>(this.Url, httpOptions).pipe(
    //  catchError(this.handleError('getUser', [])));
  }
  //------------------------------------------------------------------------------
  //
  // ユーザ情報更新API(PUT)
  //------------------------------------------------------------------------------
  public putUser(body : any ): Observable<any> {
    const httpOptions = this.getHeader();
    this.Url = environment.apiBaseUrl + '/userinfo/' + this.user.sub;
    console.log(httpOptions);
    return this.http.put<any>(this.Url, body, httpOptions);
    //return this.http.put<any>(this.Url, body, httpOptions).pipe(
    //  catchError(this.handleError('putUser', [])));
  }

  //------------------------------------------------------------------------------
  //
  // 業務経歴追加API(POST)
  //------------------------------------------------------------------------------
  public postHistory( body : any ): Observable<any> {
    const httpOptions = this.getHeader();
    this.Url = environment.apiBaseUrl + '/history/' + this.user.sub ;
    console.debug(`URL=[${this.Url}]`);
    return this.http.post<any>(this.Url, body, httpOptions);
    //return this.http.post<any>(this.Url, body, httpOptions).pipe(
    //catchError(this.handleError('postHistory', [])));
  }
  //------------------------------------------------------------------------------
  //
  // 業務経歴更新API(PUT)
  //------------------------------------------------------------------------------
  public putHistory(rangekey : string, body : any ): Observable<any> {
    const httpOptions = this.getHeader();
    this.Url = environment.apiBaseUrl + '/history/' + this.user.sub + '/' + rangekey;
    console.debug(`URL=[${this.Url}]`);
    return this.http.put<any>(this.Url, body, httpOptions);
    //return this.http.post<any>(this.Url, body, httpOptions).pipe(
    //catchError(this.handleError('postHistory', [])));
  }

  //------------------------------------------------------------------------------
  //
  // 業務経歴削除API(DELETE)
  //------------------------------------------------------------------------------
  public deleteHistory(rangeKey ): Observable<any> {
    const httpOptions = this.getHeader();
    this.Url = environment.apiBaseUrl + '/history/' + this.user.sub + '/' + rangeKey;
    console.debug(this.Url);
    return this.http.delete<any>(this.Url, httpOptions);
    //return this.http.post<any>(this.Url, body, httpOptions).pipe(
    //catchError(this.handleError('postHistory', [])));
  }


  //------------------------------------------------------------------------------
  //
  // 業務経歴一覧取得API(GET)
  //------------------------------------------------------------------------------
  public getHistoryList(index : number) : Observable<any>{
    const httpOptions = this.getHeader();
    this.Url = environment.apiBaseUrl + '/historylist/' + this.user.sub + '/' + index;
    console.debug(this.Url);
    return this.http.get<any>(this.Url, httpOptions);
  }
  //------------------------------------------------------------------------------
  //
  // 企業情報API(GET)
  //------------------------------------------------------------------------------
  public getCompany(): Observable<any> {
    const httpOptions = this.getHeader();
    this.Url = environment.apiBaseUrl + '/company/' + this.user.companycd + '/' + this.user.sub;
    console.debug(`URL=[${this.Url}]`);
    return this.http.get<any>(this.Url, httpOptions);
  }

  //------------------------------------------------------------------------------
  //
  // 企業情報API(PUT)
  //------------------------------------------------------------------------------
  public putCompany(companycd : string, uuid : string, body : any ): Observable<any> {
    const httpOptions = this.getHeader();
    this.Url = environment.apiBaseUrl + '/company/' + companycd + '/' + uuid;
    console.debug(`URL=[${this.Url}]`);
    console.debug(body);
    return this.http.put<any>(this.Url, body, httpOptions);
  }
  //------------------------------------------------------------------------------
  //
  // PDF出力 API(POST)
  //------------------------------------------------------------------------------
  public postOutputpdf(body : any ): Observable<any> {
    const httpOptions = this.getHeader();
    this.Url = environment.apiBaseUrl + '/outputpdf';
    console.debug(`URL=[${this.Url}]`);
    console.debug(body);
    return this.http.post<any>(this.Url, body, httpOptions);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      let errmsg = `通信でエラーが発生しました。(${operation})`;
      this.messageService.Output(ConstType.TYPE.DANGER, errmsg);
      console.error(errmsg); // log to console instead
      console.error(`エラー詳細: ${operation} failed: ${error.message}`);
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
    };
  }

  private log(message: string) {
    console.log('RestapiService: ' + message);
  }


}
