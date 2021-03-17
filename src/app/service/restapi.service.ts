import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from './message.service';
import {ConstType} from './../component/common/ConstType';
import {Alert} from './../interface/Alert';

//
// REST API通信サービスクラス
//
@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  private Url = environment.apiBaseUrl + '/pets';
  messages : Alert[] = [];

  //public token : string ;

  constructor(private http: HttpClient
    ,public messageService : MessageService
  ) {}

  private getHeader(token : string ) : any{
    return {headers: { Authorization: token }};
  }
  public getUser(sub : string, token : string ): Observable<any> {
    const httpOptions = this.getHeader(token);
    this.Url = environment.apiBaseUrl + '/userinfo/' + sub;
    console.log('Header=');
    console.log(httpOptions);
    return this.http.get<any>(this.Url, httpOptions).pipe(
      catchError(this.handleError('getUser', [])));
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
