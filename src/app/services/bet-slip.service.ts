import { HttpClient } from '@angular/common/http';
import { DebugElement, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BetSlip } from '../models/bet-slip';

@Injectable({
  providedIn: 'root',
})
export class BetSlipService {
  selectedBets: BetSlip[] = [];
  currentOpenBets: any[] = ['1', '12'];
  minStakeForBet = 1;

  constructor(private http: HttpClient) {}

  pushToSelectedBets(
    event: any,
    isBack = false,
    market?: any,
    runners?: any,
    run?: any
  ) {

    if(!this.validOdd(market, runners, run)){
      return;
    }

    let selection = {
      isBack: isBack,
      eventName: event.name,
      eventId: event.id,
      liability:0,
      market: {
        marketName: market.name,
        marketId: market.id,
        run: {
          runnerName:runners.name + ' '+ this.returnSecondPartRunName(runners, market.name),
          price: run.price,
          size: run.size,
          selectionId: runners.selectionId,
        },
      },
    };

    
    let lastPrice = -1;
    let lastSize = -1;
    // if (run?.price) {
    let index = this.selectedBets.findIndex((x) =>
        String(x.eventId) == String(event.id) &&
        x.isBack == isBack &&
        String(x.market.marketId) == String(market.id) &&
        String(x.market.run.selectionId) == String(runners.selectionId) &&
        x.market.run.runnerName == runners.name + ' '+ this.returnSecondPartRunName(runners, market.name)
        );
    if (index > -1) {
      lastPrice = this.selectedBets[index].market.run.price;
      lastSize = this.selectedBets[index].market.run.size;
      this.selectedBets.splice(index, 1);
    }
    
    if((lastPrice > -1 || lastSize > -1) && (selection.market.run.price == lastPrice && selection.market.run.size == lastSize )){
      // do nothing
    }
    else{
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
    let LayLia = LayBets.reduce((LayLia, b) => LayLia + b.liability,0);

    // get lay liability with highest value 
    // let LayLia = 0;
    // if(LayBets.length > 0){
    // LayLia = LayBets.reduce((a, b) => a.liability > b.liability? a:b).liability;
    // }

    return LayLia + backLia;
  }

  validOdd(market:any, runners:any, run:any){

    if(!run || !run.price || !run.size || run.price == '' || run.size == ''){
      return false;
    }
    
    return true;
  }

  pickAllTopMarketsOdds(event:any, market:any, isBack = true){

    // event: any,
    // isBack = false,
    // market?: any,
    // runners?: any,
    // run?: any

    let f= false;
    for(let i = 0; i < market.runners.length; i++){

      try{

        if(isBack){
          let run = market.runners[i].exchangePrices.availableToBack[0];
          this.pushToSelectedBets(
            event,
            isBack,
            market,
            market.runners[i],
            run
          )
        }else{
          let run = market.runners[i].exchangePrices.availableToLay[0];
          this.pushToSelectedBets(
            event,
            isBack,
            market,
            market.runners[i],
            run
          )
        }

      }
      catch(ex){
        continue
      }

    }

      

  }



  ///////////////// API requests ////////////////////////
  

  // login(model: any) {
  //   let loginURL = 'https://api.vebobet.com/api/v1/auth/login';
  //   return this.http.post(loginURL, model, {
  //     headers: this.httpOptions.headers,
  //     observe: 'response',
  //   });
  // }

}
