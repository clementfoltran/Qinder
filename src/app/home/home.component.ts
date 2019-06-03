import { Component, OnInit } from '@angular/core';
import {LoginService} from '../landing-page/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public ageRange: number[] = [18, 55];
  public distance = 10;
  public display = 'block';

  logOut() {
    this.loginService.logOut();
  }

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.ageRange[0] = 18;
    this.ageRange[1] = 55;
  }

}
