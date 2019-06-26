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
import { LoadConversationService } from './services/load-conversation/load-conversation.service';
import { LoadConversationParameter } from './services/load-conversation/load-conversation-parameter';
import { LoadConversationReturn } from './services/load-conversation/load-conversation-return';
import { Settings } from 'http2';
import { EnterViewHomeService } from '../home/services/enter-view-home/enter-view-home.service';
import { EnterViewHomeParameter } from '../home/services/enter-view-home/enter-view-home-parameter';
import { EnterViewHomeReturn } from '../home/services/enter-view-home/enter-view-home-return';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public loadMatchesService: LoadMatchesService,
              public getUserPhotosService: GetUserPhotosService,
              public saveMessageService: SaveMessageService,
              public getMessagesArrayService: LoadConversationService,
              public getUserMatchedInfos: EnterViewHomeService,
              public fb: FormBuilder) {
                this.messageForm = fb.group({
                  message: ['', Validators.required]
                });
              }

  public userPhotos: Photo[];
  public matchesObjects = [];
  public APIParameterLoadMatches: LoadMatchesParameter;
  public APIParameterSaveMessage: SaveMessageParameter;
  public APIParameterLoadConversation: LoadConversationParameter;
  public APIEnterViewHomeParameter: EnterViewHomeParameter;
  public matchId: number;
  public messageForm: FormGroup;
  public socket;
  public messageList = [];
  public id: number;
  public currentOpenedConversationMatchId: number;
  public userMatchedPicture: string;
  public userMatchedName: string;

  // LOAD MATCHES DATA
  // ----------------------------------------------------------------------------------------
  loadMatches() {
    this.APIParameterLoadMatches = {
      id: +localStorage.getItem('userId')
    };
    this.loadMatchesService.loadMatches(this.APIParameterLoadMatches)
      .subscribe((result: LoadMatchesReturn) => {
        if (result.success) {
          this.initMatchPic(result.matches_list);
        } else {
          console.log(result.message);
        }
      });
  }
  initMatchPic(matchesList) {
    if (this.matchesObjects.length === 0) {
      for (const match of matchesList) {
        if (match) {
          this.getUserPhotosService.getUserPhotos(parseInt(match.id_user_matched, 10))
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

  // LOAD USER_MATCHED INFOS
  // ----------------------------------------------------------------------------------------
  loadMatchInfos(userMatchedId) {
    this.userMatchedPicture = this.userPhotos[0].photo;

    this.APIEnterViewHomeParameter = {
      id: userMatchedId
    };
    this.getUserMatchedInfos.enterView(this.APIEnterViewHomeParameter)
            .subscribe((result: EnterViewHomeReturn) => {
              if (result.success) {
                this.userMatchedName = result.firstname;
              } else {
                  console.log(result.message);
              }
            });
  }

  // LOAD MESSAGES
  // ----------------------------------------------------------------------------------------
  loadMessages(matchId) {
    this.APIParameterLoadConversation = {
      id: matchId
    };
    this.currentOpenedConversationMatchId = matchId;
    this.getMessagesArrayService.loadConversation(this.APIParameterLoadConversation)
      .subscribe((result: LoadConversationReturn) => {
        if (result.success) {
          this.fillMessagesArray(result.messageArray);
          console.log(result.messageArray);
        } else {
          console.log(result.message);
        }
      });
  }
  fillMessagesArray(messageArray) {
    if (this.messageList) {
      this.messageList = [];
    }
    for (const mess of messageArray) {
      if (mess) {
        const obj = {};
        const me = Object.create(obj);
        me.id = mess.id_user;
        me.msg = mess.message;
        me.ts = mess.ts.slice(0, 19).replace('T', ' ');
        this.messageList.push(me);
      }
    }
  }

  // SEND AND SAVE MESSAGES
  // ----------------------------------------------------------------------------------------
  sendMessage() {
    if (this.messageForm.valid) {
      const ts = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const msg = this.messageForm.get('message').value;
      if (msg && msg.length > 0) {
        const obj = {};
        const me = Object.create(obj);
        me.id = this.id;
        me.msg = msg;
        me.ts = ts;
        this.socket.emit('chat message', me);
        this.messageForm.reset();
        this.saveMessage(this.id, msg, ts);
      }
    }
  }
  saveMessage(idUser, message, ts) {
    this.APIParameterSaveMessage = {
      idMessage: 1,
      idUser,
      message,
      ts,
      idMatch: this.currentOpenedConversationMatchId
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
    this.id = parseInt(localStorage.getItem('userId'), 10);
    try {
      this.socket = io.connect('http://localhost:3000');
      this.socket.on('chat message', this.receive);
    } catch (e) {
        console.log('Could not connect socket.io');
    }
  }

}
