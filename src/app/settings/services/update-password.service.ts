import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../../globals';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UpdatePasswordParameter} from './update-password-parameter';
import {UpdatePasswordReturn} from './update-password-return';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {
  public serviceURL = Globals.baseURL + 'settings';
  constructor(private http: HttpClient) { }

  updatePassword(data) {
    
  }
}
