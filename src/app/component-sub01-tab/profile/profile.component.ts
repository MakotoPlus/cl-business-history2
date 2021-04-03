import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import {RestapiService} from '../../service/restapi.service';
import { Subscription } from 'rxjs';
import {MessageService} from './../../service/message.service';
import { User } from './../../component/user';
import {ConstType} from './../../component/common/ConstType';
import {Alert} from './../../interface/Alert';
import { FormGroup, Validators, FormControl,FormBuilder } from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../service/modal.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  model: NgbDateStruct;
  //date: {year: number, month: number};
  //private token: string;
  fmGroup : FormGroup;
  //subscriptionLogin: Subscription;

  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof Sample1Component
   */
   private subscription!: Subscription;

  constructor(
      private auth: AuthService
      ,private fb: FormBuilder
      ,private messageService : MessageService
      ,private modalService: ModalService
      ,private restapi : RestapiService
      ){ }

  ngOnInit(): void {
    this.setFormgrp();
    this.getUser();
  }

  //ユーザ情報取得
  getUser():void {
    this.subscription = this.auth.loggedIn.subscribe((login : User)=>{
      if (login.isLogin){
        console.log("ProfileComponent::subscribe.login!!");
        console.log(login);
        let ret = this.restapi.getUser(this.auth.loginUser.sub,
          this.auth.loginUser.idToken).subscribe(
          result => {
            console.log('profile getUser');
            console.log(result);
            this.setUser(result);
          }
        );
      }
    });
  }

  setFormgrp():void{
    //
    // フォーム作成
    this.fmGroup = this.fb.group({
      initial : ['',[]]
      //,family_name : ['',[Validators.required]]
      //,given_name : ['',[Validators.required]]
      ,family_name_kana : ['',[]]
      ,given_name_kana : ['',[]]
      ,birthday : ['',[Validators.required]]
      ,sex : ['',[]]
      ,station : ['',[]]
      ,train : ['',[]]
      ,address : ['',[]]
      ,date_joined : ['',[]]
      ,pr : ['',[]]
      ,qualifications : ['',[]]

    });
  }
  // html側でアクセスするメソッド
  //get family_name() {return this.fmGroup.get('family_name');}
  //get given_name() {return this.fmGroup.get('given_name');}
  get family_name_kana() {return this.fmGroup.get('family_name_kana');}
  get given_name_kana() {return this.fmGroup.get('given_name_kana');}
  get initial() {return this.fmGroup.get('initial');}
  //get birthday() {return this.fmGroup.get('birthday');}
  get sex() {return this.fmGroup.get('sex');}
  get station() {return this.fmGroup.get('station');}
  get train() {return this.fmGroup.get('train');}
  get address() {return this.fmGroup.get('address');}
  get pr() {return this.fmGroup.get('pr');}
  get qualifications() {return this.fmGroup.get('qualifications');}
  get date_joined() {return this.fmGroup.get('date_joined');}


  setUser(r){
    if ('initial' in r){
      this.initial.setValue(r.initial);
    }
    //if ('family_name' in r ){
    //  this.family_name.setValue(r.family_name);
    //}
    //if ('given_name' in r ){
    //  this.given_name.setValue(r.given_name);
    //}
    if ('family_name_kana' in r ){
      this.family_name_kana.setValue(r.family_name_kana);
    }
    if ('given_name_kana' in r ){
      this.given_name_kana.setValue(r.given_name_kana);
    }
    if ('birthday' in r ){
      console.log(r.birthday)
      if (r.birthday){
        this.model = {
          year : r.birthday.year
          ,month : r.birthday.month
          ,day : r.birthday.day
        }
      }
    }
    if ('sex' in r ){
      this.sex.setValue(r.sex);
    }
    if ('station' in r ){
      this.station.setValue(r.station);
    }
    if ('train' in r ){
      this.train.setValue(r.train);
    }
    if ('address' in r ){
      this.address.setValue(r.address);
    }
    if ('date_joined' in r ){
      this.date_joined.setValue(r.date_joined);
    }
    if ('pr' in r ){
      console.log(r.pr)
      this.pr.setValue(r.pr);
    }
    if ('email' in r){
      //this.initial.setValue(r.initial);
    }
    if ('qualifications' in r){
      this.qualifications.setValue(r.qualifications);
    }
    if ('company_id' in r ){
      //this.initial.setValue(r.initial);
    }
  }

  onSubmit(){
    console.debug(this.fmGroup.value);
    this.modalService.confirm('Profile', '変更を保存してよろしいですか？').then( result => {
      if (!result){ return;}
      console.debug('submit result' + result);
      this.restapi.putUser(this.auth.loginUser.sub,
        this.auth.loginUser.idToken, this.fmGroup.value
      ).subscribe(
        result=>{
          console.debug('submit-result');
          console.debug(result);
          this.messageService.Output(ConstType.TYPE.SUCCESS, 'Profileを更新しました');

        }
        ,error =>{
          this.messageService.Output(ConstType.TYPE.DANGER, `Profile 更新失敗:${error.message}`);
          console.log('ProfileComponent:onSubmitConfirmation:error');
          console.log(error);
        }
      )
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    //this.subscriptionLogin.unsubscribe();
  }

}
