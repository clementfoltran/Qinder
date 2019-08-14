import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginParameter } from './services/login/login.parameter';
import { LoginReturn } from './services/login/login.return';
import { LoginService } from './services/login/login.service';
import { MailParameter } from './services/mail/mail.parameter';
import { MailReturn } from './services/mail/mail.return';
import { MailService } from './services/mail/mail.service';
import { RegisterParameter } from './services/register/register.parameter';
import { RegisterService } from './services/register/register.service';
import { RegisterReturn } from './services/register/register.return';
import { ActivateService } from './services/activate/activate.service';
import { EnterViewActivateReturn } from './services/enter-view-activate/enter-view-activate-return';
import { ActivateReturn } from './services/activate/activate.service-return';
import { DatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { splitAtColon } from '@angular/compiler/src/util';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { GeolocationReturn } from './services/geolocation/geolocation.return';
import { GeolocationParameter } from './services/geolocation/geolocation.parameter';
import * as $ from 'jquery';
import { GetUserOnlineParameter } from '../home/services/get-user-online/get-user-online-parameter';
import { GetUserOnlineService } from '../home/services/get-user-online/get-user-online.service';
import { GetUserOnlineReturn } from '../home/services/get-user-online/get-user-online-return';
import { ResetPasswordParameter } from './services/reset-password/reset-password.parameter';

declare var $: any;

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
  /**
   * User geolocation
   */
  public latitude: number;
  public longitude: number;
  public MailAPIParameter: MailParameter;
  public resolvedData: EnterViewActivateReturn;
  public bsValue: Date = new Date();
  public datePickerConfig: Partial<DatepickerConfig>;
  public APIParameterGetUserOnline: GetUserOnlineParameter;

  public forgotModeVar = 0;
  public forgotPasswordForm: FormGroup;
  public ResetPasswordAPIParameter: ResetPasswordParameter;

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  sendGeolocation(id_user: number) {
    const APIParameter: GeolocationParameter = {
      id_user,
      latitude: this.latitude,
      longitude: this.longitude
    };
    this.geolocationService.sendPosition(APIParameter).subscribe();
  }

  login() {
    if (this.loginForm.valid) {
      this.LoginAPIParameter = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };
      this.loginService.auth(this.LoginAPIParameter)
        .subscribe((result: LoginReturn) => {
          if (result.success) {
            // Connect successfully let's store the token
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', result.user_id.toString());
            this.getUserOnline(1);
            this.sendGeolocation(result.user_id);
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
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

  getUserOnline(online) {
    this.APIParameterGetUserOnline = {
      userId: +localStorage.getItem('userId'),
      online
    };
    this.getUserOnlineService.getUserOnline(this.APIParameterGetUserOnline)
      .subscribe((result: GetUserOnlineReturn) => {
        if (result.success) {
          console.log(result.message);
        } else {
          console.log(result.message);
        }
      });
  }

  dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }
  generateId(len) {
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join('');
  }

  register() {
    if (this.registerForm.valid) {
      const key = this.generateId(80);
      this.RegisterAPIParameter = {
        firstname: this.registerForm.get('firstname').value,
        lastname: this.registerForm.get('lastname').value,
        email: this.registerForm.get('email').value,
        birthdate: this.registerForm.get('birthdate').value.toISOString().slice(0, 10),
        password: this.registerForm.get('password').value,
        passwordConfirmation: this.registerForm.get('passwordConfirmation').value,
        gender: this.registerForm.get('gender').value,
        key
      };
      this.MailAPIParameter = {
        firstname: this.registerForm.get('firstname').value,
        email: this.registerForm.get('email').value,
        key
      };
      this.registerService.register(this.RegisterAPIParameter)
        .subscribe((result: RegisterReturn) => {
          if (result.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Register',
              detail: result.message,
              life: 6000
            });
          } else {
            console.log(result.message);
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
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Empty fields',
        detail: 'Fill all inputs',
        life: 6000
      });
    }
  }

  checkAccount(data) {
    const email = this.activatedRoute.snapshot.paramMap.get('email');
    const key = this.activatedRoute.snapshot.paramMap.get('key');

    if (data.email === email && data.key === key && data.confirm === 0) {
      this.verifyAccount(email);
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Welcome',
        detail: 'This account is already confirmed, you may login with your credentials :)',
        life: 6000
      });
    }
  }

  forgotMode() {
    if (this.forgotModeVar === 0) {
      this.forgotModeVar = 1;
    } else {
      this.forgotModeVar = 0;
    }
  }

  resetPassword() {
    if (this.forgotPasswordForm.valid) {
      this.ResetPasswordAPIParameter = {
        email: this.forgotPasswordForm.get('email').value,
      };
      console.log(this.ResetPasswordAPIParameter);
      // this.resetPasswordService.auth(this.ResetPasswordAPIParameter)
      //   .subscribe((result: ResetPasswordReturn) => {
      //     if (result.success) {

      //     } else {

      //     }
      //   });
    }
  }

  verifyAccount(email) {
      this.activateService.activateAccount(email)
        .subscribe((result: ActivateReturn) => {
          if (result.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Welcome',
              detail: 'Account successfully activated! You can now login :)',
              life: 6000
            });
          } else {
            console.log(result.message);
          }
        });
    }

    constructor(public fb: FormBuilder,
                public router: Router,
                public registerService: RegisterService,
                public loginService: LoginService,
                private messageService: MessageService,
                private mailService: MailService,
                public activatedRoute: ActivatedRoute,
                public geolocationService: GeolocationService,
                public activateService: ActivateService,
                public getUserOnlineService: GetUserOnlineService) {
    this.registerForm = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      birthdate: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      gender: ['', Validators.required],
    });

    this.loginForm = fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    });

    this.forgotPasswordForm = fb.group({
      email: ['', Validators.required],
      });

    this.datePickerConfig = Object.assign({
      containerClass: 'theme-orange',
      showWeekNumbers: false,
      maxDate: new Date(),
    });
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('email') &&
        this.activatedRoute.snapshot.paramMap.get('key')) {
      this.activatedRoute.data.forEach((data: {viewData: EnterViewActivateReturn }) => {
        this.resolvedData = data.viewData;
      });
      this.checkAccount(this.resolvedData);
    }
    this.registerForm.get('gender').setValue('Female');
    this.getLocation();
  }
}
