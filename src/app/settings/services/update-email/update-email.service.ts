import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../../globals';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UpdateEmailParameter } from './update-email-parameter';
import { UpdateEmailReturn } from './update-email-return';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmailService {
  // public serviceURL = Globals.baseURL + 'settings';
  // constructor(private http: HttpClient) { }

  updateEmail(data) {

  }
}
