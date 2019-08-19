import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { NotificationParmeter } from './notification.parameter';
import { MessageService } from 'primeng/api';
import { AddNotificationService } from '../add-notification/add-notification.service';
import { AddNotificationParameter } from '../add-notification/add-notification.parameter';
import { AddNotificationReturn } from '../add-notification/add-notification.return';
import { GetNotificationsService } from '../get-notifications/get-notifications.service';
import { GetNotificationsReturn } from '../get-notifications/get-notifications.return';
import { HomeComponent } from 'src/app/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class SocketNotificationsService {
  public nbNotif: number;
  public notifications = [];
  public messagesNotif = [];
  public socket;

  constructor(public messageService: MessageService,
              public getNotificationService: GetNotificationsService,
              public addNotificationService: AddNotificationService) { }

  /**
   * RECEIVE NOTIFICATIONS
   * 
   * @param obj.notif
   * 1: View profile notification
   */
  receive = (obj) => {
    if (obj && obj.to === +localStorage.getItem('userId')) {
      this.notifications.push(obj);
      if (obj.notif === 1) {
        this.messageService.add({
          severity: 'info', summary: 'New notification', detail: 'Somebody saw your profile', life: 6000,
        });
      }
      if (obj.notif === 2) {
        this.messageService.add({
          severity: 'warn',summary: 'New notification', detail: 'someone deleted you', life: 6000
        });
      }
      if (obj.notif === 3) {
        this.messageService.add({
          severity: 'warn', summary: 'New notification', detail: 'someone reported you', life: 6000
        });
      }
      if (obj.notif === 4) {
        this.messageService.add({
          severity: 'info', summary: 'New notification', detail: 'Someone like you', life: 6000
        });
      }
      if (obj.notif === 5) {
        this.messageService.add({
          severity: 'info', summary: 'New notification', detail: 'You\'ve got a match', life: 6000
        });
      }
      if (obj.notif === 6) {
        this.messageService.add({
          severity: 'info', summary: 'New message', detail: 'You\'ve got a message' , life: 6000
        });
      }
      this.nbNotif++;
      const APIParameter: AddNotificationParameter = {
        id_user: obj.to,
        id_user_: obj.from,
        notif: obj.notif,
      };
      this.addNotificationService.addNotification(APIParameter)
        .subscribe((result: AddNotificationReturn) => {
          if (result.success) {
            // cool
          }
        });
    }
  }

  // TODO id to send the good notification
  notify(id_user: number, id_user_: number, notif: number) {
    const notification: NotificationParmeter = {
      to: id_user_,
      from: id_user,
      notif,
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


  async getNotifications() {
    this.getNotificationService.getNotifications(+localStorage.getItem('userId'))
      .subscribe((result: GetNotificationsReturn) => {
        if (result.success) {
          this.notifications = result.notifications;
          this.nbNotif = result.notifications.length;
        }
      });
  }
}
