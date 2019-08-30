import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdateEmailParameter } from './services/update-email/update-email-parameter';
import { UpdateEmailReturn } from './services/update-email/update-email-return';
import { UpdateEmailService } from './services/update-email/update-email.service';
import { UpdateNameParameter } from './services/update-name/update-name-parameter';
import { UpdateNameReturn } from './services/update-name/update-name-return';
import { UpdateNameService } from './services/update-name/update-name.service';
import { UpdatePasswordParameter } from './services/update-password/update-password-parameter';
import { UpdatePasswordReturn } from './services/update-password/update-password-return';
import { UpdatePasswordService } from './services/update-password/update-password.service';
import { EnterViewHomeReturn } from '../home/services/enter-view-home/enter-view-home-return';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

  public resolvedData: EnterViewHomeReturn;
  public changeNameForm: FormGroup;
  public changeEmailForm: FormGroup;
  public changePasswordForm: FormGroup;
  public UpdateNameAPIParameter: UpdateNameParameter;
  public UpdateEmailAPIParameter: UpdateEmailParameter;
  public UpdatePasswordAPIParameter: UpdatePasswordParameter;

  constructor(public activatedRoute: ActivatedRoute,
              public updateNameService: UpdateNameService,
              public updateEmailService: UpdateEmailService,
              public updatePasswordService: UpdatePasswordService,
              public messageService: MessageService,
              public fb: FormBuilder) {
    this.changeNameForm = fb.group({
      newFirstName: [],
      newLastName: [],
  });
    this.changeEmailForm = fb.group({
      newEmail: ['', Validators.required]
    });
    this.changePasswordForm = fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.minLength(8)],
      newPasswordConfirmation: ['', Validators.minLength(8)]
    });
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: { viewData: EnterViewHomeReturn }) => {
      this.resolvedData = data.viewData;
    });
    this.checkAccountConfirmed(this.resolvedData);
  }

  updateEmail() {
    if (this.changeEmailForm.valid) {
      this.UpdateEmailAPIParameter = {
        newEmail: this.changeEmailForm.get('newEmail').value,
        idUser: this.resolvedData.id
      };
    }
    this.updateEmailService.updateEmail(this.UpdateEmailAPIParameter).subscribe();
  }
  updateName() {
    if (this.changeNameForm.valid) {
      this.UpdateNameAPIParameter = {
        newFirstName: this.changeNameForm.get('newFirstName').value,
        newLastName: this.changeNameForm.get('newLastName').value,
        idUser: this.resolvedData.id
      };
    }
    this.updateNameService.updateName(this.UpdateNameAPIParameter).subscribe();
  }
  updatePassword() {
    if (this.changePasswordForm.valid) {
      this.UpdatePasswordAPIParameter = {
        currentPassword: this.changePasswordForm.get('currentPassword').value,
        newPassword: this.changePasswordForm.get('newPassword').value,
        newPasswordConfirmation: this.changePasswordForm.get('newPasswordConfirmation').value,
        idUser: this.resolvedData.id
      };
      if (this.changePasswordForm.get('newPassword').value === this.changePasswordForm.get('newPasswordConfirmation').value) {
        this.updatePasswordService.updatePassword(this.UpdatePasswordAPIParameter)
          .subscribe((result: UpdatePasswordReturn) => {
            if (result.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Security',
                detail: result.message,
                life: 6000
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Security',
                detail: result.message,
                life: 6000
              });
            }
          });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Security',
          detail: 'Passwords don\'t match',
          life: 6000
        });
      }
    }
  }

  checkAccountConfirmed(data) {
    if (data.confirm === 1) {
      return 1;
    }
  }
}
