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
    return ('0' + dec.toString(16)).substr(-2)
  }
  generateId (len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, this.dec2hex).join('')
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
        gender: this.registerForm.get('gender').value
      };
      this.MailAPIParameter = {
        firstname: this.registerForm.get('firstname').value,
        email: this.registerForm.get('email').value,
        key: key
      };
      // this.registerService.register(this.RegisterAPIParameter)
      //   .subscribe((result: RegisterReturn) => {
      //     if (result.success) {
      //       // Connect successfully let's store the token
      //       localStorage.setItem('token', result.token);
      //       this.router.navigate(['/home']);
      //       this.messageService.add({
      //         severity: 'success',
      //         summary: 'Welcome',
      //         detail: 'Welcome on Qinder',
      //         life: 6000
      //       });
      //     } else {
      //       // TODO error handler (same email, password doesn't match)
      //     }
      //   });
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

  CheckFirstName(event) {
    const firstname_message = document.getElementById("firstname_message");
    var firstname = (document.getElementById("firstname") as HTMLInputElement).value; 

    if (firstname.length > 1) {
      firstname_message.innerHTML = "✓ Beautiful name!";
      firstname_message.style.color = "green";
    } else {
      firstname_message.innerHTML = "✗ Too short :(";
      firstname_message.style.color = "red";
    }
  }
  CheckLastName(event) {
    const lastname_message = document.getElementById("lastname_message");
    var lastname = (document.getElementById("lastname") as HTMLInputElement).value;

    if (lastname.length > 1) {
      lastname_message.innerHTML = "✓ Beautiful family name!";
      lastname_message.style.color = "green";
    } else {
      lastname_message.innerHTML = "✗ Too short :(";
      lastname_message.style.color = "red";
    }
  }

  CheckEmail(event) {
    const email_message = document.getElementById("email_message");
    var email = (document.getElementById("email") as HTMLInputElement).value; 

    if (/^[a-z0-9\_\.\-]{2,20}\@[a-z0-9\_\-]{2,20}\.[a-z]{2,9}$/.test(email)) {
      email_message.innerHTML = "✓ Valid email format";
      email_message.style.color = "green";
    } else {
      email_message.innerHTML = "✗ Wrong email format";
      email_message.style.color = "red";
    }
  }
  
  CheckPassword(event) {
    const password_len_message = document.getElementById("password_len_message");
    const password_up_message = document.getElementById("password_up_message");
    const password_num_message = document.getElementById("password_num_message");
    const password_spe_message = document.getElementById("password_spe_message");
    var password = (document.getElementById("password") as HTMLInputElement).value; 
   
    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/; 
    var aNumber = /[0-9]/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|=|+|-|_]/;
 
    if (password.length < 8)
    {
        password_len_message.innerHTML = "✗ 8 characters or more";
        password_len_message.style.color = "red";
    } else {
        password_len_message.innerHTML = "✓ 8 characters or more";
        password_len_message.style.color = "green";
    }

    var numUpper = 0;
    var numNums = 0;
    var numSpecials = 0;
    for (var i = 0; i < password.length; i++) {
        if (anUpperCase.test(password[i])) {
          numUpper++;
        }
        else if (aNumber.test(password[i])) {
          numNums++;
        }
        else if (aSpecial.test(password[i])) {
          numSpecials++;
        }
    }
    if (numUpper < 1)
    {
        password_up_message.innerHTML = "✗ Upper characters";
        password_up_message.style.color = "red";
    } else 
    {
        password_up_message.innerHTML = "✓ Upper characters";
        password_up_message.style.color = "green";
    }
    if (numNums < 1)
    {
        password_num_message.innerHTML =  "✗ Numbers";
        password_num_message.style.color = "red";
    } else 
    {
        password_num_message.innerHTML = "✓ Numbers";
        password_num_message.style.color = "green";
    }
    if (numSpecials < 1)
    {
        password_spe_message.innerHTML = "✗ Special characters";
        password_spe_message.style.color = "red";
    } else 
    {
        password_spe_message.innerHTML = "✓ Special characters";
        password_spe_message.style.color = "green";
    }
  }

  CheckPasswordsMatch(event) {
    const password_match_message = document.getElementById("password_match_message");
    var password = (document.getElementById("password") as HTMLInputElement).value;
    var passwordConfirmation = (document.getElementById("passwordConfirmation") as HTMLInputElement).value;

    if (password !== passwordConfirmation)
    {
      password_match_message.innerHTML = "✗ Passwords don't match";
      password_match_message.style.color = "red";
    } else 
    {
      password_match_message.innerHTML = "✓ Passwords match";
      password_match_message.style.color = "green";
    }
  }
}
