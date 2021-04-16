import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import {RestapiService} from '../../service/restapi.service';
import { Subscription, AsyncSubject } from 'rxjs';
import {MessageService} from './../../service/message.service';
import { User } from './../../component/user';
import {ConstType} from './../../component/common/ConstType';
import {Alert} from './../../interface/Alert';
import { FormGroup, Validators, FormControl,FormBuilder } from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {HistorylistService} from './../../service/data/historylist.service';
import {HistoryData} from './../../component/common/HistoryData';
import {ProfileData} from './../../component/common/ProfileData';

import { debug } from 'console';

@Component({
  selector: 'app-historylist',
  templateUrl: './historylist.component.html',
  styleUrls: ['./historylist.component.css']
})
export class HistorylistComponent implements OnInit {
  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof Sample1Component
   */
   private subscription!: Subscription;

  /**
   * 親コンポーネントに対してイベントを発火するためのプロパティ
   *
   * @memberof CompChildComponent
   */
   @Output() event = new EventEmitter<String>();

  historyData : HistoryData[] = [];

  constructor(
    private auth: AuthService
    ,private messageService : MessageService
    ,private restapi : RestapiService
    ,private historylistService :HistorylistService
  ) { }

  ngOnInit(): void {
    this.historylistService.getHistory();
    this.getHistory();
  }

  getHistory():void{
    this.subscription = this.historylistService.historyObservable.subscribe((result=>{
      console.debug('HistorylistComponent');
      if ( result == undefined ){
        console.debug('HistorylistComponent::undefined');
        return;
      }
      result.forEach( r =>{
        console.debug('push----------------------')
        console.debug(r);
        this.historyData.push(r);
      });
    }));
  }


  ClickLink(index){
    console.debug('ClickLink-index[' + index + ']')
    console.debug(this.historyData[index]);
    this.historylistService.showHistoryDetail(this.historyData[index]);
    this.event.emit('tab-historylist');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.debug('HistorylistComponent::ngOnDestroy');
  }

}
