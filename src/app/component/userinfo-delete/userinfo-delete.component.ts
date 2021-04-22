import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { LoginService } from '../../service/login.service';
import { FormGroup, Validators, AbstractControl, ValidatorFn, FormControl,FormBuilder } from '@angular/forms';
import { isSyntheticPropertyOrListener } from '@angular/compiler/src/render3/util';
import {MessageService} from './../../service/message.service';
import { ModalService } from '../../service/modal.service';


@Component({
  selector: 'app-userinfo-delete',
  templateUrl: './userinfo-delete.component.html',
  styleUrls: ['./userinfo-delete.component.css']
})
export class UserinfoDeleteComponent implements OnInit {
  fmGroup : FormGroup;

  constructor(private auth: AuthService
    ,private fb: FormBuilder
    ,private messageService : MessageService
    ,private modalService: ModalService
    ) { }

  ngOnInit(): void {
    //
    // フォーム作成
    this.fmGroup = this.fb.group({
      email : ["",[Validators.required, Validators.email, checkEmailValidator(this.auth.loginUser.email)]]
    });
    //},{validators : this.validateIfChecked});
  }
  // html側でアクセスするメソッド
  get email() { return this.fmGroup.get('email'); }

  /*
    console.debug('checkEmailValidator');
    console.debug(`input email=${emailctl.value}`);
    if ( this.auth.loginUser.email != emailctl.value){
      emailctl.setErrors({ match : 'メールアドレスが一致しません' });
    }else{
      emailctl.setErrors(null);
    }
  }
  */
  validateIfChecked(ac : AbstractControl) : void{
    console.debug('validateIfChecked');
    let emailctl = ac.get('email');
    console.debug(`input email=${emailctl.value}`);
    if ( this.auth.loginUser.email != emailctl.value){
      emailctl.setErrors({ match : 'メールアドレスが一致しません' });
    }else{
      emailctl.setErrors(null);
    }
  }

  onSubmit(){
    this.modalService.confirm('ユーザアカウント', '削除してよろしいですか？').then( result =>{
      if (!result){ return;}
      this.auth.deleteUser();
    });
  }
}

export function checkEmailValidator(email: string): ValidatorFn {
  console.debug("email:" + email);
  return (control: AbstractControl): {[key: string]: any} | null => {
    return email == (control.value) ? null : {emailmatch: {value: control.value}};
  };
}
