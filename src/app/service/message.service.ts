import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from './../interface/Alert';


@Injectable({
  providedIn: 'root'
})

export class MessageService {


  public messageSubject: Subject<Alert> = new Subject();
  public messageState = this.messageSubject.asObservable();


  constructor() { }

  public Output(type: string, message : string) : void{
    let obj = {type : type, message: message };
    this.messageSubject.next(obj);
  }
}
