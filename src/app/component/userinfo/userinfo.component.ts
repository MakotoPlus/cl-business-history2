import { Component, OnInit, Type} from '@angular/core';
import { FormGroup, Validators, FormControl,FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { LoginService } from '../../service/login.service';
import { User } from '../../component/user';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})

export class UserinfoComponent implements OnInit {
  subscriptionLogin: Subscription;
  loggedIn : boolean = false;
  loginuser : User;
  form_email : string;
  form_family_name : string;
  form_given_name : string;
  fmGroup : FormGroup;
  successfullySignup : boolean = false;
  old_email : string;

  constructor(private auth: AuthService
    ,private loginService : LoginService
    ,private fb: FormBuilder
    ,private modalService: ModalService
    ) {}
    ngOnInit() {
      this.subscriptionLogin = this.auth.loggedIn.subscribe((login : User)=>{
      if (login){
        //
        // ログイン情報取得
        console.debug(`UserinfoComponent::subscribe.login=${login.isLogin}`)
        this.loginuser = this.auth.loginUser;
        this.loggedIn = login.isLogin;
        this.form_email = this.loginuser.email;
        this.form_family_name = this.loginuser.family_name;
        this.form_given_name = this.loginuser.given_name;
        //
        // フォーム作成
        this.fmGroup = this.fb.group({
          email : [this.form_email,[Validators.required, Validators.email]]
          ,family_name : [this.form_family_name,[Validators.required]]
          ,given_name : [this.form_given_name,[Validators.required]]
        });
      }else{
        console.debug("UserinfoComponent::subscribe.logout....")
        this.loggedIn = false;
      }
    });
    console.log(this.auth);
  }

  // html側でアクセスするメソッド
  get email() { return this.fmGroup.get('email'); }
  get family_name() { return this.fmGroup.get('family_name'); }
  get given_name() { return this.fmGroup.get('given_name'); }

  onSubmit() {
    console.log(this.fmGroup.value);

    this.modalService.confirm('ユーザ情報変更', '実行してよろしいですか？').then( result => {
      console.debug('custom confirm');
      //
      //emailが変更されているか確認し変更されていない場合は、呼出しパラメータに設定しない。
      //(まぁしても影響無いんだけど。。)
      let email_param = undefined;
      if ( this.loginuser.email != this.fmGroup.get('email').value ){
        email_param = this.fmGroup.get('email').value;
      }
      this.auth.currentAuthenticatedUser(
        this.fmGroup.get('family_name').value
        ,this.fmGroup.get('given_name').value
        ,this.successfullySignup
        ,email_param
      );
    }).catch( error =>{
      console.log('custom error');
      console.log(error);
    });
  }

  //
  // ユーザ情報変更処理実行
  onUpdateUserInfo(){

  }

  ngOnDestroy() {
    this.subscriptionLogin.unsubscribe();
  }

}

