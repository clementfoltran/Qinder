import {Component, OnInit, ViewChild} from '@angular/core';
import {EnterViewHomeReturn} from './services/enter-view-home/enter-view-home-return';
import {ActivatedRoute} from '@angular/router';
import {GetUserPhotosReturn, Photo} from './services/get-user-photos/get-user-photos-return';
import {GetUserPhotosService} from './services/get-user-photos/get-user-photos.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(HomeComponent) homeComponent: HomeComponent;
  /**
   *  Resolve data for the view
   *
   */
  public resolveData: EnterViewHomeReturn;
  /**
   * Distance preference
   *
   */
  public distance: number;
  /**
   * UserPhotos tab
   *
   */
  public userPhotos: Photo[];
  /**
   * User profile picture
   *
   */
  public userPicture: string;
  /**
   * User first name
   *
   */
  public firstName: string;


  constructor(public activatedRoute: ActivatedRoute,
              public getUserPhotosService: GetUserPhotosService,
              public messageService: MessageService) {
  }

  initUserPic() {
    this.getUserPhotosService.getUserPhotos(this.resolveData.id)
      .subscribe((result: GetUserPhotosReturn) => {
        if (result.success) {
          this.userPhotos = result.photos;
          if (this.userPhotos.length > 0) {
            localStorage.setItem('user-img', this.userPhotos[0].photo);
            this.userPicture = this.userPhotos[0].photo;
          }
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

  ngOnInit() {
    this.activatedRoute.data.forEach((data: { viewData: EnterViewHomeReturn}) => {
      this.resolveData = data.viewData;
    });
    this.initUserPic();
    this.firstName = this.resolveData.firstname;
  }
}
