import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnterViewActivateReturn } from './services/enter-view-activate-return';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  public resolvedData: EnterViewActivateReturn;

  constructor(public activatedRoute: ActivatedRoute) { }

ngOnInit() {
    this.activatedRoute.data.forEach((data: {viewData: EnterViewActivateReturn }) => {
      this.resolvedData = data.viewData;
    });
    this.checkAccount(this.resolvedData);
  }

checkAccount(data) {
  const email = this.activatedRoute.snapshot.paramMap.get('email');
  const key = this.activatedRoute.snapshot.paramMap.get('key');

  console.log(data.message);
  console.log(data.key);

  // if (data.email === email && data.key === key && data.confirm === 0) {
  //   console.log('account not confirmed yet');
  // } else {
  //   console.log('account already confirmed');
  // }

}

verifyAccount() {
    // verifiy account (1) to db
  }

}
