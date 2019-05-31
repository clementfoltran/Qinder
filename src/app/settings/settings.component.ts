import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
}
