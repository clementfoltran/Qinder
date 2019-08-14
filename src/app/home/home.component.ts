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
import { GetUserTagsReturn, UserTag } from '../preferences/services/get-user-tags/get-user-tags.return';
import { GetUserTagsService } from '../preferences/services/get-user-tags/get-user-tags.service';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import * as $ from 'jquery';
import { GetUserOnlineService } from './services/get-user-online/get-user-online.service';
import { GetUserOnlineParameter } from './services/get-user-online/get-user-online-parameter';
import { GetUserOnlineReturn } from './services/get-user-online/get-user-online-return';
import { SaveUserLastConnectionParameter } from './services/save-last-connection/save-last-connection-parameter';
import { SaveUserLastConnectionService } from './services/save-last-connection/save-last-connection.service';
import { SaveUserLastConnectionReturn } from './services/save-last-connection/save-last-connection-return';
import { LastConnectedTimeFormatPipe } from '../pipes/last-connection.pipe';
import anime from 'animejs/lib/anime.es.js';
import { GetTheHeavensParameter } from './services/get-the-heavens/get-the-heavens-parameter';
import { GetTheHeavensService } from './services/get-the-heavens/get-the-heavens.service';
import { GetTheHeavensReturn } from './services/get-the-heavens/get-the-heavens-return';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ LastConnectedTimeFormatPipe ]
})
export class HomeComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute,
              public getUserPhotosService: GetUserPhotosService,
              public getUserToSwipeService: GetUserToSwipeService,
              public getUserTagsService: GetUserTagsService,
              public swipeService: SwipeService,
              public messageService: MessageService,
              public getUserOnlineService: GetUserOnlineService,
              public saveUserLastConnectionService: SaveUserLastConnectionService,
              public getTheHeavensService: GetTheHeavensService,
              private lastConnection: LastConnectedTimeFormatPipe) {
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

  public peopleInHeavens: any;
  public progressBarValue = 100;

  public APIParameterGetUserOnline: GetUserOnlineParameter;
  public APIParameterSaveUserLastConnection: SaveUserLastConnectionParameter;

  async getUserPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.userCurrentPosition = new google.maps.LatLng(latitude, longitude);
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Localisation',
        detail: 'Geolocation error',
        life: 6000
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
        this.fillUserToSwipePhotos(result.photos);
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
  fillUserToSwipePhotos(photo) {
    this.userToSwipePhotos = photo;
  }

  getUserToSwipeTags(id: number) {
    this.getUserTagsService.getUserTags(id)
      .subscribe((result: GetUserTagsReturn) => {
        if (result.success) {
          this.userToSwipeTags = result.userTags;
        }
      });
  }

  async getUserToSwipe() {
    this.userToSwipe = false;
    const APIParameter: GetUserToSwipeParameter = {
      id: this.resolveData.id,
      interest: this.resolveData.interest,
      gender: this.resolveData.gender,
      minage: this.resolveData.minage,
      maxage: this.resolveData.maxage,
      distance: this.resolveData.distance
    };
    await this.getUserToSwipeService.getUserToSwipe(APIParameter)
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
        this.userToSwipeDistance = Math.floor(Math.round(+google.maps.geometry.spherical.computeDistanceBetween(
          this.userCurrentPosition,
          userToSwipePos
        )) / 1000);
        if (this.userToSwipeDistance > this.distance) {
          this.userToSwipe = false;
          this.swipe(false);
          setTimeout(() => {
            console.log('get user to swipe');
            this.getUserToSwipe();
          }, 3000);
        }
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
        if (result.success) {
          this.getUserToSwipe();
          if (result.match) {
            $('.match').show();
            setTimeout(() => {
                $('.match').hide();
            }, 3000);
          }
        }
      });
    if (like === true) {
      this.progressToTheHeavens();
    }
  }

  async getTheHeavens() {
    const APIParameter: GetTheHeavensParameter = {
      id: this.resolveData.id,
      interest: this.resolveData.interest,
      gender: this.resolveData.gender,
      minage: this.resolveData.minage,
      maxage: this.resolveData.maxage,
      distance: this.resolveData.distance
    };
    await this.getTheHeavensService.getTheHeavens(APIParameter)
    .subscribe((result: GetTheHeavensReturn) => {
      if (result.success) {
        this.peopleInHeavens = result.people_list;
        this.displayTheHeavens();
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

displayTheHeavens() {
  setTimeout(function() {
    anime({
      targets: '.heaven',
      opacity: 1,
      duration: 30000
    });
  }, 3000);
}

progressToTheHeavens() {
  this.progressBarValue = this.progressBarValue + 12;
}

showMeTheHeavens() {
  anime({
    targets: '.swipe-zone',
    opacity: 0,
    duration: 10000
  });
  this.getTheHeavens();
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

getUserOnline(online) {
    this.APIParameterGetUserOnline = {
      userId: +localStorage.getItem('userId'),
      online
    };
    this.getUserOnlineService.getUserOnline(this.APIParameterGetUserOnline)
      .subscribe((result: GetUserOnlineReturn) => {
        if (result.success) {
          console.log(result.message);
        } else {
          console.log(result.message);
        }
      });
  }
saveUserLastConnection(date) {
    this.APIParameterSaveUserLastConnection = {
      userId: +localStorage.getItem('userId'),
      date
    };
    this.saveUserLastConnectionService.saveUserLastConnection(this.APIParameterSaveUserLastConnection)
      .subscribe((result: SaveUserLastConnectionReturn) => {
        if (result.success) {
          console.log(result.message);
        } else {
          console.log(result.message);
        }
      });
  }

ngOnInit() {
    this.activatedRoute.data.forEach((data: { viewData: EnterViewHomeReturn}) => {
      this.resolveData = data.viewData;
    });
    this.initUserPic();
    this.firstName = this.resolveData.firstname;
    this.distance = this.resolveData.distance;
    this.getUserPosition();
    this.getUserToSwipe();
    this.getUserOnline(1);

    // when the user leaves
    window.addEventListener('unload', (event) => {
      const date = new Date();
      this.getUserOnline(0);
      this.saveUserLastConnection(date);
    });
  }
}
