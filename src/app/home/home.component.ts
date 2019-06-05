import { Component, OnInit } from '@angular/core';
import {EnterViewHomeReturn} from './services/enter-view-home/enter-view-home-return';
import {EnterViewHomeService} from './services/enter-view-home/enter-view-home.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   *  Resolve data for the view
   *
   */
  public resolveData: EnterViewHomeReturn;
  /**
   * Distance preference
   *
   */
  public distance: number;
  /**
   * Expected data for the servers
   *
   */
  public firstname: string;


  constructor(public enterViewHomeService: EnterViewHomeService,
              public messageService: MessageService) {
  }

  ngOnInit() {
    this.enterViewHomeService.enterView(1)
      .subscribe((result: EnterViewHomeReturn) => {
        if (result.success) {
          this.resolveData = result;
          this.firstname = this.resolveData.firstname;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Network',
            detail: 'Check your connection',
            life: 6000
          });
        }
      });
  }
}
