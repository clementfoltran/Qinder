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
import {GetTagsService} from './services/get-tags/get-tags.service';
import {GetTagsReturn, Tag} from './services/get-tags/get-tags-return';
import {AddUserTagService} from './services/add-user-tag/add-user-tag.service';
import {AddUserTagReturn} from './services/add-user-tag/add-user-tag-return';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import { GetUserTagsService } from './services/get-user-tags/get-user-tags.service';
import { GetUserTagsReturn, UserTag } from './services/get-user-tags/get-user-tags.return';
import { RemoveUserTagService } from './services/remove-user-tag/remove-user-tag.service';
import { RemoveUserTagReturn } from './services/remove-user-tag/remove-user-tag.return';
import { nextTick } from 'q';

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
  public unselectedTags: Tag[] = [];

  // addUserTag(idTag: number) {
  //   this.addUserTagService.addUserTag({id_tag: idTag, id_user: 1})
  //     .subscribe((result: AddUserTagReturn) => {
  //       if (!result.success) {
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Network',
  //           detail: 'Check your connection',
  //           life: 6000
  //         });
  //       }
  //     });
  // }

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

  // TODO check the empty images
  uploadPhoto() {
    this.APIParameterPhoto = {
      id: this.userId,
      photo: this.selectedFile,
      active: false,
    };
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

  getUserTags() {
    this.getUserTagsService.getUserTags(this.userId)
      .subscribe((result: GetUserTagsReturn) => {
        if (result.success) {
          this.userTags = result.userTags;
          this.updateUnselectedTags();
        }
      });
  }

  updateUnselectedTags() {
    let j = 0;
    for (let i = 0; i < this.tags.length; i++) {
      j = 0 ;
      while(j < this.userTags.length) {
        if (this.tags[i].id_tag === this.userTags[j].id_tag) {
          i++;                
        } 
        j++;
      }
      this.unselectedTags.push(this.tags[i]);
    }
    console.log(this.unselectedTags);
  }

  removeUserTag(idUtag: number, index: number) {
    this.removeUserTagService.removeUserTag(idUtag)
      .subscribe((result: RemoveUserTagReturn) => {
        if (result.success) {
          this.userTags.splice(index, 1);
          this.updateUnselectedTags();
        }
      });
  }

  constructor(public messageService: MessageService,
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
