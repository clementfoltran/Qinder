import {Component, OnInit, ViewChild} from '@angular/core';
import {EnterViewHomeReturn} from './services/enter-view-home/enter-view-home-return';
import {ActivatedRoute} from '@angular/router';
import {GetUserPhotosReturn, Photo} from './services/get-user-photos/get-user-photos-return';
import {GetUserPhotosService} from './services/get-user-photos/get-user-photos.service';
import {MessageService} from 'primeng/api';
import { GetUserToSwipeService } from './services/get-user-to-swipe/get-user-to-swipe.service';
import { GetUserToSwipeParameter } from './services/get-user-to-swipe/get-user-to-swipe-parameter';
import { GetUserToSwipeReturn } from './services/get-user-to-swipe/get-user-to-swipe-return';
import { ChatComponent } from '../chat/chat.component';
import { SwipeParameter } from './services/swipe/swipe-parameter';
import { SwipeService } from './services/swipe/swipe.service';
import { SwipeReturn } from './services/swipe/swipe-return';
import {} from 'googlemaps';
import { NotificationsService } from '../notifications/services/notifications.service';
import { GetUserTagsReturn, UserTag } from '../preferences/services/get-user-tags/get-user-tags.return';
import { GetUserTagsService } from '../preferences/services/get-user-tags/get-user-tags.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute,
              public getUserPhotosService: GetUserPhotosService,
              public getUserToSwipeService: GetUserToSwipeService,
              public getUserTagsService: GetUserTagsService,
              public notificationsService: NotificationsService,
              public swipeService: SwipeService,
              public messageService: MessageService) {
}
  @ViewChild(HomeComponent, {static: false}) homeComponent: HomeComponent;
  @ViewChild(ChatComponent, {static: false}) chatComponent: ChatComponent;
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
  /**
   * User to swipe name
   *
   */
  public userToSwipeName: string;
  /**
   * User to swipe biographie
   *
   */
  public userToSwipeBio: string;
  /**
   * User to swipe photos
   *
   */
  public userToSwipePhotos: Photo[];
  /**
   * User to swipe id
   *
   */
  public userToSwipeId: number;
  /**
   * User to swipe age
   *
   */
  public userToSwipeAge: number;
  /**
   * The user to swipe distance from the log user
   */
  public userToSwipeDistance: any;
  /**
   * The user current postion
   */
  public userCurrentPosition: any;
  /**
   * 
   * Notification list
   */
  public notificationList: Notification[];
  /**
   * 
   * User to swipe tags
   */
  public userToSwipeTags: UserTag[] = [];
  public userToSwipe: boolean;

  getUserPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.userCurrentPosition = new google.maps.LatLng(latitude, longitude);
      });
    }
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

  getUserPhotos(userId: number) {
    this.getUserPhotosService.getUserPhotos(userId)
    .subscribe((result: GetUserPhotosReturn) => {
      if (result.success) {
        this.userToSwipePhotos = result.photos;
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

  getUserToSwipeTags(id: number) {
    this.getUserTagsService.getUserTags(id)
      .subscribe((result: GetUserTagsReturn) => {
        if (result.success) {
          this.userToSwipeTags = result.userTags;
          console.log(this.userToSwipeTags);
        }
      });
  }

  getUserToSwipe() {
    this.userToSwipe = false;
    const APIParameter: GetUserToSwipeParameter = {
      id: this.resolveData.id,
      interest: this.resolveData.interest,
      gender: this.resolveData.gender,
      minage: this.resolveData.minage,
      maxage: this.resolveData.maxage,
      distance: this.resolveData.distance
    };
    this.getUserToSwipeService.getUserToSwipe(APIParameter)
    .subscribe((result: GetUserToSwipeReturn) => {
      if (result.success) {
        this.userToSwipe = true;
        this.getUserPhotos(result.id);
        this.userToSwipeName = result.firstname;
        this.userToSwipeBio = result.bio;
        this.userToSwipeId = result.id;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        this.userToSwipeAge = currentYear - +result.year;
        const userToSwipePos = new google.maps.LatLng(result.position.latitude, result.position.longitude);
        this.userToSwipeDistance = Math.round(+google.maps.geometry.spherical.computeDistanceBetween(
          this.userCurrentPosition,
          userToSwipePos
        )) / 1000;
        this.getUserToSwipeTags(result.id);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Network',
          detail: result.message,
          life: 6000
        });
      }
    });
  }

  swipe(like: boolean) {
    const APIParameter: SwipeParameter = {
      id_user: this.resolveData.id,
      id_user_: this.userToSwipeId,
      like,
    };
    this.swipeService.swipe(APIParameter)
      .subscribe((result: SwipeReturn) => {
        console.log(result);
        if (result.success) {
          this.getUserToSwipe();
        }
      });
  }

  showChat($event: any) {
    const slider = document.querySelector('.slider1');

    if (slider.classList.contains('opened')) {
      slider.classList.remove('opened');
      slider.classList.add('closed');
      // load data
      this.chatComponent.loadMatches();
    } else {
        slider.classList.remove('closed');
        slider.classList.add('opened');
    }
  }

  showNotifs() {
    const slider = document.querySelector('.slider3');
    if (slider.classList.contains('opened')) {
      slider.classList.remove('opened');
      slider.classList.add('closed');
    } else {
        slider.classList.remove('closed');
        slider.classList.add('opened');
    }
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: { viewData: EnterViewHomeReturn}) => {
      this.resolveData = data.viewData;
    });
    this.getUserPosition();
    this.initUserPic();
    this.firstName = this.resolveData.firstname;
    this.getUserToSwipe();
  }
}