import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SocketNotificationsService } from './notifications/services/socket-notifications/socket-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public socketNotificationService: SocketNotificationsService) { }

  ngOnInit() {
    this.socketNotificationService.getNotifications();
  }
}
