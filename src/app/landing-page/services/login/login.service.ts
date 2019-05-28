import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Globals} from '../../../globals';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LoginParameter} from './login.parameter';
import {LoginReturn} from './login.return';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public serviceURL = Globals.baseURL + 'login';
  constructor(public http: HttpClient) {}

  auth(APIParameter: LoginParameter): Observable<LoginReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<LoginReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
  }
}
