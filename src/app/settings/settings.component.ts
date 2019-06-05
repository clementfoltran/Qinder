import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EnterViewSettingsReturn } from './services/enter-view-settings-return';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateNameParameter } from './services/update-name/update-name-parameter';
import { UpdateNameService } from './services/update-name/update-name.service';
import { UpdateNameReturn } from './services/update-name/update-name-return';
import { UpdateEmailParameter } from './services/update-email/update-email-parameter';
import { UpdateEmailReturn } from './services/update-email/update-email-return';
import { UpdateEmailService } from './services/update-email/update-email.service';
import { UpdatePasswordParameter } from './services/update-password/update-password-parameter';
import { UpdatePasswordService } from './services/update-password/update-password.service';
import { UpdatePasswordReturn } from './services/update-password/update-password-return';
import { UpdateNotificationsParameter } from './services/update-notifications/update-notifications-parameter';
import { UpdateNotificationsService } from './services/update-notifications/update-notifications.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

  public resolvedData: EnterViewSettingsReturn;
  public changeNotificationsForm: FormGroup;
  public changeNameForm: FormGroup;
  public changeEmailForm: FormGroup;
  public changePasswordForm: FormGroup;
  public UpdateNotificationsAPIParameter: UpdateNotificationsParameter;
  public UpdateNameAPIParameter: UpdateNameParameter;
  public UpdateEmailAPIParameter: UpdateEmailParameter;
  public UpdatePasswordAPIParameter: UpdatePasswordParameter;

  constructor (public activatedRoute: ActivatedRoute, 
    public updateNameService: UpdateNameService,
    public updateEmailService: UpdateEmailService,
    public updatePasswordService: UpdatePasswordService,
    public updateNotificationsService: UpdateNotificationsService,
    public fb: FormBuilder)
    { 
      this.changeNotificationsForm = fb.group({
        matchSwitch: ['', Validators.required],
        likeSwitch: ['', Validators.required],
        messageSwitch: ['', Validators.required]
      });
      this.changeNameForm = fb.group({
        newFirstName: ['', Validators.required],
        newLastName: ['', Validators.required]
      });
      this.changeEmailForm = fb.group({
        newEmail: ['', Validators.required]
      });
      this.changePasswordForm = fb.group({
        newPassword: ['', Validators.required],
        newPasswordConfirmation: ['', Validators.required]
      });
    }

ngOnInit() {
  this.activatedRoute.data.forEach((data: {viewData: EnterViewSettingsReturn }) => {
    this.resolvedData = data.viewData;
  });
  this.checkAccountConfirmed(this.resolvedData);
  this.checkMatchNotifActivated(this.resolvedData);
  this.checkLikeNotifActivated(this.resolvedData);
  this.checkMessageNotifActivated(this.resolvedData);
}

  updateNotifications() {
    if (this.changeNotificationsForm.valid) {
      this.UpdateNotificationsAPIParameter = {
        notifMatch: this.changeNotificationsForm.get('matchSwitch').value,
        notifLike: this.changeNotificationsForm.get('likeSwitch').value,
        notifMessage: this.changeNotificationsForm.get('messageSwitch').value,
        idUser: this.activatedRoute.params['_value'].id
      };
    }
    
    this.updateNotificationsService.updateNotifications(this.UpdateNotificationsAPIParameter)
        .subscribe((result: UpdateNameReturn) => {
          console.log('success: ', result);
          if (result.success) {
            console.log('Username Notifications');
          } else {
            console.log('Failed to update the notifications');
          }
        });
  }
  updateEmail() {
    if (this.changeEmailForm.valid) {
      this.UpdateEmailAPIParameter = {
        newEmail: this.changeEmailForm.get('newEmail').value,
        idUser: this.activatedRoute.params['_value'].id
      };
    }

      this.updateEmailService.updateEmail(this.UpdateEmailAPIParameter)
      .subscribe((result: UpdateEmailReturn) => {
        if (result.success) {
          console.log('EmailModified');
        } else {
          console.log('Failed to update the email');
        }
      });
  }
  updateName() {
    if (this.changeNameForm.valid) {
      this.UpdateNameAPIParameter = {
        newFirstName: this.changeNameForm.get('newFirstName').value,
        newLastName: this.changeNameForm.get('newLastName').value,
        idUser: this.activatedRoute.params['_value'].id
      };
    }
    this.updateNameService.updateName(this.UpdateNameAPIParameter)
        .subscribe((result: UpdateNameReturn) => {
          if (result.success) {
            console.log('Username Modified');
          } else {
            console.log('Failed to update the name');
          }
        });
  }
  updatePassword() {
    if (this.changePasswordForm.valid) {
      this.UpdatePasswordAPIParameter = {
        newPassword: this.changePasswordForm.get('newPassword').value,
        newPasswordConfirmation: this.changePasswordForm.get('newPasswordConfirmation').value,
        idUser: this.activatedRoute.params['_value'].id
      };
    }
    this.updatePasswordService.updatePassword(this.UpdatePasswordAPIParameter)
        .subscribe((result: UpdatePasswordReturn) => {
          if (result.success) {
            console.log('Password Modified');
          } else {
            console.log('Failed to update the password');
          }
        });
  }

  checkAccountConfirmed(data) {
    if(data.confirm === 1)
      return 1;
  }
  checkMatchNotifActivated(data) {
    if(data.notifMatch === 1) {
      this.changeNotificationsForm.get('matchSwitch').setValue(1);
    } else {
      this.changeNotificationsForm.get('matchSwitch').setValue(0);
    }
  }
  checkLikeNotifActivated(data) {
    if(data.notifLike === 1) {
      this.changeNotificationsForm.get('likeSwitch').setValue(1);
    } else {
      this.changeNotificationsForm.get('likeSwitch').setValue(0);
    }
  }
  checkMessageNotifActivated(data) {
    if(data.notifMessage === 1) {
      this.changeNotificationsForm.get('messageSwitch').setValue(1);
    } else {
      this.changeNotificationsForm.get('messageSwitch').setValue(0);
    }
  }

  CheckFirstName(event) {
    const firstname_message = document.getElementById("firstname_message");
    var newFirstName = (document.getElementById("newFirstName") as HTMLInputElement).value; 

    if (newFirstName.length > 1) {
      firstname_message.innerHTML = "✓ Beautiful name!";
      firstname_message.style.color = "green";
    } else {
      firstname_message.innerHTML = "✗ Too short :(";
      firstname_message.style.color = "red";
    }
  }
  CheckLastName(event) {
    const lastname_message = document.getElementById("lastname_message");
    var newLastName = (document.getElementById("newLastName") as HTMLInputElement).value;

    if (newLastName.length > 1) {
      lastname_message.innerHTML = "✓ Beautiful family name!";
      lastname_message.style.color = "green";
    } else {
      lastname_message.innerHTML = "✗ Too short :(";
      lastname_message.style.color = "red";
    }
  }

  CheckEmail(event) {
    const email_message = document.getElementById("email_message");
    var email = (document.getElementById("newEmail") as HTMLInputElement).value; 

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
    var password = (document.getElementById("newPassword") as HTMLInputElement).value; 
   
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
        for (var i = 0; i < password.length; i++){
            if (anUpperCase.test(password[i]))
                numUpper++;
            else if (aNumber.test(password[i]))
                numNums++;
            else if (aSpecial.test(password[i]))
                numSpecials++;
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
            password_num_message.innerHTML = "✗ Numbers";
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
    var password = (document.getElementById("newPassword") as HTMLInputElement).value;
    var passwordConfirmation = (document.getElementById("newPasswordConfirmation") as HTMLInputElement).value;

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

