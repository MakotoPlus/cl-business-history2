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
import {ProfileService} from '../../service/data/profile.service';
import {ProfileData} from '../../component/common/ProfileData';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  model: NgbDateStruct;
  fmGroup : FormGroup;
  private profileSubscription: Subscription;
  subscription : Subscription;
  //user : User;

  constructor(
      private auth: AuthService
      ,private fb: FormBuilder
      ,private messageService : MessageService
      ,private modalService: ModalService
      ,private restapi : RestapiService
      ,private profileService : ProfileService
      ){ }

  ngOnInit(): void {
    //this.getUser();
    this.setFormgrp();
    this.getProfile();
    this.profileService.getProfileData();
  }

  //ユーザ情報取得
  /*
  getUser():void {
    this.subscription = this.auth.loggedIn.subscribe((login : User)=>{
      if (login.isLogin){
        console.debug("ProfileComponent::subscribe.login!!");
        console.debug(login);
      }
      this.user = login;
    });
  }
  */
  // プロフィール情報取得
  getProfile(){
    this.profileSubscription = this.profileService
      .profileObservable.subscribe((profileData: ProfileData)=>{
      console.debug('getProfile.......data');
      console.debug(profileData);
      this.setUser(profileData);
    })
  }

  setFormgrp():void{
    //
    // フォーム作成
    this.fmGroup = this.fb.group({
      initial : ['',[]]
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

  // ゲッター
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
      this.restapi.putUser(this.fmGroup.value).subscribe(
        result=>{
          console.debug('submit-result');
          console.debug(result);
          this.messageService.Output(ConstType.TYPE.SUCCESS, 'Profileを更新しました');
        }
        ,error =>{
          this.messageService.Output(ConstType.TYPE.DANGER, 'Profile 更新失敗');
          console.log('ProfileComponent:onSubmitConfirmation:error');
          console.error(`Profile 更新失敗:${error.message}`);
        }
      )
    });
  }

  ngOnDestroy() {
    console.debug('this.profileSubscription.unsubscribe()');
    this.profileSubscription.unsubscribe();
    //console.debug('this.subscription.unsubscribe()');
    //this.subscription.unsubscribe();
  }

}
