import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import {RestapiService} from '../../service/restapi.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../service/login.service';
import {IfUserinfo} from '../../interface/userinfo';
import {MessageService} from './../../service/message.service';
import { User } from './../../component/user';
import {ConstType} from './../../component/common/ConstType';
import {Alert} from './../../interface/Alert';
import { FormGroup, Validators, FormControl,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private token: string;
  fmGroup : FormGroup;
  /*
  form_initial : string
  form_family_name_kana : string
  form_given_name_kana : string
  form_family_name : string
  form_given_name : string
  form_birthday : string
  form_sex : string
  form_train : string
  form_station : string
  form_address : string
  form_date_joined : string
  form_first_name : string
  form_pr : string
  form_email : string
  form_company_id : string
  form_qualifications : string
  */
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
      ,private loginService : LoginService
      ,private messageService : MessageService
      , private restapi : RestapiService
      ){ }

  ngOnInit(): void {

    console.log('profile ngOnInit');
    this.setFormgrp();
    this.getUser();
    /*
    this.auth.getIdToken().then( token => {
      console.log('profile ngOnInit::getIdToken');
      this.token = token;
    });
    */
  }

  //ユーザ情報取得
  getUser():void {
    this.subscription = this.auth.loggedIn.subscribe((login : User)=>{
      if (login.isLogin){
        console.log("ProfileComponent::subscribe.login!!");
        //this.messageService.Output(ConstType.TYPE.INFO, "ProfileComponent::subscribe.login!!");
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
      initial : ['',[Validators.required]]
      ,family_name : ['',[Validators.required]]
      ,given_name : ['',[Validators.required]]
      ,family_name_kana : ['',[Validators.required]]
      ,given_name_kana : ['',[Validators.required]]
      ,birthday : ['',[Validators.required]]
      ,sex : ['',[Validators.required]]
      ,station : ['',[]]
      ,train : ['',[]]
      ,address : ['',[]]
      ,date_joined : ['',[]]
      ,pr : ['',[]]
      ,qualifications : ['',[]]

    });
  }
  // html側でアクセスするメソッド
  get family_name() {return this.fmGroup.get('family_name');}
  get given_name() {return this.fmGroup.get('given_name');}
  get family_name_kana() {return this.fmGroup.get('family_name_kana');}
  get given_name_kana() {return this.fmGroup.get('given_name_kana');}
  get initial() {return this.fmGroup.get('initial');}
  get birthday() {return this.fmGroup.get('birthday');}
  get sex() {return this.fmGroup.get('sex');}
  get station() {return this.fmGroup.get('station');}
  get train() {return this.fmGroup.get('train');}
  get address() {return this.fmGroup.get('address');}
  get pr() {return this.pr.get('date_joined');}
  get qualifications() {return this.qualifications.get('date_joined');}
  get date_joined() {return this.fmGroup.get('date_joined');}


  setUser(r){
    if ('initial' in r){
      this.initial.setValue(r.initial);
    }
    if ('family_name' in r ){
      this.family_name.setValue(r.family_name);
    }
    if ('given_name' in r ){
      this.given_name.setValue(r.given_name);
    }
    if ('family_name_kana' in r ){
      this.family_name_kana.setValue(r.family_name_kana);
    }
    if ('given_name_kana' in r ){
      this.given_name_kana.setValue(r.given_name_kana);
    }
    if ('birthday' in r ){
      this.birthday.setValue(r.birthday);
    }
    if ('family_name' in r ){
      this.family_name.setValue(r.family_name);
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
      this.initial.setValue(r.pr);
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

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    //this.subscriptionLogin.unsubscribe();
  }

}
