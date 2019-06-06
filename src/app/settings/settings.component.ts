import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EnterViewSettingsReturn } from './services/enter-view-settings-return';
import { UpdateEmailParameter } from './services/update-email/update-email-parameter';
import { UpdateEmailReturn } from './services/update-email/update-email-return';
import { UpdateEmailService } from './services/update-email/update-email.service';
import { UpdateNameParameter } from './services/update-name/update-name-parameter';
import { UpdateNameReturn } from './services/update-name/update-name-return';
import { UpdateNameService } from './services/update-name/update-name.service';
import { UpdateNotificationsParameter } from './services/update-notifications/update-notifications-parameter';
import { UpdateNotificationsService } from './services/update-notifications/update-notifications.service';
import { UpdatePasswordParameter } from './services/update-password/update-password-parameter';
import { UpdatePasswordReturn } from './services/update-password/update-password-return';
import { UpdatePasswordService } from './services/update-password/update-password.service';

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
  newFirstNameYeah: any;

  constructor(public activatedRoute: ActivatedRoute,
              public updateNameService: UpdateNameService,
              public updateEmailService: UpdateEmailService,
              public updatePasswordService: UpdatePasswordService,
              public updateNotificationsService: UpdateNotificationsService,
              public fb: FormBuilder) {
    this.changeNotificationsForm = fb.group({
      matchSwitch: ['', Validators.required],
      likeSwitch: ['', Validators.required],
      messageSwitch: ['', Validators.required]
    });
    this.changeNameForm = fb.group({
      newFirstName: ['', Validators.required],
      newLastName: ['', Validators.required],
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
        idUser: this.resolvedData.idUser
      };
    }
    this.updateNotificationsService.updateNotifications(this.UpdateNotificationsAPIParameter)
        .subscribe((result: UpdateNameReturn) => {
          console.log('result: ', result);
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
        idUser: this.resolvedData.idUser
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
        idUser: this.resolvedData.idUser
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
        idUser: this.resolvedData.idUser
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
    if (data.confirm === 1) {
      return 1;
    }
  }
  checkMatchNotifActivated(data) {
    if (data.notifMatch === 1) {
      this.changeNotificationsForm.get('matchSwitch').setValue(1);
    } else {
      this.changeNotificationsForm.get('matchSwitch').setValue(0);
    }
  }
  checkLikeNotifActivated(data) {
    if (data.notifLike === 1) {
      this.changeNotificationsForm.get('likeSwitch').setValue(1);
    } else {
      this.changeNotificationsForm.get('likeSwitch').setValue(0);
    }
  }
  checkMessageNotifActivated(data) {
    if (data.notifMessage === 1) {
      this.changeNotificationsForm.get('messageSwitch').setValue(1);
    } else {
      this.changeNotificationsForm.get('messageSwitch').setValue(0);
    }
  }
}

