import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../../globals';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UpdateNotificationsParameter } from './update-notifications-parameter';
import { UpdateNotificationsReturn } from './update-notifications-return';

@Injectable({
  providedIn: 'root'
})
export class UpdateNotificationsService {
  public serviceURL = Globals.baseURL + 'updateNotifications';
  constructor(private http: HttpClient) { }

  updateNotifications(APIParameter: UpdateNotificationsParameter): Observable<UpdateNotificationsReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<UpdateNotificationsReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      map(res => res),
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}