import { Injectable } from '@angular/core';
import { BetSlip } from '../models/bet-slip';

@Injectable({
  providedIn: 'root',
})
export class BetSlipService {
  selectedBets: BetSlip[] = [];
  currentOpenBets: any[] = [];

  constructor() {}

  pushToSelectedBets(
    eventName: any,
    isBack = false,
    market?: any,
    runners?: any,
    run?: any
  ) {
    // console.log(eventName);
    // isBack ? console.log('Im Back') : console.log('Im Lay');
    // console.log(market);
    // console.log(runners);
    // console.log(run);

    let selection = {
      isBack: isBack,
      eventName: eventName.event.name,
      eventId: eventName.event.eventId,
      market: {
        marketName: market.description.marketName,
        marketId: market.marketId,
        run: {
          runnerName: runners.description.runnerName,
          price: run.price,
          size: run.size,
          selectionId: runners.selectionId,
        },
      },
    };

    if (!selection.isBack) {
      this.selectedBets.push(selection);
    } else {
      let i = this.selectedBets.findIndex((x) => !x.isBack);
      i === -1
        ? this.selectedBets.push(selection)
        : this.selectedBets.splice(i, 0, selection);
    }
  }
}
