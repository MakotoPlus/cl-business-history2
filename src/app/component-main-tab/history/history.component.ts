import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import {RestapiService} from '../../service/restapi.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../service/login.service';
import {IfUserinfo} from '../../interface/userinfo';
import {MessageService} from './../../service/message.service';
import { User } from './../../component/user';
import {ConstType, HistoryType, ProcessType} from './../../component/common/ConstType';
import {Alert} from './../../interface/Alert';
import { AbstractControl, FormGroup, Validators, FormArray ,FormBuilder,ValidatorFn, FormControl} from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../service/modal.service';
import {HistorylistService} from '../../service/data/historylist.service';
import { constants } from 'buffer';
import { debug } from 'console';
import _ from 'lodash';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';

// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { HistoryData } from 'src/app/component/common/HistoryData';
const moment = _rollupMoment || _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM',
  },
  display: {
    dateInput: 'YYYY/MM',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM',
  },
};
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export class HistoryComponent implements OnInit {
  //fromDate = new FormControl(moment());
  //toDate = new FormControl(moment());

  chosenFromYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.work_from.value;
    ctrlValue.year(normalizedYear.year());
    this.work_from.setValue(ctrlValue);
  }
  chosenFromMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.work_from.value;
    ctrlValue.month(normalizedMonth.month());
    this.work_from.setValue(ctrlValue);
    datepicker.close();
  }
  chosenToYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.work_to.value;
    ctrlValue.year(normalizedYear.year());
    this.work_to.setValue(ctrlValue);
  }
  chosenToMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.work_to.value;
    ctrlValue.month(normalizedMonth.month());
    this.work_to.setValue(ctrlValue);
    datepicker.close();
  }


  fmGroup : FormGroup;
  /*
  checkbox_groups = [
    {key : ProcessType.RD.key, value : ProcessType.RD.name, selected : false}
    ,{key : ProcessType.BD.key, value : ProcessType.BD.name, selected : false}
    ,{key : ProcessType.DD.key, value : ProcessType.DD.name, selected : false}
    ,{key : ProcessType.PG.key, value : ProcessType.PG.name, selected : false}
    ,{key : ProcessType.UT.key, value : ProcessType.UT.name, selected : false}
    ,{key : ProcessType.IT.key, value : ProcessType.IT.name, selected : false}
    ,{key : ProcessType.ST.key, value : ProcessType.ST.name, selected : false}
    ,{key : ProcessType.OT.key, value : ProcessType.OT.name, selected : false}
    ,{key : ProcessType.OP.key, value : ProcessType.OP.name, selected : false}
  ];
*/

  // isDisable : true=ボタン無効/false=ボタン有効
  isDisable : boolean = true;
  // Insert ボタン有効化フラグ
  isInsert : boolean = true;
  // Update ボタン有効化フラグ (履歴一覧画面からの遷移時はTrueになる)
  isUpdate : boolean = false;
  // Delete ボタン有効化フラグ (履歴一覧画面からの遷移時はTrueになる)
  isDelete : boolean = false;
  sWorkFrom: NgbDateStruct;
  sWorkTo: NgbDateStruct;
  subscription : Subscription;

  //更新、削除時のキー情報
  dataPrimaryKey : HistoryData;

  //言語環境 ListBox
  HistoryTypeListbox : Array<{status:string, name :string}>=[
    {status: '', name: ''}
    ,{status: HistoryType.LANGUAGE.value, name: HistoryType.LANGUAGE.name}
    ,{status: HistoryType.FRAMEWORK.value, name: HistoryType.FRAMEWORK.name}
    ,{status: HistoryType.DB.value, name: HistoryType.DB.name}
    ,{status: HistoryType.OS.value, name: HistoryType.OS.name}
  ];

  //言語環境保存領域
  LangInputData:Array<any>=[
    {type: "", details: "", version: ""}
    ,{type: "", details: "", version: ""}
    ,{type: "", details: "", version: ""}
    ,{type: "", details: "", version: ""}
    ,{type: "", details: "", version: ""}
    ,{type: "", details: "", version: ""}
    ,{type: "", details: "", version: ""}
    ,{type: "", details: "", version: ""}
    ,{type: "", details: "", version: ""}
  ];

  // checkbox用データ
  ProcessCheckboxData:Array<any>=[
    {key : ProcessType.RD.key, value : ProcessType.RD.name, selected : false}
    ,{key : ProcessType.BD.key, value : ProcessType.BD.name, selected : false}
    ,{key : ProcessType.PS.key, value : ProcessType.PS.name, selected : false}
    ,{key : ProcessType.PG.key, value : ProcessType.PG.name, selected : false}
    ,{key : ProcessType.UT.key, value : ProcessType.UT.name, selected : false}
    ,{key : ProcessType.IT.key, value : ProcessType.IT.name, selected : false}
    ,{key : ProcessType.ST.key, value : ProcessType.ST.name, selected : false}
    ,{key : ProcessType.OT.key, value : ProcessType.OT.name, selected : false}
    ,{key : ProcessType.OM.key, value : ProcessType.OM.name, selected : false}
  ]

  constructor(
    private auth: AuthService
    ,private fb: FormBuilder
    ,private messageService : MessageService
    ,private modalService: ModalService
    ,private restapi : RestapiService
    ,private historylistService : HistorylistService
  ) { }

  ngOnInit(): void {
    this.setFormgrp();
    this.getEnvFormGroups(9);
    // 更新時 業務履歴一覧画面から発生するイベント受信関数
    this.showHistoryDetail();

  }

  //-----------------------------------------------------------
  // FORM作成関数
  //-----------------------------------------------------------
  setFormgrp():void{
    //
    // フォーム作成
    this.fmGroup = this.fb.group({
      work_from : [moment(),[Validators.required]]  //期間FROM
      ,work_to : [moment(),[Validators.required]]  //期間FROM
      ,jobname : ['',[Validators.required]]  //案件名
      ,industry : ['',[Validators.required]]  //業種
      ,position : ['',[]]                           //ポジション
      ,scale : ['',[]]                              //規模
      ,persons : ['',[]]                            //人数
      ,details : ['',[]]                            //作業詳細
      ,process_group_list : this.fb.array([])      //経験工程
      ,envGroups : this.fb.array([])                //言語/環境
    },{validators : this.validateIfChecked});
  }
  // 言語/環境のフォームコントロール生成
  private getEnvFormGroups(count : number): void{
    //console.debug('getEnvFormGroup create');
    for( var i = 0; i < count; i++){
      this.envGroups.push(
        this.fb.group({
          type : [this.LangInputData[i].type,[]]
          ,details : [this.LangInputData[i].details,[]]
          ,version : [this.LangInputData[i].version,[]]
            })
      );
    }
  }

  //get fromDate(){return this.fmGroup.get('fromDate');}
  //get toDate(){return this.fmGroup.get('toDate');}
  get uuid(){return this.fmGroup.get('uuid');}
  get work_from(){return this.fmGroup.get('work_from');}
  get work_to(){return this.fmGroup.get('work_to');}
  get jobname(){return this.fmGroup.get('jobname');}
  get industry(){return this.fmGroup.get('industry');}
  get position(){return this.fmGroup.get('position');}
  get scale(){return this.fmGroup.get('scale');}
  get persons(){return this.fmGroup.get('persons');}
  get details(){return this.fmGroup.get('details');}
  //get requirements_definition() {return this.fmGroup.get('requirements_definition');}
  //get basic_design(){return this.fmGroup.get('basic_design');}
  //get detail_design(){return this.fmGroup.get('detail_design');}
  //get programing(){return this.fmGroup.get('programing');}
  //get unit_test(){return this.fmGroup.get('unit_test');}
  //get integration_test(){return this.fmGroup.get('integration_test');}
  //get system_test(){return this.fmGroup.get('system_test');}
  //get operation_test(){return this.fmGroup.get('operation_test');}
  //get operation(){return this.fmGroup.get('operation');}

  /*
  checkboxBuild() : FormArray{
    const obj = this.checkbox_groups.map( chkobj =>{
      return this.fb.control(chkobj.selected);
    });
    return this.fb.array(obj);
  }
*/
  //checkBoxValidator(control: FormArray) {
  checkBoxValidator(): ValidatorFn  {
    console.debug( "checkBoxValidator()");
    return (formArray:FormArray):{[key: string]: any} | null=>{
      let valid:boolean=false;
      formArray.controls.forEach((x:FormGroup)=>{
        if (x.value == false){
          console.debug("valud=:" + valid);
          console.debug(x);
          return  valid = false;
        }
      })
      console.debug( "valud=:" + valid);
      return valid?null:{error:'Not all name are a'}
    }
  }
  // FORM 全体入力チェックメソッド
  // チェックボックスのON/OFF変更は、
  // コントロール毎の入力チェックが発生しないらしい。
  // -> うそ　onChangeProcessCheckbox で出来ている！
  //    ここでは、期限日FROM TOの関係性のチェックのみ実施
  // ここからクラスメンバへのアクセスは何故か出来ないので
  // static化させてパラメータのacからアクセスする
  validateIfChecked(ac : AbstractControl) : void{
    console.debug('validateIfChecked');
    let wfrom_date = ac.get('work_from');
    let wto_date = ac.get('work_to');
    if ( (!wfrom_date) || (!wto_date)){
      return;
    }
    //console.debug(wfrom_date);
    //console.debug(wto_date);
    //console.debug(wfrom_date.value);
    //console.debug(wto_date.value);
    let from_yyyymm = HistoryComponent.ChangeYyyymm(wfrom_date);
    let to_yyyymm = HistoryComponent.ChangeYyyymm(wto_date);
    if ((from_yyyymm.length > 0) && (to_yyyymm.length > 0)){
      if (from_yyyymm > to_yyyymm){
        console.debug('期間From Toの値が不正です');
        ac.get('work_from').
          setErrors({ from_to_error:'期間From,Toの値が不正です'});
          ac.get('work_to').
          setErrors({ from_to_error:'期間From,Toの値が不正です'});
      }else{
        //console.debug('期間From Toの値がOK!!');
        ac.get('work_from').
          setErrors(null);
          ac.get('work_to').
          setErrors(null);
      }
    }
    /*
    return (form:FormGroup):{[key: string]: any} | null=>{
      let valid:boolean=false;

      // 期限日FROM/TOの日付が逆転していないかチェック
      let from_date = this.work_from.value
      let to_date = this.work_to.value
      if ((from_date.length > 0) && (to_date.length > 0)){
        if (from_date > to_date){
          return {error:'From/to date error'}
        }
      }


      // checkbox control
      const process_group_list = form.get('process_group_list') as FormArray;
      process_group_list.controls.forEach((x:FormGroup)=>{
        if (x.value){
          console.debug("valud=:" + x.valid);
          console.debug(x);
          return valid = true;
        }
      })
      console.debug( "valud=:" + valid);
      return valid?null:{error:'Not all name are a'}
    }
  */
  }

  get envGroups(){
    return this.fmGroup.get('envGroups') as FormArray;
  }

  //
  // チェックボックスクリックされた時に、チェックされた情報を格納し、
  // ボタン押下可否フラグの制御関数を呼出す
  onChangeProcessCheckbox(e){
    console.debug(e);
    const checkArray: FormArray = this.fmGroup.get('process_group_list') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.checkChangeProcessCheckbox();
  }

  //
  // ボタンを押下しても良いかのチェックをして
  // 可否フラグを設定する。
  // ボタン押下可否フラグの制御処理
  checkChangeProcessCheckbox() : void {
    console.debug('checkProcessGroupChecked');
    let CheckValue = true;
    const checkArray: FormArray = this.fmGroup.get('process_group_list') as FormArray;
    checkArray.controls.forEach((item: FormControl) => {
      console.debug(item);
      console.debug(item.value);
      //if ( item.value.value == true){
      //  console.debug('checkProcessGroupChecked OK!');
      CheckValue = false;
        return;
      //}
    });
    console.debug('checkProcessGroupChecked CheckValue!' + CheckValue);
    this.isDisable = CheckValue;
  }

/*
  onChangeProcessGroupList(key : string , value : boolean ) : void{
    console.debug( 'key=[' + key + ']-valu=[' + value + ']');
    console.debug( this.process_groups);

    // 保存処理
    // Trueになっているものがあるかチェックする
    // formGrp.value にKeyと値が格納されてきる
    let isAdd = false;
    this.process_groups.forEach(( formGrp, index ) =>{
      console.debug(formGrp);
      if ( key == formGrp.value.key){
        formGrp.value.value = value;
        isAdd = true;
        return;
      }
    });
    if (!isAdd){
      this.process_groups.push(
        this.fb.group({key: key, value: value}));
    }
    this.isDisable = value ? false : true;
    if (this.isDisable){
      this.checkProcessGroupChecked();
    }
    //
    // Falseの場合は現在保存されている値でチェックされているものがあるか確認する
  }
  // ボタン押下可否フラグの制御処理
  checkProcessGroupChecked() : void {
    console.debug('checkProcessGroupChecked');
    let CheckValue = true;
    this.process_groups.forEach(( formGrp, index ) =>{
      console.debug(formGrp);
      if ( formGrp.value.value == true){
        console.debug('checkProcessGroupChecked OK!');
        CheckValue = false;
        return;
      }
    });
    console.debug('checkProcessGroupChecked CheckValue!' + CheckValue);
    this.isDisable = CheckValue;
  }
*/

  InsertClick(){
    console.debug(this.fmGroup.value);
    this.modalService.confirm('業務経歴', '追加してよろしいですか？').then( result =>{
      if (!result){ return;}

      //
      // 入力FROM をDeepコピー実施
      let sendBody = _.cloneDeep(this.fmGroup.value);

      // work_from, work_to の値を変換する
      let from_yyyymm = HistoryComponent.ChangeYyyymm(this.work_from);
      let to_yyyymm = '';
      if (this.work_to.value){
        to_yyyymm = HistoryComponent.ChangeYyyymm(this.work_to);
      }
      //
      // work_from , work_to は作成した文字列にチェンジする
      sendBody.work_from = from_yyyymm;
      sendBody.work_to = to_yyyymm;

      //
      // Rangeキー生成(期間FROM + '/' + システム日付(yyyymmddhhmmss))
      //sendBody.rangekey = from_yyyymm.replace('/','-') + '-' + moment().format("YYYYMMDDHHmmss");
      //
      // 工程項目の値設定
      console.debug(sendBody.rangekey);
      sendBody['process_group_list'] = this.GetProcessGroupsJson();
      console.debug('BODY-DATA-------------------');
      console.debug(sendBody);
      this.restapi.postHistory(sendBody).subscribe(
        result=>{
          console.debug('InsertClick-Result');
          console.debug(result);
          this.messageService.Output(ConstType.TYPE.SUCCESS, '業務経歴を追加しました');

          //データ更新させるために画面一覧情報をリフレッシュさせる
          //this.historylistService.eventReset();

        },error =>{
          this.messageService.Output(ConstType.TYPE.DANGER, '業務経歴 追加失敗');
          console.error(`業務経歴 追加失敗:${error.message}`);
        }
      );
    });
  }

  onSubmit(){
    console.log(this.fmGroup.value);
  }

  // 数値年、月の変換関数
  // yyyy, mm(0 - 11 )  -> yyyy/mm
  //
  static ChangeYyyymm( control: AbstractControl ) : string {
    let yyyy = control.value.year().toString().padStart(4, '0');
    let mm = (control.value.month()+ 1).toString().padStart(2, '0');
    let yyyymm = yyyy + '/' + mm;
    return yyyymm;
  }

  DeleteClick(){
    console.debug('DeleteClick start');
    console.debug(this.dataPrimaryKey);
    this.modalService.confirm('業務経歴', '削除してよろしいですか？').then( result =>{
      if (!result){ return;}
        //
        // 入力FROM をDeepコピー実施
        console.debug(this.dataPrimaryKey);
        this.restapi.deleteHistory(this.dataPrimaryKey.rangekey).subscribe(result=>{
            console.debug('DeleteOK');
            console.debug(result);
            this.messageService.Output(ConstType.TYPE.SUCCESS, '業務経歴を1件削除しました');
        }),error=>{
          this.messageService.Output(ConstType.TYPE.DANGER, '業務経歴 削除失敗');
          console.error(`業務経歴 削除失敗:${error.message}`);
        }
    });
  }
  UpdateClick(){
    console.debug('UpdateClick start');
    console.debug(this.dataPrimaryKey);
    this.modalService.confirm('業務経歴', '更新してよろしいですか？').then( result =>{
      if (!result){ return;}
        //
        // 入力FROM をDeepコピー実施
        console.debug(this.dataPrimaryKey);

        //
        // 入力FROM をDeepコピー実施
        let sendBody = _.cloneDeep(this.fmGroup.value);


        // work_from, work_to の値を変換する
        let from_yyyymm = HistoryComponent.ChangeYyyymm(this.work_from);
        let to_yyyymm = '';
        if (this.work_to.value){
          to_yyyymm = HistoryComponent.ChangeYyyymm(this.work_to);
        }
        //
        // work_from , work_to は作成した文字列にチェンジする
        sendBody.work_from = from_yyyymm;
        sendBody.work_to = to_yyyymm;
        //
        // 登録日をコピーする
        if ('insert_date' in this.dataPrimaryKey){
          sendBody['insert_date'] = this.dataPrimaryKey.insert_date;
        }

        //
        // 工程項目の値設定
        console.debug(sendBody.rangekey);
        sendBody['process_group_list'] = this.GetProcessGroupsJson();
        console.debug('BODY-DATA-------------------');
        console.debug(sendBody);
        this.restapi.putHistory(this.dataPrimaryKey.rangekey, sendBody).subscribe(result=>{
            console.debug('UpdateOK');
            console.debug(result);
            this.messageService.Output(ConstType.TYPE.SUCCESS, '業務経歴を更新しました');
        }),error=>{
          this.messageService.Output(ConstType.TYPE.DANGER, '業務経歴 更新失敗');
          console.error(`業務経歴 更新失敗:${error.message}`);
        }
    });
  }

  //
  // 経験工程 INSERTデータ生成
  GetProcessGroupsJson() : any {
    let resultJson = {};
    const checkArray: FormArray = this.fmGroup.get('process_group_list') as FormArray;
    // 全部False設定
    this.ProcessCheckboxData.forEach(data=>{
      resultJson[data.key] = false;
    })
    // チェックされてる奴だけTrue上書き
    checkArray.controls.forEach(element => {
      resultJson[element.value] = true;
    });
    return resultJson;
  }

  //
  // 一覧画面のリンクボタンクリックで発火されるイベント
  // 受信したデータ内容で画面を初期化する。
  showHistoryDetail(){
    this.subscription = this.historylistService.historyUpdateSubject.subscribe(historyData=>{
      console.debug('HistoryData受信------------!!');
      console.debug(historyData);

      if (historyData == undefined){
        return;
      }
      //
      // 受信したデータのDeepコピー、Update, Delete時に利用
      // Deepじゃなくても大丈夫そうだけど...
      this.dataPrimaryKey = _.cloneDeep(historyData);
      //
      // 期間年月設定
      //this.work_from.setValue(moment([2017, 0]));
      let dates : string[];
      dates = historyData.work_from.split('/');
      dates[1] = (Number(dates[1]) - 1).toString();
      this.work_from.setValue(moment(dates));
      if (historyData.work_to){
        dates = historyData.work_to.split('/');
        dates[1] = (Number(dates[1]) - 1).toString();
        this.work_to.setValue(moment(dates));
      }
      this.jobname.setValue(historyData.jobname);
      this.industry.setValue(historyData.industry);
      this.position.setValue(historyData.position);
      this.scale.setValue(historyData.scale);
      this.persons.setValue(historyData.persons);
      this.details.setValue(historyData.details);

      //
      // 経験工程の初期設定
      Object.keys(historyData.process_group_list).forEach((key)=>{
        //console.debug( `KeyData:${key}`);
        this.ProcessCheckboxData.forEach((checkBoxItem)=>{
          if (key == checkBoxItem.key){
            //console.debug(`checkboxk ${key} value=[${historyData.process_group_list[key]}]`);
            checkBoxItem.selected = historyData.process_group_list[key];
          }
        })
      });
      //
      // チェックボックスON,OFF保存コントロールにも情報設定。
      // ChangeBoxItem.selectedでうまくチェックするように変更すれば良さそうだけど。
      //
      // 開発中だからだけどゴミデータがあるので画面表示以外のデータは保存しないようにする
      Object.keys(historyData.process_group_list).forEach((key)=>{
        console.debug(`checkBoxItem`);
        console.debug(historyData.process_group_list[key]);
        this.ProcessCheckboxData.forEach(checkBoxData=>{
          if ( checkBoxData.key == historyData.process_group_list[key]){
            if ( historyData.process_group_list[key]){
              const checkArray: FormArray = this.fmGroup.get('process_group_list') as FormArray;
              checkArray.push(new FormControl(key));
            }
          }
        });
      });

      //
      // 言語環境設定
      // ロジックへんだな・・。
      console.debug("言語環境設定");
      historyData.envGroups.forEach((hData,index)=>{
        //console.debug(hData);
        this.LangInputData[index].type = hData.type;
        this.LangInputData[index].details = hData.details;
        this.LangInputData[index].version = hData.version;
      });
      //一度コントロールをクリアする
      this.envGroups.clear();
      this.LangInputData.forEach((langData, index)=>{
          this.envGroups.push(
            this.fb.group({
              type : langData.type
              ,details: langData.details
              ,version: langData.version
            })
          );
      });

      //
      // 更新一覧画面からの遷移なので更新、削除ボタンを有効にする
      this.isUpdate = true;
      this.isDelete = true;
      this.isDisable = false;
      this.fmGroup.validator;
      console.debug(this.LangInputData);
      });
  }

  ngOnDestroy(){
    console.debug('ngOnDestroy--!!');
    if (this.subscription){
      this.subscription.unsubscribe();
      this.subscription = undefined;
      this.historylistService.eventReset();
    }
  }
}
