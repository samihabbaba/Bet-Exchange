import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BetSlipService } from 'src/app/services/bet-slip.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  game: any = [];
  subscription: Subscription;

  constructor(private dataService: DataService, private betSlipService:BetSlipService) {
    this.subscription = this.dataService.selectedEventDetails.subscribe(
      (resp) => {
        this.game = resp;
      }
    );
  }

  ngOnDestroy(): void {
    this.dataService.stopLiveEventListen();
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    try{
      if(this.betSlipService.currentOpenBets.some(x=>x.selection.eventName === this.game.name) ){
        this.betSlipService.selectedOpenBet = this.game.name;
        // this.betSlipService.updateOpenBetsOptions(true);
        this.betSlipService.updateOpenBets();
      }
    }
    catch(ex){

    }
  }
}
