import { Component, OnInit } from '@angular/core';
import {LoginService} from '../landing-page/services/login/login.service';
import {EnterViewHomeReturn} from './services/enter-view-home/enter-view-home-return';
import {EnterViewHomeService} from './services/enter-view-home/enter-view-home.service';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UpdatePreferencesParameter} from './services/update-preferences/update-preferences-parameter';
import {UpdatePreferencesService} from './services/update-preferences/update-preferences.service';
import {UpdatePreferencesReturn} from './services/update-preferences/update-preferences-return';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   *  Resolve data for the view
   *
   */
  public resolveData: EnterViewHomeReturn;
  /**
   * Update form preferences
   *
   */
  public prefForm: FormGroup;
  /**
   * Age preference range
   *
   */
  public ageRange: number[] = [18, 55];
  /**
   * Distance preference
   *
   */
  public distance: number;
  /**
   * Expected data for the servers
   *
   */
  public APIParameterPref: UpdatePreferencesParameter;
  public firstname: string;

  logOut() {
    this.loginService.logOut();
  }

  updatePref() {
    console.log(this.prefForm.valid);
    if (this.prefForm.valid) {
      this.APIParameterPref = {
        id: 1,
        bio: this.prefForm.get('bio').value,
        gender: this.prefForm.get('gender').value,
        distance: this.distance,
        minage: this.ageRange[0],
        maxage: this.ageRange[1]
      };
      this.updatePreferencesService.updatePreferences(this.APIParameterPref)
        .subscribe((result: UpdatePreferencesReturn) => {
          if (result.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Update',
              detail: 'Preference updated successfully',
              life: 6000,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Network',
              detail: 'Check your connection',
              life: 6000,
            });
          }
        });
    }
  }

  constructor(public enterViewHomeService: EnterViewHomeService,
              public messageService: MessageService,
              public updatePreferencesService: UpdatePreferencesService,
              public fb: FormBuilder,
              public loginService: LoginService) {
    this.prefForm = fb.group({
      bio: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.enterViewHomeService.enterView(1)
      .subscribe((result: EnterViewHomeReturn) => {
        if (result.success) {
          this.resolveData = result;
          this.ageRange[0] = this.resolveData.minage;
          this.ageRange[1] = this.resolveData.maxage;
          this.distance = this.resolveData.distance;
          this.firstname = this.resolveData.firstname;
          if (this.resolveData.bio) {
            this.prefForm.get('bio').setValue(this.resolveData.bio);
          }
          this.prefForm.get('gender').setValue('Both');
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Network',
            detail: 'Check your connection',
            life: 6000
          });
        }
      });
  }
}
