import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import {MessageService} from './../../service/message.service';
import {ConstType} from './../../component/common/ConstType';
import {Alert} from './../../interface/Alert';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public confirmationForm: FormGroup;
  public successfullySignup: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService : MessageService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      family_name:['', Validators.required],
      given_name:['', Validators.required],
    });
    this.confirmationForm = this.fb.group({
      email: ['', Validators.required],
      confirmationCode: ['', Validators.required]
    });
  }

  onSubmitSignup(value: any) {
    const email = value.email,
    password = value.password,
    family_name = value.family_name,
    given_name = value.given_name;
    this.auth.signUp(email, password,family_name,given_name ).subscribe(
    //this.auth.signUp(email, password ).subscribe(
      result => {
        console.log('SignupComponent::onSubmitSignup() success');
        this.messageService.Output(ConstType.TYPE.SUCCESS, 'ユーザ情報登録成功 認証コードをメールしました');
        this.successfullySignup = true;
      },
      error => {
        this.messageService.Output(ConstType.TYPE.DANGER, `ユーザ情報登録変更失敗:${error.message}`);
        console.log('SignupComponent::onSubmitSignup() error');
        console.log(error);
      }
    );
  }

  onSubmitConfirmation(value: any) {
    const email = value.email;
    const confirmationCode = value.confirmationCode;
    //
    // 認証後のログイン実行がエラーになるため実行しないよう変更
    this.auth.confirmSignUp(email, confirmationCode).subscribe(
      result => {
        this.messageService.Output(ConstType.TYPE.SUCCESS, '認証成功');
        console.log('onSubmitConfirmation()::success');
        this.router.navigate(['/']);
      },
      error => {
        this.messageService.Output(ConstType.TYPE.DANGER, `認証失敗:${error.message}`);
        console.log('onSubmitConfirmation()::error()');
        console.log(error);
      }
    );
  }
  /*----------------------------------------------------
    this.auth.confirmSignUp(email, confirmationCode).subscribe(
      result => {
        this.auth.signIn(email, this.auth.password).subscribe(
          () => {
            this.messageService.Output(ConstType.TYPE.SUCCESS, '認証成功');
            console.log('onSubmitConfirmation()::success');
            this.router.navigate(['/']);
          },
          error => {
            this.messageService.Output(ConstType.TYPE.DANGER, `認証失敗:${error.message}`);
            console.log('onSubmitConfirmation()::error');
            console.log(error);
            this.router.navigate(['/login']);
          }
        );
      },
      error => {
        this.messageService.Output(ConstType.TYPE.DANGER, `認証失敗:${error.message}`);
        console.log('onSubmitConfirmation()::error()');
        console.log(error);
      }
    );
  }----------------------------------------------------*/
}
