import { HttpClient } from '@angular/common/http';
import { DebugElement, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BetSlip } from '../models/bet-slip';
import { DataService } from './data.service';
import { SharedFunctionsService } from './shared-functions.service';
import { SignalRNotificationsService } from './signal-r-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class BetSlipService {
  selectedBets: BetSlip[] = [];
  currentOpenBets: any[] = [];
  minStakeForBet = 1;


  openBetsToView: any[] = [];
  openBetsToViewMatched: any[] = [];
  openBetsToViewUnmatched: any[] = [];

  openBetsSelectOptions: any[] = ['', ''];
  selectedOpenBet: any = '';


  constructor(private http: HttpClient, private notiSignalR:SignalRNotificationsService, private sharedService:SharedFunctionsService, private dataService:DataService) {
    this.notiSignalR.notification.subscribe(noti => {

      if(!noti){
        return
      }
      
      //bet id should be in .message or .payload (not sure)
      else if(noti.type == 'BET_MATCHED'){
        if(this.currentOpenBets.some(x=>x.id == noti.payload)){
          let index = this.currentOpenBets.findIndex(x=>x.id == noti.payload)
          if(index > -1){
            this.currentOpenBets[index].status = 'PENDING';
            this.updateOpenBets();
          }
        }
        this.loadTopMarketBets(this.latestTopMarketId);
      }

    })
  }

  pushToSelectedBets(
    event: any,
    isBack = false,
    market?: any,
    runners?: any,
    run?: any
  ) {
// debugger


    if(!this.validOdd(market, runners, run) || !this.sharedService.marketAvailable(market)){
      return;
    }

    let selection = {
      isBack: isBack,
      eventName: this.sharedService.returnEventName(event.name),
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

  clearMatchedBets(){
    this.currentOpenBets = this.currentOpenBets.filter(x=> x.status == 'UNMATCHED');
    this.updateOpenBetsOptions();
  }

  updateOpenBets(event?:any){
    this.openBetsToView = this.currentOpenBets.filter(x=> x.selection.eventName === this.selectedOpenBet).sort((a:any, b:any) => a.selection.betType < b.selection.betType ? -1 : a.selection.betType > b.selection.betType ? 1 : 0);
    this.openBetsToViewUnmatched= this.currentOpenBets.filter(x=> x.selection.eventName === this.selectedOpenBet && x.status == 'UNMATCHED').sort((a:any, b:any) => a.selection.betType < b.selection.betType ? -1 : a.selection.betType > b.selection.betType ? 1 : 0);
    this.openBetsToViewMatched = this.currentOpenBets.filter(x=> x.selection.eventName === this.selectedOpenBet && x.status == 'PENDING').sort((a:any, b:any) => a.selection.betType < b.selection.betType ? -1 : a.selection.betType > b.selection.betType ? 1 : 0);
  }

  updateOpenBetsOptions(keepEvent = false){
    this.openBetsSelectOptions = this.currentOpenBets.map(function(i) {
      return i.selection.eventName;
    });

    this.openBetsSelectOptions = [...new Set(this.openBetsSelectOptions)];
    if(keepEvent && this.openBetsSelectOptions.some(x=>x == this.selectedOpenBet)){
    }
    else{
      if(this.openBetsSelectOptions.length > 0){
        this.selectedOpenBet = this.openBetsSelectOptions[0];
      }else{
        this.selectedOpenBet = '';
      }
    }

    this.updateOpenBets();
  }

  cancelAllOpenBetsForEventId(betIds:any){
    // this.currentOpenBets = this.currentOpenBets.filter(x=> x.selection.eventId !== eventId || (x.selection.eventId === eventId && x.status === 'PENDING') )
    this.currentOpenBets = this.currentOpenBets.filter(x=> !betIds.some((y:any)=> y == x.id) )
    this.updateOpenBetsOptions(true);
  }
  
  cancelOpenBetById(id:string){
    this.currentOpenBets = this.currentOpenBets.filter(x=> x.id !== id)
    this.updateOpenBetsOptions(true);
  }






  betsForMarket:any = [];
  latestTopMarketId = '';
  loadTopMarketBets(marketId:any){
    if(marketId == ''){
      return
    }
    this.latestTopMarketId = marketId;
    // add bet to the array if came as matched from signalR or on bet place
    // maybe just make an obs variable and trigger it when ever it's needed to reload it
    this.dataService.getBets(1, 5000, '', '','',marketId,'','','','','',false, '', 'Pending', '','').subscribe(resp => {
      this.betsForMarket = resp.body.items;
    }, erorr => {
      this.betsForMarket = [];
    })
  }

  getRunMoney(marketId:any, selectionId:any){ // maybe take run name also ?

    if(this.betsForMarket.length == 0 || this.betsForMarket[0].selection.marketId !== marketId){
      return 0;
    }
    // how much each run will cost, either as winning money or losing
    // get all events for the user with the needed market id
    // take only the pending bets - no unmatched or settled 
    // debugger

    let runBack = this.betsForMarket.filter((x:any)=>x.selection.selectionId == selectionId && x.selection.betType == 'BACK')    
    let runLay = this.betsForMarket.filter((x:any)=>x.selection.selectionId == selectionId && x.selection.betType == 'LAY')    
    let notRunBack = this.betsForMarket.filter((x:any)=>x.selection.selectionId != selectionId && x.selection.betType == 'BACK')    
    let notRunLay = this.betsForMarket.filter((x:any)=>x.selection.selectionId != selectionId && x.selection.betType == 'LAY')    

    let runBackProfit = runBack.reduce((runBackProfit:any, b:any) => runBackProfit + (b.payout - b.stake),0);
    let runLayLiability = runLay.reduce((runLayLiability:any, b:any) => runLayLiability + ((b.odd-1)*b.stake),0);    
    let notRunBackStake = notRunBack.reduce((notRunBackStake:any, b:any) => notRunBackStake + b.stake,0);
    let notRunLayStake = notRunLay.reduce((notRunLayStake:any, b:any) => notRunLayStake + b.stake,0);
    
    //calculate the winning money (stake + profit/liability) for the bets with runner id --> minus liability of the others

    let num =  (runBackProfit - runLayLiability) + (notRunLayStake - notRunBackStake);
    return this.sharedService.formatNumber(num)
    
    // return (runBackProfit - runLayLiability) + (notRunLayStake - notRunBackStake);
  }

  returnBetsProfit(bet:any){
debugger
    if(bet.selection.betType == 'BACK'){
      return bet.payout - bet.stake;
    }
    else if(bet.selection.betType == 'LAY'){
      return bet.stake;
    }
    else{
      return -1;
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
