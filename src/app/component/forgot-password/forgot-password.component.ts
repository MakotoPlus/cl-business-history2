import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  errmessage : string;
  message : string;
  public forgetForm: FormGroup;
  public confirmationForm: FormGroup;
  public successfullySignup: boolean;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
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
    this.errmessage = '';
    this.auth.forgotPassword(value.email).then((result) =>{
      console.log("SUCCESS");
      this.message = '認証コードを送信しました。';
      this.successfullySignup = true;
      this.confirmationForm= this.fb.group({
        email: [value.email, Validators.required],
        confirmationCode: ['', Validators.required],
        password: ['', Validators.required],
      });
    })
    .catch((error) =>{
      console.log(error);
      this.errmessage = `承認コード送信失敗しました。(${error.message})`;
    });
  }

  onForgotPasswordSubmit(value: any) {
    const email = value.email,
    confirmationCode = value.confirmationCode,
    newPasswd = value.password;
    this.auth.forgotPasswordSubmit(email, confirmationCode, newPasswd).then(
      result => {
        console.log('onSubmitConfirmation()::success');
        this.router.navigate(['/login']);
      },
      error => {
        this.errmessage = `パスワードの再設定が出来ませんでした。(${error})`;
        //this.router.navigate(['/login']);
      }
    );
  }
}
