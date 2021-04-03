import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import {RestapiService} from '../../service/restapi.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../service/login.service';
import {IfUserinfo} from '../../interface/userinfo';
import {MessageService} from './../../service/message.service';
import { User } from './../../component/user';
import {ConstType, HistoryType} from './../../component/common/ConstType';
import {Alert} from './../../interface/Alert';
import { FormGroup, Validators, FormArray ,FormBuilder,ValidatorFn, FormControl} from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../service/modal.service';
import { constants } from 'buffer';
import { debug } from 'console';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  fmGroup : FormGroup;
  process_groups: FormGroup[] = [];
  isDisable : boolean = true; // isDisable : true=ボタン無効/false=ボタン有効
  sWorkFrom: NgbDateStruct;
  sWorkTo: NgbDateStruct;

  //ListBox
  HistoryTypeListbox : Array<{status:string, name :string}>=[
    {status: HistoryType.LANGUAGE.value, name: HistoryType.LANGUAGE.name}
    ,{status: HistoryType.FRAMEWORK.value, name: HistoryType.FRAMEWORK.name}
    ,{status: HistoryType.DB.value, name: HistoryType.DB.name}
    ,{status: HistoryType.OS.value, name: HistoryType.OS.name}
  ];

  process_check : {key:string, value:string}[]=[
    {key : 'RD', value : '要件・調査'}
    ,{key : 'BD', value : '基本設計'}
    ,{key : 'DD', value : '詳細設計'}
    ,{key : 'PG', value : '製造設計'}
    ,{key : 'UT', value : '単体テスト'}
    ,{key : 'IT', value : '結合テスト'}
    ,{key : 'ST', value : 'システムテスト'}
    ,{key : 'OT', value : '運用テスト'}
    ,{key : 'OP', value : '運用保守'}
  ]

  constructor(
    private auth: AuthService
    ,private fb: FormBuilder
    ,private formBuilder: FormBuilder
    ,private messageService : MessageService
    ,private modalService: ModalService
    ,private restapi : RestapiService
  ) { }

  ngOnInit(): void {
    this.setFormgrp();
    this.getEnvFormGroups(9);
  }

  //-----------------------------------------------------------
  // FORM作成関数
  //-----------------------------------------------------------
  setFormgrp():void{
    //
    // フォーム作成
    this.fmGroup = this.fb.group({
      work_from : ['',[Validators.required]]  //期間FROM
//      work_from : ['',[]]  //期間FROM
      ,work_to : ['',[]]                //期間TO
      ,jobname : ['jobname',[Validators.required]]  //案件名
      ,industry : ['industry',[Validators.required]]  //業種
      ,position : ['',[]]                           //ポジション
      ,scale : ['',[]]                              //規模
      ,persons : ['',[]]                            //人数
      ,details : ['',[]]                            //作業詳細
      ,process_group_list: this.formBuilder.array(  //経験工程
          this.process_groups, [this.checkBoxValidator])
//      ,process_group_list: this.formBuilder.array(  //経験工程
//            this.process_groups, [])
      ,envGroups : this.fb.array([])                //言語/環境

        /*
      ,envs : this.getEnvsForms(9)
      ,env01 : this.getEnvForms()
      ,env02 : this.getEnvForms()
      ,system_test : ['',[]]
      ,env03 : this.getEnvForms()
      ,env04 : this.getEnvForms()
      ,env05 : this.getEnvForms()
      ,env06 : this.getEnvForms()
      ,env07 : this.getEnvForms()
      ,env08 : this.getEnvForms()
      ,env09 : this.getEnvForms()
      ,requirements_definition : ['',[]]
      ,basic_design : ['',[]]
      ,detail_design : ['',[]]
      ,programing : ['',[]]
      ,integration_test : ['',[]]
      ,operation_test : ['',[]]
      ,operation : ['',[]]
      ,aliases: this.fb.array(
        [this.fb.control('')]
      )
      ,aliases2: this.fb.array(
        [this.fb.group(
          {type:['',[]]
          ,details : ['',[]]
          ,version : ['',[]]
          })
         ]
      )
      */
    },{validators : this.validateIfChecked});
  }
/*
  private getEnvForms() : FormGroup{
    return this.fb.group({
      type : ['tttt',[]]
      ,details : ['ddd',[]]
      ,version : ['1.02',[]]
    });
  }
  private getEnvsForms( count : number ) : void{
    for( var i = 0; i < count; i++){
      this.aliases.push(this.fb.control(''));
    }
  }
  private getEnvsForms2( count : number ) : void{
    console.log('aliase2 create');
    for( var i = 0; i < count; i++){
      this.aliases2.push(
        this.fb.group({
          type : ['DB',[]]
          ,details : ['ddd',[]]
          ,version : ['1.02',[]]
            })
      );
    }
  }
  get aliases(){
    return this.fmGroup.get('aliases') as FormArray;
  }
  get aliases2(){
    return this.fmGroup.get('aliases2') as FormArray;
  }
  */
  // 言語/環境のフォームコントロール生成
  private getEnvFormGroups(count : number): void{
    console.debug('getEnvFormGroup create');
    for( var i = 0; i < count; i++){
      this.envGroups.push(
        this.fb.group({
          type : ['',[]]
          ,details : ['',[]]
          ,version : ['',[]]
            })
      );
    }
  }

  get uuid(){return this.fmGroup.get('uuid');}
  //get work_from(){return this.fmGroup.get('work_from');}
  //get work_to(){return this.fmGroup.get('work_to');}
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

  //checkBoxValidator(control: FormArray) {
  checkBoxValidator(): ValidatorFn  {
    return (formArray:FormArray):{[key: string]: any} | null=>{
      let valid:boolean=false;
      formArray.controls.forEach((x:FormGroup)=>{
        if (x.value == false){
          console.debug( "valud=:" + valid);
          console.debug( x);
          return  valid = false;
        }
      })
      console.debug( "valud=:" + valid);
      return valid?null:{error:'Not all name are a'}
    }
  }

  // FORM 全体入力チェックメソッド
  // チェックボックスのON/OFF変更は、コントロール毎の入力チェックが発生しないらしい。
  validateIfChecked() : ValidatorFn  {
    console.debug('validateIfChecked');
    return (form:FormGroup):{[key: string]: any} | null=>{
      let valid:boolean=false;
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
  }

  get envGroups(){
    return this.fmGroup.get('envGroups') as FormArray;
  }

  onChangeProcessGroupList(key : string , value : boolean ) : void{
    console.debug( 'key=[' + key + ']-valu=[' + value + ']');
    console.debug( this.process_groups);

    //console.log('INVALID=[' + this.fmGroup.invalid + ']');
    //const process_group_list = this.fmGroup.get('process_group_list') as FormArray;
    //let valid : boolean = false;
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

  InsertClick(){
    console.debug(this.fmGroup.value);
    this.modalService.confirm('業務経歴', '追加してよろしいですか？').then( result =>{
      if (!result){ return;}
      this.restapi.postHistory(this.auth.loginUser.sub
        ,this.auth.loginUser.idToken, this.fmGroup.value
      ).subscribe(
        result=>{
          console.debug('InsertClick-Result');
          console.debug(result);
          this.messageService.Output(ConstType.TYPE.SUCCESS, '業務経歴を追加しました');
        },error =>{
          this.messageService.Output(ConstType.TYPE.DANGER, `業務経歴 追加失敗:${error.message}`);
          console.log(error);
        }
      );
    });
  }

  onSubmit(){
    console.log(this.fmGroup.value);
  }
}
