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
import {CompanyService} from '../../service/data/company.service';
import {CompanyData} from '../../component/common/CompanyData';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  fmGroup : FormGroup;
  private profileSubscription: Subscription;
  companyData: CompanyData = new CompanyData();
  constructor(
    private fb: FormBuilder
    ,private messageService : MessageService
    ,private modalService: ModalService
    ,private restapi : RestapiService
    ,private companyService : CompanyService
    ,private atuth : AuthService
    ){ }

  ngOnInit(): void {
    this.setFormgrp();
    this.getCompony();
  }
  setFormgrp():void{
    //
    // フォーム作成
    this.fmGroup = this.fb.group({
      companycd : ['0',[Validators.required]]
      ,company_name : ['',[Validators.required]]
      ,postalcd : ['',[Validators.required]]
      ,address_1 : ['',[Validators.required]]
      ,address_2 : ['',[]]
      ,address_3 : ['',[]]
      ,tel : ['',[Validators.required]]
      ,fax : ['',[]]
      ,hp : ['',[]]
    });
  }
  //
  // 企業情報取得
  getCompony(){
    this.restapi.getCompany().subscribe(
        retData=>{
          console.debug('getCompony-result');
          console.debug(retData);
          this.companyData.setData(retData);
          this.setCompany(this.companyData);
        },error =>{
          console.debug('CompanyComponent:onSubmitConfirmation:error');
          console.error(`企業情報 取得失敗:${error.message}`);
          this.companycd.setValue(this.atuth.loginUser.companycd);
        }
    );
  }

  // ゲッター
  get companycd() {return this.fmGroup.get('companycd');}
  get company_name() {return this.fmGroup.get('company_name');}
  get postalcd() {return this.fmGroup.get('postalcd');}
  get address_1() {return this.fmGroup.get('address_1');}
  get address_2() {return this.fmGroup.get('address_2');}
  get address_3() {return this.fmGroup.get('address_3');}
  get tel() {return this.fmGroup.get('tel');}
  get fax() {return this.fmGroup.get('fax');}
  get hp() {return this.fmGroup.get('hp');}

  setCompany(data:CompanyData){
    //this.companycd.setValue(data.companycd.toString);
    console.debug(data.companycd);
    this.companycd.setValue(data.companycd);
    this.company_name.setValue(data.company_name);
    this.postalcd.setValue(data.postalcd);
    this.address_1.setValue(data.address_1);
    this.address_2.setValue(data.address_2);
    this.address_3.setValue(data.address_3);
    this.tel.setValue(data.tel);
    this.fax.setValue(data.fax);
    this.hp.setValue(data.hp);
  }


  onSubmit(){
    console.debug(this.fmGroup.value);
    this.modalService.confirm('Company', '変更を保存してよろしいですか？').then( result => {
      if (!result){ return;}
      let data = {
        company_name : this.company_name.value
        ,postalcd : this.postalcd.value
        ,address_1 : this.address_1.value
        ,address_2 : this.address_2.value
        ,address_3 : this.address_3.value
        ,tel : this.tel.value
        ,fax : this.fax.value
        ,hp : this.hp.value
        ,insert_date : this.companyData.insert_date
      };

      this.restapi.putCompany(this.companycd.value,
          this.atuth.loginUser.sub, data).subscribe((result=>{
          console.debug(result);
          this.messageService.Output(ConstType.TYPE.SUCCESS, 'Companyを更新しました');
        })
        ,error =>{
          this.messageService.Output(ConstType.TYPE.DANGER, 'Company 更新失敗');
          console.log('CompanyComponent:onSubmit:error');
          console.error(`Company 更新失敗:${error.message}`);
        });
    });
  }
}
