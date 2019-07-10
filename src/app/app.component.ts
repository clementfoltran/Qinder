import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Notification } from './notifications/services/get-notifications/get-notifications.return';
import { Observable, Subscription } from 'rxjs';
import { NotificationsService } from './notifications/services/notifications.service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  notifications: Observable<Notification[]>;
  currentNot: Notification;
  private _notSub: Subscription;
  
  constructor(public messageService: MessageService,
              public notificationsService: NotificationsService) { }

  ngOnInit() {
    this.notificationsService.newNotification(1, 2, 3);
    
    this.notificationsService.getNotifications(parseInt(localStorage.getItem('userId')));
  }
}