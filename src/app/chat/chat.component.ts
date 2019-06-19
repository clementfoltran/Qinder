import { Component, OnInit } from '@angular/core';
import { LoadMatchesParameter } from './services/load-matches/load-matches-parameter';
import { LoadMatchesReturn } from './services/load-matches/load-matches-return';
import { LoadMatchesService } from './services/load-matches/load-matches.service';
import { GetUserPhotosReturn, Photo } from '../home/services/get-user-photos/get-user-photos-return';
import { GetUserPhotosService } from '../home/services/get-user-photos/get-user-photos.service';
import * as io from 'socket.io-client'; // And then connect using
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public loadMatchesService: LoadMatchesService,
              public getUserPhotosService: GetUserPhotosService,
              public fb: FormBuilder) {
                this.messageForm = fb.group({
                  message: ['', Validators.required]
                });
              }

  public userPhotos: Photo[];
  public userPicture = [];
  public APIParameterLoadMatches: LoadMatchesParameter;
  public matchesList = [];
  public messageForm: FormGroup;
  public socket;
  public messageList = [];

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
    if (this.userPicture.length === 0) {
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
                  console.log(result.message);
              }
            });
        }
      }
    }
  }

  sendMessage() {
    if (this.messageForm.valid) {
      this.socket.emit('chat message', this.messageForm.get('message').value);
      this.messageForm.reset();
    }
  }

  receive = (msg) => {
    if (msg && msg.length > 0) {
      const obj = {};
      const id = localStorage.getItem('userId');
      obj[id] = msg;
      this.messageList.push(obj);

      console.log(this.messageList[0]);
      console.log(Object.keys(this.messageList[0]));
      console.log(Object.values(this.messageList[0]));
    }
  }

  ngOnInit() {
    // move to loading function
    try {
      this.socket = io.connect('http://localhost:3000');
      this.socket.on('chat message', this.receive);
    } catch (e) {
        console.log('Could not connect socket.io');
    }
  }

}
