import { Component, OnInit } from '@angular/core';
import { LoadMatchesParameter } from './services/load-matches/load-matches-parameter';
import { LoadMatchesReturn } from './services/load-matches/load-matches-return';
import { LoadMatchesService } from './services/load-matches/load-matches.service';
import { GetUserPhotosReturn, Photo } from '../home/services/get-user-photos/get-user-photos-return';
import { EnterViewHomeReturn } from '../home/services/enter-view-home/enter-view-home-return';
import { GetUserPhotosService } from '../home/services/get-user-photos/get-user-photos.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public userPhotos: Photo[];
  public userPicture: string;
  public APIParameterLoadMatches: LoadMatchesParameter;
  public matchesList = [];

  loadMatches() {
    this.APIParameterLoadMatches = {
      id: +localStorage.getItem('userId')
    };
    this.loadMatchesService.loadMatches(this.APIParameterLoadMatches)
      .subscribe((result: LoadMatchesReturn) => {
        if (result.success) {
          this.matchesList = result.matches_list.split(',');
          this.initMatchPic(this.matchesList);
          console.log(this.matchesList);
        } else {
          console.log(result.message);
        }
      });
  }

  initMatchPic(list) {
    this.getUserPhotosService.getUserPhotos(list)
      .subscribe((result: GetUserPhotosReturn) => {
        if (result.success) {
          this.userPhotos = result.photos;
          if (this.userPhotos.length > 0) {
            localStorage.setItem('user-img', this.userPhotos[0].photo);
            this.userPicture = this.userPhotos[0].photo;
          }
        } else {
       // todo
        }
      });
  }

  constructor(public loadMatchesService: LoadMatchesService,
              public getUserPhotosService: GetUserPhotosService) { }

  ngOnInit() {
  }

}
