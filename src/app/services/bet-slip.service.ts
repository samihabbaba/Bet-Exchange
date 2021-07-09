import { DebugElement, Injectable } from '@angular/core';
import { BetSlip } from '../models/bet-slip';

@Injectable({
  providedIn: 'root',
})
export class BetSlipService {
  selectedBets: BetSlip[] = [];
  currentOpenBets: any[] = ['1', '12'];

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
    let index = this.selectedBets.findIndex((x) =>
        String(x.eventId) == String(eventName.event.eventId) &&
        x.isBack == isBack &&
        String(x.market.marketId) == String(market.marketId) &&
        String(x.market.run.selectionId) == String(runners.selectionId) &&
        x.market.run.runnerName == runners.description.runnerName + ' '+ this.returnSecondPartRunName(runners, market.description.marketName)
        );
    if (index > -1) {
      this.selectedBets.splice(index, 1);
    }
    let selection = {
      isBack: isBack,
      eventName: eventName.event.name,
      eventId: eventName.event.eventId,
      liability:0,
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
    isBack = false,
    runName?:any,
  ) {
    return this.selectedBets.some((x) =>
        x.market.run.selectionId === selectionId &&
        x.isBack === isBack &&
        x.market.marketId === marketId &&
        x.eventId === eventId &&
        (runName ? x.market.run.runnerName == runName : true)
    );
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

  calculateSingleLiability(run:BetSlip){
    if(run.isBack){
      return run.stake?run.stake:0;
    }
    else{
      return run.stake?run.stake * (run.market.run.price -1):0
    }
  }

  calculateAllLiability(){
    let backBets = this.selectedBets.filter(x=>x.isBack);
    let LayBets = this.selectedBets.filter(x=>!x.isBack);

    let backLia = backBets.reduce((backLia, b) => backLia + b.liability,0);

    let LayLia = 0;
    if(LayBets.length > 0){
    LayLia = LayBets.reduce((a, b) => a.liability > b.liability? a:b).liability;
    }

    return LayLia + backLia;
  }

}
