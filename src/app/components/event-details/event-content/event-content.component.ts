import { Component, Input, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {
  BreakSize,
  ScreenSizeService,
} from 'src/app/services/screen-size.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-event-content',
  templateUrl: './event-content.component.html',
  styleUrls: ['./event-content.component.css'],
})
export class EventContentComponent implements OnInit {
  @Input() event: any = null;
  screenObserver$?: Subscription;

  tabItems: any[] = [
    {
      name: 'Popular',
      class: 'tab',
      active: true,
    },
    {
      name: '2nd',
      class: 'tab',
      active: false,
    },
    {
      name: '3rd',
      class: 'tab',
      active: false,
    },

    {
      name: '4th',
      class: 'tab',
      active: false,
    },
    {
      name: '5th',
      class: 'tab',
      active: false,
    },
    {
      name: '6th',
      class: 'tab',
      active: false,
    },
    {
      name: '7th',
      class: 'tab',
      active: false,
    },
  ];
  copyOfTabs = [...this.tabItems];

  topMarket: any = null;
  eventIsLive = false;

  fontAwesomeIcons = {
    lock: faLock,
  };

  constructor(
    private dataService: DataService,
    public sharedService: SharedFunctionsService,
    private screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.topMarket = this.event.markets[0];
    this.eventIsLive = this.event.isLive;
    this.screenObserver$ = this.screenSizeService.currentScreenSize.subscribe(
      this.setTabs.bind(this)
    );
  }
  ngOnDestroy() {
    this.screenObserver$?.unsubscribe();
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

  setMarketAsTop(market: any) {
    this.topMarket = market;
  }

  refreshEvent() {
    if (this.eventIsLive) {
      // we don't request ignore listen as true --> because when the loading start the onDestroy of details comp will cut the listen to event
      this.dataService.loadMarketsForGameLive(this.event.event.eventId);
    } else {
      this.dataService.loadMarketsForGamePre(this.event.event.eventId);
    }
  }

  setTabs(size: BreakSize): void {
    if (size === BreakSize.XS) {
      console.log(size);
      this.numOfTabsToDisplay(1);
    }
    if (size === BreakSize.SM) {
      console.log(size);
      this.numOfTabsToDisplay(2);
    }
    if (size === BreakSize.MD) {
      console.log(size);
      this.numOfTabsToDisplay(2);
    }
    if (size === BreakSize.LG) {
      console.log(size);
      this.numOfTabsToDisplay(4);
    }
    if (size === BreakSize.XL) {
      console.log(size);
      this.numOfTabsToDisplay(5);
    }
  }

  numOfTabsToDisplay(num: any) {
    let copy = [...this.tabItems];
    let moreObj: any = {
      name: 'More',
      class: 'tab-dropdown',
      active: false,
      children: [],
    };
    if (copy.length > num) {
      for (let item of copy) {
        if (copy.indexOf(item) > num) {
          moreObj.children.push(item);
        }
      }
      copy.splice(num + 1, copy.length - num);
      copy.push(moreObj);
      this.copyOfTabs = [];
      this.copyOfTabs = [...copy];
    }
  }
}
