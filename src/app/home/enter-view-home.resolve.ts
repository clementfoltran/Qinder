import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {EnterViewHomeReturn} from './services/enter-view-home/enter-view-home-return';
import {EnterViewHomeService} from './services/enter-view-home/enter-view-home.service';

@Injectable()
export class EnterViewHomeResolve implements Resolve<EnterViewHomeReturn> {

  constructor(public enterViewHomeService: EnterViewHomeService,
              public router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {

    const id = +route.params['id'];

    return this.enterViewHomeService.enterView({id});
  }
}
