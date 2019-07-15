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
import {MessageService} from 'primeng/api';
import {UploadPhotoService} from '../home/services/upload-photo/upload-photo.service';
import {DeletePhotoService} from '../home/services/delete-photo/delete-photo.service';
import {UpdatePreferencesService} from '../home/services/update-preferences/update-preferences.service';
import {LoginService} from '../landing-page/services/login/login.service';
import {GetTagsService} from './services/get-tags/get-tags.service';
import {GetTagsReturn, Tag} from './services/get-tags/get-tags-return';
import {AddUserTagService} from './services/add-user-tag/add-user-tag.service';
import {AddUserTagReturn} from './services/add-user-tag/add-user-tag-return';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { GetUserTagsService } from './services/get-user-tags/get-user-tags.service';
import { GetUserTagsReturn, UserTag } from './services/get-user-tags/get-user-tags.return';
import { RemoveUserTagService } from './services/remove-user-tag/remove-user-tag.service';
import { RemoveUserTagReturn } from './services/remove-user-tag/remove-user-tag.return';
import * as $ from 'jquery';

declare var $: any;

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
  public userTags: UserTag[] = [];
  /**
   * User id
   *
   */
  public userId: number = null;

  isSelectedTag(idTag: number) {
    let find = false;
    for (let i = 0; i < this.userTags.length; i++) {
      if (this.userTags[i].id_tag === idTag) {
        find = true;
      }
    }
    return (find) ? true : false;
  }

  addUserTag(tag: Tag) {
    this.addUserTagService.addUserTag({id_tag: tag.id_tag, id_user: this.userId})
      .subscribe((result: AddUserTagReturn) => {
        if (result.success) {
          this.userTags.push({
            id_utag: result.id_utag,
            id_tag: tag.id_tag,
            id_user: this.userId,
            label: tag.label,
            tag: tag.tag
          });
        }
      });
  }

  removeUserTag(idTag: number) {
    this.removeUserTagService.removeUserTag(this.getUserTagId(idTag))
      .subscribe((result: RemoveUserTagReturn) => {
        if (result.success) {
          this.userTags.splice(this.getUserTagIndex(idTag), 1);
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
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    this.loginService.logOut();
  }

  updatePref() {
    if (this.prefForm.valid) {
      this.APIParameterPref = {
        id: this.userId,
        bio: this.prefForm.get('bio').value,
        gender: this.prefForm.get('gender').value,
        interest: this.prefForm.get('interest').value,
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
      id: this.userId,
      photo: this.selectedFile,
      active: false,
    };
    if (this.selectedFile) {
      this.uploadPhotoService.uploadPhoto(this.APIParameterPhoto)
        .subscribe((result: UploadPhotoReturn) => {
          if (result.success) {
            this.userPhotos.push({
              id_photo: result.id,
              id_user: this.userId,
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
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Upload picture',
        detail: 'You cannot import empty pictures',
        life: 6000,
      });
    }
  }

  onFileChanged(e) {
    const self = this;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      self.selectedFile = reader.result.toString();
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

  getUserTags() {
    this.getUserTagsService.getUserTags(this.userId)
      .subscribe((result: GetUserTagsReturn) => {
        if (result.success) {
          this.userTags = result.userTags;
        }
      });
  }

  getUserTagId(idTag: number): number {
    for (let i = 0; i < this.userTags.length; i++) {
      if (this.userTags[i].id_tag === idTag) {
        return (this.userTags[i].id_utag)
      }
    }
  }

  getUserTagIndex(idTag: number): number {
    for (let i = 0; i < this.userTags.length; i++) {
      if (this.userTags[i].id_tag === idTag) {
        return (i);
      }
    }
  }

  navigateToSettings() {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    this.router.navigate(['/settings/' + this.userId ] );
  }

  constructor(public router: Router,
              public messageService: MessageService,
              public activatedRoute: ActivatedRoute,
              public uploadPhotoService: UploadPhotoService,
              public deletePhotoService: DeletePhotoService,
              public addUserTagService: AddUserTagService,
              public getTagsService: GetTagsService,
              public removeUserTagService: RemoveUserTagService,
              public getUserTagsService: GetUserTagsService,
              public updatePreferencesService: UpdatePreferencesService,
              public fb: FormBuilder,
              public loginService: LoginService) {

    this.prefForm = fb.group({
      bio: [''],
      gender: ['', Validators.required],
      interest: ['', Validators.required],
    });
  }

  initVariables() {
    this.ageRange[0] = this.resolveData.minage;
    this.ageRange[1] = this.resolveData.maxage;
    this.distance = this.resolveData.distance;
    this.userId = this.resolveData.id;
    if (this.resolveData.bio) {
      this.prefForm.get('bio').setValue(this.resolveData.bio);
    }
    this.prefForm.get('gender').setValue(this.resolveData.gender);
    this.prefForm.get('interest').setValue(this.resolveData.interest);
  }

  ngOnInit() {
    this.displayTags();
    this.activatedRoute.data.forEach((data: { viewData: EnterViewHomeReturn}) => {
      this.resolveData = data.viewData;
    });
    this.initVariables();
    this.getUserTags();
  }
}
