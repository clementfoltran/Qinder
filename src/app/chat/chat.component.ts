import { Component, OnInit } from '@angular/core';
import { LoadMatchesParameter } from './services/load-matches/load-matches-parameter';
import { LoadMatchesReturn } from './services/load-matches/load-matches-return';
import { LoadMatchesService } from './services/load-matches/load-matches.service';
import { GetUserPhotosReturn, Photo } from '../home/services/get-user-photos/get-user-photos-return';
import { GetUserPhotosService } from '../home/services/get-user-photos/get-user-photos.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public userPhotos: Photo[];
  public userPicture = [];
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
        } else {
          console.log(result.message);
        }
      });
  }

  initMatchPic(matchesList) {
    for (const match of matchesList) {
      if (match) {
        this.getUserPhotosService.getUserPhotos(parseInt(match, 10))
            .subscribe((result: GetUserPhotosReturn) => {
              if (result.success) {
                this.userPhotos = result.photos;
                if (this.userPhotos.length > 0) {
                  this.userPicture.push(this.userPhotos[0].photo);
                }
              } else {
            // todo
              }
            });
      }
    }
  }

  constructor(public loadMatchesService: LoadMatchesService,
              public getUserPhotosService: GetUserPhotosService) { }

  ngOnInit() {
  }

}
