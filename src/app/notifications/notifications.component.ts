import { Component, OnInit, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { GetNotificationsService } from './services/get-notifications/get-notifications.service';
import { EnterViewHomeReturn } from '../home/services/enter-view-home/enter-view-home-return';
import { GetNotificationsReturn, Notification } from './services/get-notifications/get-notifications.return';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  /**
   *  Resolve data for the view
   *
   */
  @Input() resolveData: EnterViewHomeReturn = null;
  /**
   *  The userId
   *
   */
  public userId: number;
  /**
   * 
   * Socket for notifications
   */
  public socket;
  /**
   * 
   * Notification list
   */
  public notificationList: Notification[];
  receive = (obj) => {
    if (obj) {
      this.notificationList.push(obj);
    }
  }

  getNotifications() {
    this.getNotificationService.getNotifications(this.userId)
      .subscribe((result: GetNotificationsReturn) => {
        if (result.success) {
          this.notificationList = result.notifications;
          console.log(this.notificationList);
        }
      });
  }

  constructor(public getNotificationService: GetNotificationsService,
    ) { }

  ngOnInit() {
    this.userId = this.resolveData.id;
    try {
      this.socket = io.connect('http://localhost:3001');
      this.socket.on('chat message', this.receive);
    } catch (e) {
        console.log('Could not connect socket.io');
    }
    this.getNotifications();
  }
  
}
