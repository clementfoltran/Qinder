import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Notification } from './get-notifications/get-notifications.return';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notifications = this.socket.fromEvent<Notification[]>('notifications');
  currentNotification = this.socket.fromEvent<Notification>('notifications');

  constructor(private socket: Socket) { }

  newNotification(id_user_: number, id_user: number, notif: number) {
    this.socket.emit('addNotification', { id_user_, id_user, notif });
  }

  getNotifications(id: number) {
    this.socket.emit('getNotifications', id);
  }
}
