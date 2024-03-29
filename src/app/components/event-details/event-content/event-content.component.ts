import { flatten } from '@angular/compiler';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BetSlipService } from 'src/app/services/bet-slip.service';
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
  subscription?: Subscription;

  tabItems: any[] = [
    {
      name: 'Popular',
      class: 'tab',
      active: true,
    },
    {
      name: 'Over/Under',
      class: 'tab',
      active: false,
    },
    {
      name: 'Goals',
      class: 'tab',
      active: false,
    },
    {
      name: 'Half Time',
      class: 'tab',
      active: false,
    },
    {
      name: 'Handicap',
      class: 'tab',
      active: false,
    },
    {
      name: 'Others',
      class: 'tab',
      active: false,
    },
    // {
    //   name: '6th',
    //   class: 'tab',
    //   active: false,
    // },
    // {
    //   name: '7th',
    //   class: 'tab',
    //   active: false,
    // },
  ];
  copyOfTabs = [...this.tabItems];
  selectedTab = this.copyOfTabs[0].name;
  copyOfMarkets: any = [];

  topMarket: any = null;
  eventIsLive = false;

  fontAwesomeIcons = {
    lock: faLock,
  };

  constructor(
    private dataService: DataService,
    public sharedService: SharedFunctionsService,
    private screenSizeService: ScreenSizeService,
    public betSlipService: BetSlipService,
    private ref: ChangeDetectorRef
  ) {
    this.screenObserver$ = this.screenSizeService.currentScreenSize.subscribe(
      this.setTabs.bind(this)
    );

    this.subscription = this.dataService.selectedEventDetails.subscribe(
      (resp) => {
        // this.game = resp;
        this.getMarketsToDisplay();
      }
    );
  }

  ngOnInit(): void {

    //comment function call below to always show all markets categories (tabs)
    this.setTabsToShow();
    this.setTopMarket();

    this.eventIsLive = this.event.isLive;
    this.getMarketsToDisplay();
  }

  ngOnDestroy() {
    this.screenObserver$?.unsubscribe();
    this.subscription?.unsubscribe();
  }


  setTopMarket(refresh= false){

    if (this.event.markets.length > 0) {

        if(refresh){
          if(this.topMarket && this.event.markets.some((x:any)=> x.id == this.topMarket.id)){
            this.topMarket = this.event.markets[this.event.markets.findIndex((x:any)=> x.id == this.topMarket.id)]
          }
          else{
            this.topMarket = this.event.markets[0];
          }
        }

        else
        {
          if(this.event.markets.some((x:any)=> this.sharedService.mainMarkets.some(y=> y == x.name))){
            this.topMarket = this.event.markets[this.event.markets.findIndex((x:any)=>this.sharedService.mainMarkets.some(y=> y == x.name))]
          }
          else{
            this.topMarket = this.event.markets[0];
          }
        }

        this.betSlipService.loadTopMarketBets(this.topMarket.id);
    }
     else {
      this.topMarket = {};
      this.betSlipService.betsForMarket = [];
    }
  }




  handleTabClick(tab: any) {
    if (tab.children) {
      // this.setAllTabsToFalse(this.tabItems);
      tab.active = !tab.active;
    }
    if (!tab.active && !tab.children) {
      this.setAllTabsToFalse(this.tabItems);
      tab.active = true;
      this.selectedTab = tab.name;
      this.getMarketsToDisplay();
    }
  }

  handleChildClick(tab: any, child: any) {
    this.setAllTabsToFalse(this.tabItems);
    tab.active = false;
    child.active = true;

    this.copyOfTabs.splice(this.copyOfTabs.length - 1, 0, child);
    let tab2 = this.copyOfTabs[this.copyOfTabs.length - 3];
    this.copyOfTabs.splice(this.copyOfTabs.length - 3, 1);

    if (tab2.name == 'Others') {
      tab.children.push(tab2);
    } else {
      tab.children.unshift(tab2);
    }
    tab.children.splice(tab.children.indexOf(child), 1);
    this.selectedTab = child.name;
    this.getMarketsToDisplay();
  }

  setAllTabsToFalse(arr: any[]) {
    for (let tab of arr) {
      if (tab.active) {
        tab.active = false;
      }
    }

    if (this.copyOfTabs.some((x) => x.name == 'More')) {
      this.copyOfTabs[
        this.copyOfTabs.findIndex((x) => x.name == 'More')
      ].active = false;
    }
  }

  setMarketAsTop(market: any) {
    this.topMarket = market;
    this.setTopMarket(true)
  }

  refreshEvent() {
    if (this.eventIsLive) {
      // we don't request ignore listen as true --> because when the loading start the onDestroy of details comp will cut the listen to event
      this.dataService.loadMarketsForGameLive(this.event.id);
    } else {
      this.dataService.loadMarketsForGamePre(this.event.id);
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
        if (copy.indexOf(item) >= num) {
          moreObj.children.push(item);
        }
      }
      copy.splice(num, copy.length - num);
      copy.push(moreObj);
      if (moreObj.children.length > 1) {
        this.copyOfTabs = [];
        this.copyOfTabs = [...copy];
      }
    }
  }

  returnSecondPartRunName(run: any, marketName: string) {
    if(!marketName){
      return ''
    }
    let showSign = marketName.toLowerCase().includes('handicap');

    if (run.handicap) {
      let num = +run.handicap;
      if (num.toString().includes('.75') || num.toString().includes('.25')) {
        if (!num.toString().includes('-') && showSign) {
          return '+' + (num - 0.25) + ' & ' + '+' + (num + 0.25);
        } else {
          return num - 0.25 + ' & ' + (num + 0.25);
        }
      } else {
        return num;
      }
    } else {
      return '';
    }
  }

  getMarketsToDisplay() {
    if(!this.event){
      return
    }
    if (this.selectedTab == 'Popular') {
      this.copyOfMarkets = this.event.markets.filter((x: any) =>
        this.sharedService.isMarketPopular(x.name)
      );
    }

    else if (this.selectedTab == 'Over/Under') {
      this.copyOfMarkets = this.event.markets.filter((x: any) =>
        this.sharedService.isMarketOverUnder(
          x.name,
          x.runners
        )
      );
    }

    else if (this.selectedTab == 'Goals') {
      this.copyOfMarkets = this.event.markets.filter((x: any) =>
        this.sharedService.isMarketGoals(x.name)
      );
    }

    else if (this.selectedTab == 'Half Time') {
      this.copyOfMarkets = this.event.markets.filter((x: any) =>
        this.sharedService.isMarketHalf(x.name)
      );
    }

    else if (this.selectedTab == 'Handicap') {
      this.copyOfMarkets = this.event.markets.filter((x: any) =>
        this.sharedService.isMarketHandicap(x.name, x.runners)
      );
    }

    else if (this.selectedTab == 'Others') {
      this.copyOfMarkets = this.event.markets.filter((x: any) =>
        this.sharedService.isMarketOthers(x.name, x.runners)
      );
    }

    else {
      this.copyOfMarkets = [];
    }
    this.setTopMarket(true);

    this.ref.markForCheck();
  }








  setTabsToShow(){
    this.copyOfTabs=[];
    this.tabItems.forEach(elem => {

      if (elem.name == 'Popular') {

        if(this.event.markets.some( (x: any) => this.sharedService.isMarketPopular(x.name)  )){
          this.copyOfTabs.push( elem )
        }

      }

      else if (elem.name == 'Over/Under') {
        if( this.event.markets.some((x: any) =>
          this.sharedService.isMarketOverUnder(
            x.name,
            x.runners
          )
        )){
          this.copyOfTabs.push( elem )
        }
      }

      else if (elem.name == 'Goals') {
        if( this.event.markets.some((x: any) =>
          this.sharedService.isMarketGoals(x.name)
        )){
          this.copyOfTabs.push( elem )
        }
      }

      else if (elem.name == 'Half Time') {
        if( this.event.markets.some((x: any) =>
          this.sharedService.isMarketHalf(x.name)
        )){
          this.copyOfTabs.push( elem )
        }
      }

      else if (elem.name == 'Handicap') {
        if( this.event.markets.some((x: any) =>
          this.sharedService.isMarketHandicap(x.name, x.runners)
        )){
          this.copyOfTabs.push( elem )
        }
      }

      else if (elem.name == 'Others') {
        if( this.event.markets.some((x: any) =>
          this.sharedService.isMarketOthers(x.name, x.runners)
        )){
          this.copyOfTabs.push( elem )
        }
      }


    })

  this.selectedTab = this.copyOfTabs[0].name;

  }


}
