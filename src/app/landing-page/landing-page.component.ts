import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginParameter } from './services/login/login.parameter';
import { LoginReturn } from './services/login/login.return';
import { LoginService } from './services/login/login.service';
import { MailParameter } from './services/mail/mail.parameter';
import { MailReturn } from './services/mail/mail.return';
import { MailService } from './services/mail/mail.service';
import { RegisterParameter } from './services/register/register.parameter';
import { RegisterService } from './services/register/register.service';
import {RegisterReturn} from './services/register/register.return';

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
  public MailAPIParameter: MailParameter;

  constructor (public fb: FormBuilder,
    public router: Router,
    public registerService: RegisterService,
    public loginService: LoginService,
    private messageService: MessageService,
    private mailService: MailService) {
    this.registerForm = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      gender: ['', Validators.required],
    });

    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
}

  ngOnInit() {
  }

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

  dec2hex (dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }
  generateId(len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, this.dec2hex).join('');
  }

  register() {
    if (this.registerForm.valid) {

      var key = this.generateId(80);

      this.RegisterAPIParameter = {
        firstname: this.registerForm.get('firstname').value,
        lastname: this.registerForm.get('lastname').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        passwordConfirmation: this.registerForm.get('passwordConfirmation').value,
        gender: this.registerForm.get('gender').value,
        key: key
      };
      this.MailAPIParameter = {
        firstname: this.registerForm.get('firstname').value,
        email: this.registerForm.get('email').value,
        key: key
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
      this.mailService.sendMail(this.MailAPIParameter)
      .subscribe((result: MailReturn) => {
        if (result.success) {
          console.log('success: ', result);
        } else {
          console.log('fail: ', result);
        }
      });
    }
  }
}
