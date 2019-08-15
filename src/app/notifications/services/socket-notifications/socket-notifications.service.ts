import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { NotificationParmeter } from './notification.parameter';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SocketNotificationsService {
  public notifications = [];
  public socket;

  constructor(public messageService: MessageService) { }

  receive = (obj) => {
    if (obj) {
      this.notifications.push(obj);
      console.log('somebody have seen yout profile');
    }
  }

  // TODO id to send the good notification
  notify(id_user, id_user_) {
    const notification: NotificationParmeter = {
      to: id_user_,
      from: id_user,
      notif: 'coucou',
      ts: 1
    };
    this.socket.emit('notification', notification);
  }

  connect() {
    try {
      this.socket = io.connect('http://localhost:5000');
      this.socket.on('receive notifications', this.receive);
      console.log('soket listening on port 5000');
    } catch (e) {
        console.log('Could not connect socket.io');
    }
  }

}
