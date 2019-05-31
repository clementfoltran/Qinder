import {CanActivate, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {LoginService} from '../landing-page/services/login/login.service';
import {Injectable} from '@angular/core';

@Injectable()
export class IsLoggedOutGuard implements CanActivate {
  constructor(public router: Router,
              public loginService: LoginService,
              public messageService: MessageService) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/home']);
      this.messageService.add({
        severity: 'warn',
        summary: 'Landing-page',
        detail: 'You need to been logged out to access to this page',
        life: 6000
      });
      return false;
    } else {
      return true;
    }
  }
}
