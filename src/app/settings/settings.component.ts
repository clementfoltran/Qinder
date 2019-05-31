import { Component, OnInit } from '@angular/core';
import { EnterViewSettingsReturn } from './services/enter-view-settings-return';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public resolvedData: EnterViewSettingsReturn;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('HELLO');
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
  updateName(formData) {
    console.log('success: ', formData);
  }
  updatePassword(formData) {
    console.log('success: ', formData);
  }

  checkAccountConfirmed(data) {
    if(data.confirm === 1)
      return 1;
  }
  checkMatchNotifActivated(data) {
    if(data.notifMatch === 1)
      return 1;
  }
  checkLikeNotifActivated(data) {
    if(data.notifLike === 1)
      return 1;
  }
  checkMessageNotifActivated(data) {
    if(data.notifMessage === 1)
      return 1;
  }
}
