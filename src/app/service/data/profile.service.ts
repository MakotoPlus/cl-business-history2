import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable,BehaviorSubject,Subject} from 'rxjs';
import {MessageService} from './../../service/message.service';
import { User } from './../../component/user';
import {ConstType} from './../../component/common/ConstType';
import { AuthService } from './../../auth/auth.service';
import {RestapiService} from '../../service/restapi.service';
import {ProfileData} from '../../component/common/ProfileData';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof Sample1Component
   */
  private subscription!: Subscription;

  //user : User;

  //profileObservable: BehaviorSubject<ProfileData> = new BehaviorSubject<ProfileData>(new ProfileData());
  profileObservable: Subject<ProfileData> = new Subject<ProfileData>();
  constructor(
    private auth: AuthService
    ,private messageService : MessageService
    ,private restapi : RestapiService
  ) {
    //this.getUser();
  }

  /*
  private getUser(){
    this.subscription = this.auth.loggedIn.subscribe((login : User)=>{
      this.user = login;
        if (login.isLogin){
          this.getProfileData();
          console.debug("ProfileService::subscribe.login!!");
          console.debug(login);
        }else{
          console.debug("ProfileService::subscribe.logoff!!");
        }
    });
  }
  */
  getProfileData(){
    let ret = this.restapi.getUser().subscribe(
      result => {
        console.debug('profile getUser');
        console.debug(result);
        this.profileObservable.next(result);
      },error =>{
        this.messageService.Output(ConstType.TYPE.DANGER, 'ユーザ情報 取得失敗');
        console.error(`ユーザ情報 取得失敗:${error.message}`);
      }
    )
  }
}
