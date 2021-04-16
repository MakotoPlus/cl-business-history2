import { Injectable } from '@angular/core';
import {CompanyData} from '../../component/common/CompanyData';
import { Subject,Subscription} from 'rxjs';
import {ConstType} from './../../component/common/ConstType';
import { AuthService } from './../../auth/auth.service';
import {RestapiService} from '../../service/restapi.service';
import {MessageService} from './../../service/message.service';
import { User } from './../../component/user';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private subscription!: Subscription;
  companyObservable: Subject<CompanyData> = new Subject<CompanyData>();
  user : User;

  constructor(
    private auth: AuthService
    ,private messageService : MessageService
    ,private restapi : RestapiService
  ) { }

  private getUser(){
    this.subscription = this.auth.loggedIn.subscribe((login : User)=>{
      this.user = login;
        if (login.isLogin){
          this.getCompanyData();
          console.debug("CompanyService::subscribe.login!!");
          console.debug(login);
        }else{
          console.debug("CompanyService::subscribe.logoff!!");
        }
    });
  }

  getCompanyData(){

  }
}
