import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../service/modal.service';
import {MessageService} from './../../service/message.service';
import { FormGroup, Validators, FormControl,FormBuilder } from '@angular/forms';
import {RestapiService} from '../../service/restapi.service';
import { Subscription } from 'rxjs';
import {ConstType} from './../../component/common/ConstType';
import { AuthService } from './../../auth/auth.service';
import _ from 'lodash';
import * as _moment from 'moment';
const moment = _rollupMoment || _moment;
import {default as _rollupMoment, Moment} from 'moment';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  model: NgbDateStruct;
  fmGroup : FormGroup;

  initialCheckbox: {Key:string,value:string,selected:boolean} = {Key : 'INITAL_USE', value : 'Initial Name', selected : false };
  companyCheckbox: {Key:string,value:string,selected:boolean} = {Key: 'COMPPANY_USE', value : 'Company', selected : true};

  constructor(
    private auth: AuthService
    ,private fb: FormBuilder
    ,private messageService : MessageService
    ,private modalService: ModalService
    ,private restapi : RestapiService
    ,private calendar: NgbCalendar
    ){
      this.model = this.calendar.getToday();
    }
  ngOnInit(): void {
    this.setFormgrp();
  }

  setFormgrp():void{
    //
    // フォーム作成
    this.fmGroup = this.fb.group({
      use_day : [moment(),[Validators.required]]
      ,is_initial : [this.initialCheckbox.selected,[]]
      ,is_company : [this.companyCheckbox.selected,[]]
    });
  }

  get use_day(){return this.fmGroup.get('use_day')}
  get is_initial(){return this.fmGroup.get('is_initial')}
  get is_company(){return this.fmGroup.get('is_company')}

  oninitialCheckboxChange(e){
    console.debug(e);
    this.is_initial.setValue(e.target.checked);
  }

  oncompanyCheckboxChange(e){
    console.debug(e);
    this.is_company.setValue(e.target.checked);
  }

  onSubmit(){
    console.debug(this.fmGroup.value);
    console.debug(this.is_initial.value);
    console.debug(this.is_company.value);
    this.modalService.confirm('PDF', '出力してよろしいですか？').then( result =>{
      if (!result){ return;}
      let use_day = this.ChangeYyyymmdd(
          this.use_day.value.year, this.use_day.value.month, this.use_day.value.day)
      let pdf_data = {
        printinf : {
          'output_date': use_day
          ,'out_name_type': this.is_initial.value ? "0" : "1"
          ,is_company: this.is_company.value
          ,companycd: this.auth.loginUser.companycd
        }
        ,uuid : [this.auth.loginUser.sub]
      };
      this.restapi.postOutputpdf(pdf_data).subscribe((result)=>{
        console.debug( '受信OK!?');
        //this.createImageFromBlob(result);
        let pdfObj : Blob = this.toBlobPdf(result);
        let url = window.URL.createObjectURL(pdfObj);
        window.open(url);
        this.messageService.Output(ConstType.TYPE.SUCCESS, 'PDF 出力しました');
      }),
      error =>{
        this.messageService.Output(ConstType.TYPE.DANGER, 'PDF 出力失敗');
        console.log('OutputComponent:onSubmit:error');
        console.error(`OutputComponent 出力失敗:${error.message}`);
    }

    });
  }
  /*
  imageBlobUrl : any;
  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageBlobUrl = reader.result;
      },
      false
    );
    if (image) {
      reader.readAsDataURL(image);
    }
  }
*/
  // 数値年、月、日の変換関数
  // yyyy, mm(0 - 11 ), dd  -> yyyy/mm/dd
  //
  ChangeYyyymmdd( year: number, month : number, day : number ) : string{
    let yyyy = year.toString().padStart(4, '0');
    let mm = (month).toString().padStart(2, '0');
    let dd = day.toString().padStart(2, '0');
    return yyyy + '/' + mm + '/' + dd;
  }


   /**
   * bas64 文字列になっている ZIP ファイル(バイナリデータ) をバイナリデータに変換する
   *
   * @private
   * @param {string} base64 バイナリデータを base64 エンコードして更に文字列化した文字列
   * @returns {Blob} 引数の文字列をバイナリに戻したバイナリデータ
   * @memberof AggregateMonthlyComponent
   * @description
   *  ZIP ファイルへの変換のみ対応している
   * @see
   *  https://developer.mozilla.org/ja/docs/Web/API/WindowBase64/atob
   *  https://developer.mozilla.org/ja/docs/Web/API/Blob
   *  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_objects/Uint8Array
   */
    private toBlobPdf(base64: string): Blob {
      const bin = atob(base64.replace(/^.*,/, ''));
      const buffer = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
      }
      const blob = new Blob([buffer.buffer], {
        type: 'application/pdf'
      });
      return blob;
    }


}
