import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';

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
        this.successfullySignup = true;
      },
      error => {
        console.log('SignupComponent::onSubmitSignup() error');
        console.log(error);
      }
    );
  }

  onSubmitConfirmation(value: any) {
    const email = value.email,
      confirmationCode = value.confirmationCode;
    this.auth.confirmSignUp(email, confirmationCode).subscribe(
      result => {
        this.auth.signIn(email, this.auth.password).subscribe(
          () => {
            console.log('onSubmitConfirmation()::success');
            this.router.navigate(['/']);
          },
          error => {
            console.log('onSubmitConfirmation()::error');
            console.log(error);
            this.router.navigate(['/login']);
          }
        );
      },
      error => {
        console.log('onSubmitConfirmation()::error()');
        console.log(error);
      }
    );
  }
}
