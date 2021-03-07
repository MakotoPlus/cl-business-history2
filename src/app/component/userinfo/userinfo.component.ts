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
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  subscriptionLogin: Subscription;
  loggedIn : boolean = false;
  loginuser : User;

  form_email : string;
  form_family_name : string;
  form_given_name : string;
  fmGroup : FormGroup;

  constructor(private auth: AuthService
    ,private loginService : LoginService
    ,private fb: FormBuilder
//    ,private _modalService: NgbModal
    ,private modalService: ModalService
    ) {}
/*
    open(name: string) {
      let ret = this._modalService.open(MODALS[name]);
      console.log(ret);
    }
*/

    ngOnInit() {
      this.subscriptionLogin = this.auth.loggedIn.subscribe((login : User)=>{
      if (login){
        //
        // ログイン情報取得
        console.log("UserinfoComponent::subscribe.login!!")
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
        console.log("UserinfoComponent::subscribe.logout....")
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
    Validators.required(this.fmGroup.value.email);
    console.log(Validators.required(this.fmGroup.value.email));
    //this.fmGroup.validator

  }

 /**
   * クリックイベント
   *
   * @param {*} $event イベント情報
   * @memberof AppComponent
   */
  public onClick($event: any) {
    console.log('event');
    console.log($event);
    this.modalService.confirm('Title', 'Message').then( result => {
      console.log('custom confirm');
      console.log(result);

    }).catch( error =>{
      console.log('custom error');
      console.log(error);
    });
  }


  ngOnDestroy() {
  }

}

