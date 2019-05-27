import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayGrowlService {
  public GrowlEmitter = new Subject<GrowlParameter>();

  displayGrowl(growl: GrowlParameter): void {
    this.GrowlEmitter.next(growl);
  }
}

export interface GrowlParameter {
  severity: string;
  summary: string;
  detail: string;
  time: number;
}
