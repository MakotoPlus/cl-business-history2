import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { LoginService } from '../../service/login.service';
import { FormGroup, Validators, FormControl,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-userinfo-confirm',
  templateUrl: './userinfo-confirm.component.html',
  styleUrls: ['./userinfo-confirm.component.css']
})


export class UserinfoConfirmComponent implements OnInit {
  @Input() form_email: string;

  fmGroup : FormGroup;

  constructor(private auth: AuthService
    ,private loginService : LoginService
    ,private fb: FormBuilder
    ) { }

  ngOnInit(): void {
      //
      // フォーム作成
      this.fmGroup = this.fb.group({
        email : [this.form_email,[Validators.required, Validators.email]]
        ,code : ["",[Validators.required]]
      });
  }
  // html側でアクセスするメソッド
  get email() { return this.fmGroup.get('email'); }
  get code() { return this.fmGroup.get('code'); }

  onSubmit() {
    console.log(this.fmGroup.value);
    this.auth.verifyAttribute(this.fmGroup.value.code);
/*
    return new Promise((resolve, reject) => {
      this.auth.currentUser.verifyAttribute("email", confirmationCode, {
        onSuccess: (result) => {
          console.log('email verification success')
          var user = store.getters.user
          user["email_verified"] = "true"
          store.commit('setUser', user)

          resolve(result)
        },
        onFailure: (err) => {
          console.log('email verification failed')
          reject(err)
        }
      })
    })*/
  }
}
