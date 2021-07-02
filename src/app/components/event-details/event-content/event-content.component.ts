import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-event-content',
  templateUrl: './event-content.component.html',
  styleUrls: ['./event-content.component.css'],
})
export class EventContentComponent implements OnInit {
  @Input() event:any= null;

  tabItems: any[] = [
    {
      name: 'Popular',
      class: 'tab',
      active: true,
    },
    {
      name: 'Popular',
      class: 'tab',
      active: false,
    },
    {
      name: 'Popular',
      class: 'tab',
      active: false,
    },
    {
      name: 'More',
      class: 'tab-dropdown',
      active: false,
      children: [
        {
          name: 'Popular',
          active: false,
        },
        {
          name: 'Popular',
          active: false,
        },
        {
          name: 'Popular',
          active: false,
        },
      ],
    },
  ];

  topMarket:any = null;
  eventIsLive = false;

  constructor(private dataService:DataService) {}

  ngOnInit(): void {
    this.topMarket = this.event.markets[0];
    this.eventIsLive = this.event.isLive;
  }

  handleTabClick(tab: any) {
    if (tab.children) {
      // this.setAllTabsToFalse(this.tabItems);
      tab.active = !tab.active;
    }
    if (!tab.active && !tab.children) {
      this.setAllTabsToFalse(this.tabItems);
      tab.active = true;
    }
  }

  handleChildClick(tab: any) {
    tab.active = false;
  }

  setAllTabsToFalse(arr: any[]) {
    for (let tab of arr) {
      if (tab.active) {
        tab.active = false;
      }
    }
  }

  setMarketAsTop(market:any){
    this.topMarket = market;
  }

  refreshEvent(){
    if(this.eventIsLive){
      // we don't request ignore listen as true --> because when the loading start the onDestroy of details comp will cut the listen to event
      this.dataService.loadMarketsForGameLive(this.event.event.eventId);
    }else{
      this.dataService.loadMarketsForGamePre(this.event.event.eventId);
    }
  }

}
