import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnterViewSettingsReturn} from './enter-view-settings-return';
import { EnterViewSettingsService } from './enter-view-settings.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EnterViewSettingsResolve implements Resolve<EnterViewSettingsReturn> {

    constructor(public enterViewSettingsService: EnterViewSettingsService) {}
 
    resolve(route: ActivatedRouteSnapshot) {

        const id = +route.params['id'];

    return this.enterViewSettingsService.enterView(id).pipe(
        map(response => {
            return response;
        })
    )
  }
}