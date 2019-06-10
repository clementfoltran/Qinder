import { Component, OnInit } from '@angular/core';
import {EnterViewHomeReturn} from './services/enter-view-home/enter-view-home-return';
import {ActivatedRoute} from '@angular/router';

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


  constructor(public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: { viewData: EnterViewHomeReturn}) => {
      this.resolveData = data.viewData;
    });
    console.log(this.resolveData);
  }
}
