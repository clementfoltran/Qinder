import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {RegisterService} from './services/register/register.service';
import {RegisterParameter} from './services/register/register.parameter';
import {RegisterReturn} from './services/register/register.return';
import {LoginParameter} from './services/login/login.parameter';
import {LoginService} from './services/login/login.service';
import {LoginReturn} from './services/login/login.return';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  /**
   * Register form
   *
   */
  public registerForm: FormGroup;
  /**
   * Login form
   *
   */
  public loginForm: FormGroup;
  /**
   * Type interface of register data structure
   *
   */
  public RegisterAPIParameter: RegisterParameter;
  /**
   * Type interface of login data structure
   *
   */
  public LoginAPIParameter: LoginParameter;

  login() {
    if (this.loginForm.valid) {
      this.LoginAPIParameter = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };
      this.loginService.auth(this.LoginAPIParameter)
        .subscribe((result: LoginReturn) => {
          console.log(result);
          if (result.success) {
            // Connect successfully let's store the token
            localStorage.setItem('token', result.token);
            this.router.navigate(['/home']);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: result.message,
              life: 6000
            });
          }
        });
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.RegisterAPIParameter = {
        firstname: this.registerForm.get('firstname').value,
        lastname: this.registerForm.get('lastname').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('passwd').value,
        gender: this.registerForm.get('gender').value
      };
      this.registerService.register(this.RegisterAPIParameter)
        .subscribe((result: RegisterReturn) => {
          if (result.success) {
            // Connect successfully let's store the token
            localStorage.setItem('token', result.token);
            this.router.navigate(['/home']);
            this.messageService.add({
              severity: 'success',
              summary: 'Welcome',
              detail: 'Welcome on Qinder',
              life: 6000
            });
          } else {
            // TODO error handler (same email, password doesn't match)
          }
        });
    }
  }

  constructor (public fb: FormBuilder,
              public router: Router,
              public registerService: RegisterService,
              public loginService: LoginService,
              private messageService: MessageService) {
    this.registerForm = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      passwd: ['', Validators.required],
      gender: ['', Validators.required],
    });

    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}
}
