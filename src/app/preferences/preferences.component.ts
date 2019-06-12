import {Component, Input, OnInit} from '@angular/core';
import {EnterViewHomeReturn} from '../home/services/enter-view-home/enter-view-home-return';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UpdatePreferencesParameter} from '../home/services/update-preferences/update-preferences-parameter';
import {GetUserPhotosReturn, Photo} from '../home/services/get-user-photos/get-user-photos-return';
import {UploadPhotoParameter} from '../home/services/upload-photo/upload-photo-parameter';
import {DeletePhotoParameter} from '../home/services/delete-photo/delete-photo-parameter';
import {UpdatePreferencesReturn} from '../home/services/update-preferences/update-preferences-return';
import {UploadPhotoReturn} from '../home/services/upload-photo/upload-photo-return';
import {DeletePhotoReturn} from '../home/services/delete-photo/delete-photo-return';
import {EnterViewHomeService} from '../home/services/enter-view-home/enter-view-home.service';
import {MessageService} from 'primeng/api';
import {GetUserPhotosService} from '../home/services/get-user-photos/get-user-photos.service';
import {UploadPhotoService} from '../home/services/upload-photo/upload-photo.service';
import {DeletePhotoService} from '../home/services/delete-photo/delete-photo.service';
import {UpdatePreferencesService} from '../home/services/update-preferences/update-preferences.service';
import {LoginService} from '../landing-page/services/login/login.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GetTagsService} from './services/get-tags/get-tags.service';
import {GetTagsReturn, Tag} from './services/get-tags/get-tags-return';
import {AddUserTagService} from './services/add-user-tag/add-user-tag.service';
import {AddUserTagReturn} from './services/add-user-tag/add-user-tag-return';
import {ActivatedRoute, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  /**
   *  Resolve data for the view
   *
   */
  @Input() resolveData: EnterViewHomeReturn = null;
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
  @Input() userPhotos: Photo[] = null;
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
  /**
   * Delete photo expected data
   *
   */
  public APIParameterDelPhoto: DeletePhotoParameter;
  /**
   * All tags
   *
   */
  public tags: Tag[] = [];
  /**
   * User selected tags
   *
   */
  public userTags: Tag[] = [];
  /**
   * User id
   *
   */
  // public userTags: Tag[] = [];

  drop(event: CdkDragDrop<Tag[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  addUserTag(idTag: number) {
    this.addUserTagService.addUserTag({id_tag: idTag, id_user: 1})
      .subscribe((result: AddUserTagReturn) => {
        if (!result.success) {
          this.messageService.add({
            severity: 'error',
            summary: 'Network',
            detail: 'Check your connection',
            life: 6000
          });
        }
      });
  }

  displayTags() {
    this.getTagsService.getTags()
      .subscribe((result: GetTagsReturn) => {
        if (result.success) {
          this.tags = result.tags;
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

  logOut() {
    this.loginService.logOut();
  }

  updatePref() {
    if (this.prefForm.valid) {
      this.APIParameterPref = {
        // PUSH UTILE
        id: this.userId,
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

  // TODO check the empty images
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
          this.userPhotos.push({
            id_photo: result.id,
            // TODO id n'importe quoi
            id_user: 1,
            photo: this.selectedFile,
            active: false,
            ts: 10,
          });
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

  deletePhoto(idPhoto, idUser, index) {
    this.APIParameterDelPhoto = {
      id_photo: idPhoto,
      id_user: idUser
    };
    this.deletePhotoService.deletePhoto(this.APIParameterDelPhoto)
      .subscribe((result: DeletePhotoReturn) => {
        if (result.success) {
          this.userPhotos.splice(index, 1);
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

  constructor(public messageService: MessageService,
              public activatedRoute: ActivatedRoute,
              public uploadPhotoService: UploadPhotoService,
              public deletePhotoService: DeletePhotoService,
              public addUserTagService: AddUserTagService,
              public getTagsService: GetTagsService,
              public updatePreferencesService: UpdatePreferencesService,
              public fb: FormBuilder,
              public loginService: LoginService) {

    this.prefForm = fb.group({
      bio: [''],
      gender: ['', Validators.required],
    });
  }

  initVariables() {
    this.ageRange[0] = this.resolveData.minage;
    this.ageRange[1] = this.resolveData.maxage;
    this.distance = this.resolveData.distance;
    if (this.resolveData.bio) {
      this.prefForm.get('bio').setValue(this.resolveData.bio);
    }
    this.prefForm.get('gender').setValue('Both');
  }

  ngOnInit() {
    this.displayTags();
    this.activatedRoute.data.forEach((data: { viewData: EnterViewHomeReturn}) => {
      this.resolveData = data.viewData;
    });
    this.initVariables();
  }
}
