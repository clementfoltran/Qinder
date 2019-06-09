import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnterViewSettingsReturn } from '../settings/services/enter-view-settings-return';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  public resolvedData: EnterViewSettingsReturn;

  constructor(public activatedRoute: ActivatedRoute) { }

ngOnInit() {
    this.activatedRoute.data.forEach((data: {viewData: EnterViewSettingsReturn }) => {
      this.resolvedData = data.viewData;
    });
    this.checkAccount(this.resolvedData);
  }

checkAccount(data) {
  const email = this.activatedRoute.snapshot.paramMap.get('email');
  const key = this.activatedRoute.snapshot.paramMap.get('key');
  console.log(data.email);
    // check the url param key to email account
  }

verifyAccount() {
    // verifiy account (1) to db
  }

}
