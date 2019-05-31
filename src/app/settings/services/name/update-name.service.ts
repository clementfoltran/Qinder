import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../../globals';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UpdateNameParameter } from './update-name-parameter';
import { UpdateNameReturn } from './update-name-return';

@Injectable({
  providedIn: 'root'
})
export class UpdateNameService {

  public serviceURL = Globals.baseURL + 'settings';
  constructor(private http: HttpClient) { }

  updateName(data) {

  }
}
