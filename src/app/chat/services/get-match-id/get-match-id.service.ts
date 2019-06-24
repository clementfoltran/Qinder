import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { GetMatchIdParameter } from './get-match-id-parameter';
import { GetMatchIdReturn } from './get-match-id-return';

@Injectable({
  providedIn: 'root'
})
export class GetMatchIdService {

  public serviceURL = Globals.baseURL + 'getMatchId/';
  constructor(public http: HttpClient) { }

  getMatchId(APIParameter: GetMatchIdParameter): Observable<GetMatchIdReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<GetMatchIdReturn>(this.serviceURL, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}
