import { Component, OnInit } from '@angular/core';
import { EnterViewSettingsReturn } from './services/enter-view-settings-return';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public resolveData: EnterViewSettingsReturn;

  constructor(public activatedRoute: ActivatedRoute) { }

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

  ngOnInit() {
    this.activatedRoute.data.forEach((data: {viewData: EnterViewSettingsReturn } ) => {
      this.resolveData = data.viewData;
    });
  }
}
