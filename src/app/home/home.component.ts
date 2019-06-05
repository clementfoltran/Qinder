import { Component, OnInit } from '@angular/core';
import {LoginService} from '../landing-page/services/login/login.service';
import {EnterViewHomeReturn} from './services/enter-view-home/enter-view-home-return';
import {EnterViewHomeService} from './services/enter-view-home/enter-view-home.service';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UpdatePreferencesParameter} from './services/update-preferences/update-preferences-parameter';
import {UpdatePreferencesService} from './services/update-preferences/update-preferences.service';
import {UpdatePreferencesReturn} from './services/update-preferences/update-preferences-return';
import {GetUserPhotosReturn, Photo} from './services/get-user-photos/get-user-photos-return';
import {GetUserPhotosService} from './services/get-user-photos/get-user-photos.service';
import {UploadPhotoService} from './services/upload-photo/upload-photo.service';
import {UploadPhotoParameter} from './services/upload-photo/upload-photo-parameter';
import {UploadPhotoReturn} from './services/upload-photo/upload-photo-return';

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
  /**
   * UserPhotos tab
   *
   */
  public userPhotos: Photo[];
  /**
   * Selected photo to upload
   *
   */
  public selectedFile: string;
  /**
   * Expected data for upload photo
   *
   */
  public APIParameterPhoto: UploadPhotoParameter;
  public firstname: string;

  logOut() {
    this.loginService.logOut();
  }

  resolvePhotosModal() {
    this.getUserPhotosService.getUserPhotos(1)
      .subscribe((result: GetUserPhotosReturn) => {
        if (result.success) {
          this.userPhotos = result.photos;
          console.log(this.userPhotos);
          console.log(this.userPhotos.length);
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

  updatePref() {
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

  uploadPhoto() {
    this.APIParameterPhoto = {
      id: 1,
      photo: this.selectedFile,
      active: false,
      ts: Date.now(),
    };
    this.uploadPhotoService.uploadPhoto(this.APIParameterPhoto)
      .subscribe((result: UploadPhotoReturn) => {
        if (result.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Update',
            detail: result.message,
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

  onFileChanged(e) {
    const self = this;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      self.selectedFile = reader.result.toString().split(',')[1];
    };
  }

  constructor(public enterViewHomeService: EnterViewHomeService,
              public messageService: MessageService,
              public getUserPhotosService: GetUserPhotosService,
              public uploadPhotoService: UploadPhotoService,
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
