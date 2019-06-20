import { Component, OnInit } from '@angular/core';
import { LoadMatchesParameter } from './services/load-matches/load-matches-parameter';
import { LoadMatchesReturn } from './services/load-matches/load-matches-return';
import { LoadMatchesService } from './services/load-matches/load-matches.service';
import { GetUserPhotosReturn, Photo } from '../home/services/get-user-photos/get-user-photos-return';
import { GetUserPhotosService } from '../home/services/get-user-photos/get-user-photos.service';
import * as io from 'socket.io-client'; // And then connect using
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SaveMessageService } from './services/save-message/save-message.service';
import { SaveMessageParameter } from './services/save-message/save-message-parameter';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { SaveMessageReturn } from './services/save-message/save-message-return';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public loadMatchesService: LoadMatchesService,
              public getUserPhotosService: GetUserPhotosService,
              public saveMessageService: SaveMessageService,
              public fb: FormBuilder) {
                this.messageForm = fb.group({
                  message: ['', Validators.required]
                });
              }

  public userPhotos: Photo[];
  public userPicture = [];
  public APIParameterLoadMatches: LoadMatchesParameter;
  public APIParameterSaveMessage: SaveMessageParameter;
  public matchesList = [];
  public messageForm: FormGroup;
  public socket;
  public messageList = [];
  public id = localStorage.getItem('userId');

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
      const msg = this.messageForm.get('message').value;
      if (msg && msg.length > 0) {
        const obj = {};
        const me = Object.create(obj);
        const id = localStorage.getItem('userId');
        me.id = id;
        me.msg = msg;
        this.socket.emit('chat message', me);
        this.messageForm.reset();
        this.saveMessage(id, msg);
      }
    }
  }

  saveMessage(idUser, message) {
    this.APIParameterSaveMessage = {
      idMessage: 1,
      idUser,
      message,
      idMatch: 1
    };
    this.saveMessageService.saveMessage(this.APIParameterSaveMessage)
      .subscribe((result: SaveMessageReturn) => {
        if (result.success) {
          console.log(result.message);
        } else {
          console.log(result.message);
        }
      });
  }

  receive = (obj) => {
    if (obj) {
      this.messageList.push(obj);
    }
  }

  ngOnInit() {
    try {
      this.socket = io.connect('http://localhost:3000');
      this.socket.on('chat message', this.receive);
    } catch (e) {
        console.log('Could not connect socket.io');
    }
  }

}
