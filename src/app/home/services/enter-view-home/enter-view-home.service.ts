import { Injectable } from '@angular/core';
import {Globals} from '../../../globals';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnterViewHomeReturn} from './enter-view-home-return';
import {EnterViewHomeParameter} from './enter-view-home-parameter';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnterViewHomeService {

  public serviceURL = Globals.baseURL + 'home';
  constructor(public http: HttpClient) { }

  enterView(APIParameter: EnterViewHomeParameter): Observable<EnterViewHomeReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<EnterViewHomeReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}
