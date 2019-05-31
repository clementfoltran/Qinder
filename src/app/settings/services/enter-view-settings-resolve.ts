import { HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EnterViewSettingsReturn} from './enter-view-settings-return';
import { EnterViewSettingsService } from './enter-view-settings.service';
import { Route } from '@angular/compiler/src/core';
import { map } from 'rxjs/operators';

@Injectable()
class EnterViewSettingsResolve implements Resolve<EnterViewSettingsReturn> {

    constructor(private enterViewSettingsService: EnterViewSettingsService, private route: Route) {}
 
    resolve( route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<any>|Promise<any>|any {

            const id = +route.params['id'];

    return this.enterViewSettingsService.enterView(route.params.id).pipe(
        map(response => {
            return response;
        })
    )
  }
}