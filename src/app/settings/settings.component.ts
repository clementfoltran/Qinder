import { Component, OnInit } from '@angular/core';
import { EnterViewSettingsReturn } from './services/enter-view-settings-return';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateNameParameter } from './services/update-name/update-name-parameter';
import { UpdateNameService } from './services/update-name/update-name.service';
import { UpdateNameReturn } from './services/update-name/update-name-return';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public resolvedData: EnterViewSettingsReturn;
  public changeNameForm: FormGroup;
  public UpdateNameAPIParameter: UpdateNameParameter;

  constructor(public activatedRoute: ActivatedRoute,
              public updateNameService: UpdateNameService,
              public fb: FormBuilder) {
                this.changeNameForm = fb.group({
                  newFirstName: ['', Validators.required],
                  newLastName: ['', Validators.required]
                });
              }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: {viewData: EnterViewSettingsReturn }) => {
      this.resolvedData = data.viewData;
    });
    this.checkAccountConfirmed(this.resolvedData);
  }

  updateNotifications(formData) {
    console.log('success: ', formData);
  }
  updateEmail(formData) {
    console.log('success: ', formData);
  }

  updateName() {
    if (this.changeNameForm.valid) {
      this.UpdateNameAPIParameter = {
        newFirstName: this.changeNameForm.get('newFirstName').value,
        newLastName: this.changeNameForm.get('newLastName').value,
        idUser: 2, // fix id
      };
    }
    this.updateNameService.updateName(this.UpdateNameAPIParameter)
        .subscribe((result: UpdateNameReturn) => {
          if (result.success) {
            console.log('okay');
          } else {
            console.log('not okay');
          }
          });
  }

  updatePassword(formData) {
    console.log('success: ', formData);
  }

  checkAccountConfirmed(data) {
    if (data.confirm === 1) {
      return 1;
    }
  }
  checkMatchNotifActivated(data) {
    if (data.notifMatch === 1) {
      return 1;
    }
  }
  checkLikeNotifActivated(data) {
    if (data.notifLike === 1) {
      return 1;
    }
  }
  checkMessageNotifActivated(data) {
    if (data.notifMessage === 1) {
      return 1;
    }
  }
}
