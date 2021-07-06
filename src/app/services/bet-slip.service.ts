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
    console.log(eventName);
    console.log(isBack);
    console.log(market);
    console.log(runners);
    console.log(run);
    // if (run?.price) {
    let index = this.selectedBets.findIndex((x) => {
      return (
        String(x.eventId) == String(eventName.event.eventId) &&
        x.isBack == isBack &&
        String(x.market.marketId) == String(market.marketId) &&
        String(x.market.run.selectionId) == String(runners.selectionId)
      );
    });
    if (index > -1) {
      this.selectedBets.splice(index, 1);
    }
    let selection = {
      isBack: isBack,
      eventName: eventName.event.name,
      eventId: eventName.event.eventId,
      market: {
        marketName: market.description.marketName,
        marketId: market.marketId,
        run: {
          runnerName:runners.description.runnerName + ' '+ this.returnSecondPartRunName(runners, market.description.marketName),
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
    // }
  }

  checkIfBetIsSelected(
    eventId: string,
    marketId: string,
    selectionId: string,
    isBack = false
  ) {
    return this.selectedBets.some((x) => {
      return (
        x.market.run.selectionId === selectionId &&
        x.isBack === isBack &&
        x.market.marketId === marketId &&
        x.eventId === eventId
      );
    });
  }



  returnSecondPartRunName(run:any, marketName:string):any{

    let showSign = marketName.toLowerCase().includes('handicap');

    if(run.handicap){
      let num = +run.handicap;
      if(num.toString().includes('.75') || num.toString().includes('.25')){
        if(!num.toString().includes('-') && showSign){
          return '+'+(num -0.25) + ' & ' + '+'+(num +0.25)
        } else{
          return (num -0.25) + ' & ' + (num +0.25)
        }
      }else{
        return num;
      }
    }
    else{
      return '';
    }
  }
}
