import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFutbol, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { last } from 'rxjs/operators';
import { BetSlipService } from 'src/app/services/bet-slip.service';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-live-games',
  templateUrl: './live-games.component.html',
  styleUrls: ['./live-games.component.css'],
})
export class LiveGamesComponent implements OnInit, OnDestroy {
  constructor(
    public dataService: DataService,
    public sharedService: SharedFunctionsService,
    public betSlipService: BetSlipService,
    private ref: ChangeDetectorRef
  ) {
    
    this.subscription = this.dataService.selectedEvents.subscribe((resp) => {
      let arrOfGames = [];
      for (let key in resp) {
        let value = resp[key];
        arrOfGames.push({events:value, sport:value[0].eventType.name, sportId:value[0].eventTypeId});
        // Use `key` and `value`
    }
      this.games = arrOfGames;
      this.ref.markForCheck();

    });
  }

  deb = false;
  games: any = [];
  subscription: Subscription;
  lastSport = '';

  fontAwesomeIcons = {
    footBall: faFutbol,
    exit: faTimes,
    lock: faLock,
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  goToEventDetails(eventId: any) {
    this.dataService.loadMarketsForGameLive(eventId);
    // this.layoutService.displayGameDetails();
  }

  showSport(sport:string, i:number){

    if(i == 0){
      this.lastSport == ''
    }

    console.log(this.lastSport)
    

    if(sport == this.lastSport){
      return false;
    }
    else{
      this.lastSport = sport;
      return true;
    }

  }

  playedEvent(ev:any){
    return this.betSlipService.currentOpenBets.some(x=>x.selection.eventId == ev)
  }

}
