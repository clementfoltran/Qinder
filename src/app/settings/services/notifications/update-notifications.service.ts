import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../../globals';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UpdateNotificationsParameter } from './update-notifications-parameter';
import { UpdateNotificationsReturn } from './update-notifications-return';

@Injectable({
  providedIn: 'root'
})
export class UpdateNotificationsService {

  public serviceURL = Globals.baseURL + 'settings';
  constructor(private http: HttpClient) { }

  updateNotifications(data) {

  }
}