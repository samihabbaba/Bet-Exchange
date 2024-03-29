import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFutbol, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BetSlipService } from 'src/app/services/bet-slip.service';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-pre-games',
  templateUrl: './pre-games.component.html',
  styleUrls: ['./pre-games.component.css']
})
export class PreGamesComponent implements OnInit,OnDestroy {

  constructor(
    public dataService: DataService,
    public sharedService: SharedFunctionsService,
    private router: Router,
    private layoutService: LayoutService,
    public betSlipService: BetSlipService
  ) {
    this.subscription = this.dataService.selectedEvents.subscribe(resp => {

      let arrOfGames = [];
      for (let key in resp) {
        let value = resp[key];
        arrOfGames.push({events:value, sport:value[0].eventType.name, sportId:value[0].eventTypeId});
        // Use `key` and `value`
    }

    this.games = arrOfGames;
    })

    this.subscription2 = this.layoutService.currentSport.subscribe(resp => {
    this.currentSport = resp;
    })
  }

  fontAwesomeIcons = {
    footBall: faFutbol,
    exit: faTimes,
    lock: faLock
  };

  games:any = [];
  currentSport:any = {};
  subscription: Subscription
  subscription2: Subscription

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.subscription2.unsubscribe()
  }

  ngOnInit(): void {

  }

  playedEvent(ev:any){
    return this.betSlipService.currentOpenBets.some(x=>x.selection.eventId == ev)
  }

  goToEventDetails(eventId:any) {
    this.dataService.loadMarketsForGamePre(eventId);
    // this.layoutService.displayGameDetails();
  }
}
