import { Component, OnInit } from '@angular/core';
import { LoadMatchesParameter } from './services/load-matches/load-matches-parameter';
import { LoadMatchesReturn } from './services/load-matches/load-matches-return';
import { LoadMatchesService } from './services/load-matches/load-matches.service';
import { GetUserPhotosReturn, Photo } from '../home/services/get-user-photos/get-user-photos-return';
import { GetUserPhotosService } from '../home/services/get-user-photos/get-user-photos.service';
import * as io from 'socket.io-client';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SaveMessageService } from './services/save-message/save-message.service';
import { SaveMessageParameter } from './services/save-message/save-message-parameter';
import { SaveMessageReturn } from './services/save-message/save-message-return';
import { GetMatchIdService } from './services/get-match-id/get-match-id.service';
import { GetMatchIdParameter } from './services/get-match-id/get-match-id-parameter';
import { GetMatchIdReturn } from './services/get-match-id/get-match-id-return';
import { LoadConversationService } from './services/load-conversation/load-conversation.service';
import { LoadConversationParameter } from './services/load-conversation/load-conversation-parameter';
import { LoadConversationReturn } from './services/load-conversation/load-conversation-return';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public loadMatchesService: LoadMatchesService,
              public getUserPhotosService: GetUserPhotosService,
              public saveMessageService: SaveMessageService,
              public getMatchIdService: GetMatchIdService,
              public getMessagesArrayService: LoadConversationService,
              public fb: FormBuilder) {
                this.messageForm = fb.group({
                  message: ['', Validators.required]
                });
              }

  public userPhotos: Photo[];
  public matchesObjects = [];
  public APIParameterLoadMatches: LoadMatchesParameter;
  public APIParameterGetMatchId: GetMatchIdParameter;
  public APIParameterSaveMessage: SaveMessageParameter;
  public APIParameterLoadConversation: LoadConversationParameter;
  public matchesList = [];
  public matchId: number;
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

  openConversation(id) {
    this.APIParameterGetMatchId = {
      userId: +localStorage.getItem('userId'),
      userId_: parseInt(id, 10)
    };
    // console.log(this.APIParameterGetMatchId);
    this.getMatchIdService.getMatchId(this.APIParameterGetMatchId)
      .subscribe((result: GetMatchIdReturn) => {
        if (result.success) {
          this.matchId = result.matchId;
          console.log(result.message);
        } else {
          console.log(result.message);
        }
      });
    this.loadMessages(this.matchId);
  }

  loadMessages(matchId) {
    this.APIParameterLoadConversation = {
      id: matchId
    };
    this.getMessagesArrayService.getMessagesArray(this.APIParameterLoadConversation)
      .subscribe((result: LoadConversationReturn) => {
        if (result.success) {
          console.log(result.messageArray);
        } else {
          console.log(result.message);
        }
      });
    // if (this.messageList) {
    //   this.messageList = [];
    // }
    // const obj = {};
    // const me = Object.create(obj);
    // const id2 = localStorage.getItem('userId');
    // me.id = id2;
    // me.msg = 'Help me';
    // this.messageList.push(me);
  }

  initMatchPic(matchesList) {
    if (this.matchesObjects.length === 0) {
      for (const match of matchesList) {
        if (match) {
          this.getUserPhotosService.getUserPhotos(parseInt(match, 10))
            .subscribe((result: GetUserPhotosReturn) => {
              if (result.success) {
                this.userPhotos = result.photos;
                if (this.userPhotos.length > 0) {
                  const obj = {};
                  const me = Object.create(obj);
                  me.id = match;
                  me.picture = this.userPhotos[0].photo;
                  this.matchesObjects.push(me);
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
    const ts = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.APIParameterSaveMessage = {
      idMessage: 1,
      idUser,
      message,
      ts,
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
