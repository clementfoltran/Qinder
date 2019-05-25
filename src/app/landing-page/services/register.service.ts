import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterParameter} from './register.parameter';
import {Observable} from 'rxjs';
import {RegisterReturn} from './register.return';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  // TODO Make const for serviceURL
  public serviceURL = 'http://localhost:8000';
  constructor(public http: HttpClient) { }

  register(APIParameter: RegisterParameter): Observable<RegisterReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-type': 'applications/json'
      }),
    };

    return this.http.post<RegisterReturn>(this.serviceURL + '/register', JSON.stringify(APIParameter), option).pipe(
      // TODO Put the error handle
    );
  }
}
