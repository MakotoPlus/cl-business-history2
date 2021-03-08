import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Alert } from './../../interface/Alert';
import {MessageService} from './../../service/message.service';
import { ConstType } from './../common/ConstType';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public forgetForm: FormGroup;
  public confirmationForm: FormGroup;
  public successfullySignup: boolean;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.forgetForm = this.fb.group({
      email: ['', Validators.required],
    });
    this.confirmationForm = this.fb.group({
      email: ['', Validators.required],
      confirmationCode: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmitForget(value:any){
    this.auth.forgotPassword(value.email).then((result) =>{
      console.log("SUCCESS");
      this.messageService.Output(ConstType.TYPE.SUCCESS, '認証コードを送信しました');
      this.successfullySignup = true;
      this.confirmationForm= this.fb.group({
        email: [value.email, Validators.required],
        confirmationCode: ['', Validators.required],
        password: ['', Validators.required],
      });
    })
    .catch((error) =>{
      console.log(error);
      this.messageService.Output(ConstType.TYPE.DANGER, `承認コード送信失敗しました(${error.message})`);
    });
  }

  onForgotPasswordSubmit(value: any) {
    const email = value.email,
    confirmationCode = value.confirmationCode,
    newPasswd = value.password;
    this.auth.forgotPasswordSubmit(email, confirmationCode, newPasswd).then(
      result => {
        console.log('onSubmitConfirmation()::success');
        this.messageService.Output(ConstType.TYPE.SUCCESS, `パスワードの再設定が出来ました`);
        this.router.navigate(['/login']);
      },
      error => {
        this.messageService.Output(ConstType.TYPE.DANGER, `パスワードの再設定が出来ませんでした(${error})`);
        //this.router.navigate(['/login']);
      }
    );
  }
}
