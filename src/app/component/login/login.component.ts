import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
// subscribe を保持するための Subscription を import
// Angular Ver.6.x.x では rxjs から直接importするように変更された
import { Subscription } from 'rxjs';
// サービスを登録するための import
// アプリ全体でのサービスの共有､コンポーネント単位でのサービスの共有に関わらず､ここの import は必要
import { LoginService } from '../../service/login.service';
// @Output デコレータを使用するための import
import { Output, EventEmitter } from '@angular/core';
import {MessageService} from './../../service/message.service';
import {ConstType} from './../../component/common/ConstType';
import {Alert} from './../../interface/Alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  errmessage : string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private messageService : MessageService,
    private loginService : LoginService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitLogin(value: any) {
    this.errmessage = '';
    const email = value.email,
      password = value.password;
    this.auth.signIn(email, password).subscribe(
      result => {
        console.debug('onSubmitLogin() Success');
        console.debug(result);
        this.router.navigate(['/']);
      },
      error => {
        if ( error['code'] == 'InvalidParameterException' ||
          error['code'] == '"User does not exist."'){
          this.messageService.Output(ConstType.TYPE.DANGER, 'ユーザ名パスワードが違います');
        } else{
          this.messageService.Output(ConstType.TYPE.DANGER, `エラーが発生しました。${error['code']}`);
        }
        console.log('onSubmitLogin() error');
        console.log(error);
      }
    );
  }
}
