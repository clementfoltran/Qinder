import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadConversationParameter } from './load-conversation-parameter';
import { LoadConversationReturn } from './load-conversation-return';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadConversationService {

  public serviceURL = Globals.baseURL + 'getMessagesArray/';
  constructor(public http: HttpClient) { }

  getMessagesArray(APIParameter: LoadConversationParameter): Observable<LoadConversationReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<LoadConversationReturn>(this.serviceURL + APIParameter, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}
