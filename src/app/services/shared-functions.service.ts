import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {


  popularMarkets = ['Match Odds', 'Half Time', 'Both teams to Score?',
  'Over/Under 1.5 Goals', 'First Half Goals 1.5', ]


  constructor() { }

  returnTeamNameFromEvent(eventName:string, isHome = true){

    if(eventName === undefined || eventName === null || !eventName.includes(" v ")){
      return "";
    }

    if(isHome){
      return eventName.split(" v ")[0].trim();
    }else{
      return eventName.split(" v ")[1].trim();
    }
  }

  returnEventScore(event:any){
    

    if(!event  || !event.timeline || !event.timeline.score){
      return " vs ";
    }
    try{
      let homeScore =  event.timeline.score.home.score;
      let awayScore =  event.timeline.score.away.score;
      return homeScore + ' - ' + awayScore;
    }
    catch (ex){
      return " vs "
    }
  }

  returnHighestBet(bets:any, isBack = true){
    
    if(bets == null){
        return null;
      }
      if(isBack){
        let maxPrice =  Math.max.apply(Math, bets.map(function(o:any) { return o.price; }))
        let index = bets.findIndex((x:any) => x.price === maxPrice);
        if(index != -1){
          return bets[index];
          }
        else{
          return null
          }
      }
      else
      {
        let maxPrice =  Math.min.apply(Math, bets.map(function(o:any) { return o.price; }))
        let index = bets.findIndex((x:any) => x.price === maxPrice);
        if(index != -1){
          return bets[index];
          }
        else{
          return null
          }
      }
    
  }

  getBackObj(obj:any,index:number){
    
  try{
      return obj.markets[0].runners[index].exchangePrices.availableToBack;
    }
    catch(ex){
      return null
    }
  }

  getLayObj(obj:any,index:number){
    try{
      return obj.markets[0].runners[index].exchangePrices.availableToLay;
    }
    catch(ex){
      return null
    }
  }

  getBackObjForRun(obj:any){
    try{
        return obj.exchangePrices.availableToBack;
      }
      catch(ex){
        return null
      }
    }

    getLayObjForRun(obj:any){
      try{

        return obj.exchangePrices.availableToLay;
      }
      catch(ex){
        return null
      }
    }

  formatNumber(num:any, isMoney=true) {

    num = Number(num);
    if(num === 0 ){
      return 0;
    }
    if(isMoney){
      num = num.toFixed(2);
    }

    else if(num.toString().includes(".")){
      num = num.toFixed(2);
    }

      let numTr = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      return numTr;
  }

  returnRunWithIndex(item:any, index:number,ToLay = false){

    if(!item || !item.exchangePrices || (!ToLay && !item.exchangePrices.availableToBack)|| (ToLay && !item.exchangePrices.availableToLay) ){
      return {
        price:'',
        size:'',
        block:true
      };
    }

    let obj = {...item.exchangePrices.availableToLay}

    if(ToLay){

      if(index > ( item.exchangePrices.availableToLay.length-1)){
        return {
          price:'',
          size:'',
          block:true
        };
      }
      else
      {
         obj = item.exchangePrices.availableToLay
      }

    }
    else{

      if(index > ( item.exchangePrices.availableToBack.length-1)){
        return {
          price:'',
          size:'',
          block:true
        };
      }
      else
      {
         obj = item.exchangePrices.availableToBack
      }

    }



    if(ToLay){
      obj.sort( this.sortRunByPriceDEC );
    }else{
      obj.sort( this.sortRunByPrice );
    }

    return obj[index]

  }

  sortRunByPrice( a:any, b:any ) {
    if ( a.price > b.price ){
      return -1;
    }
    if ( a.price < b.price ){
      return 1;
    }
    return 0;
  }


  sortRunByPriceDEC( a:any, b:any ) {
    if ( a.price < b.price ){
      return -1;
    }
    if ( a.price > b.price ){
      return 1;
    }
    return 0;
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

  //////// markets tabs ////////
  isMarketPopular(name:string){
    if(this.popularMarkets.some(x=> x== name)){
      return true;
    }else{
      return false;
    }
  }

  isMarketOverUnder(name:string, runs:any){
    if(name.toLowerCase().includes('over') || name.toLowerCase().includes('under') || name.toLowerCase().includes('goal')
    || runs.some((x:any)=> x.description.runnerName.toLowerCase().includes('over'))
    || runs.some((x:any)=> x.description.runnerName.toLowerCase().includes('under'))){
      return true;
    }else{
      return false;
    }
  }

  
  isMarketGoals(name:string){
    if(name.toLowerCase().includes('score')  || name.toLowerCase().includes('goal')
    // && (name.toLowerCase().includes('over') || name.toLowerCase().includes('under'))
    ){
      return true;
    }else{
      return false;
    }
  }

  isMarketHandicap(name:string, runs:any){
    
    if(name.toLowerCase().includes('handicap')
    ||(name.includes('+') && this.charIsNumber(name[name.indexOf("+")+1]))
    ||(name.includes('-') && this.charIsNumber(name[name.indexOf("-")+1]))
     // or sign (+/-) then number
    ){
      return true;
    }else{
      return false;
    }
  }

  isMarketHalf(name:string){
    if(name.toLowerCase().includes('half') && !name.toLowerCase().includes('2nd')&& !name.toLowerCase().includes('second')){
      return true;
    }else{
      return false;
    }
  }

  isMarketOthers(name:string, runs:any){
    if(!this.isMarketPopular(name) && !this.isMarketOverUnder(name, runs) && !this.isMarketHandicap(name, runs)&& !this.isMarketHalf(name)&& !this.isMarketGoals(name)  ){
      return true;
    }else{
      return false;
    }
  }

  ///////////////////

  charIsNumber(char:any){
    char = char.toString()
    return ( char >= '0' && char<='9')
  }

  oddAvailableForMainPage(obj:any , index:number,back = true){

      if (back){
        if(this.returnHighestBet( this.getBackObj(obj, index)) === null){
          return false;
        }
        else{
          return true
        }
      }
      else{
        if(this.returnHighestBet( this.getLayObj(obj, index),false) === null){
          return false;
        }
        else{
          return true
        }
      }
  }

  
  oddAvailableEventContent(obj:any , index:number,back = true){
    
    try{
      let runOdds = null;
      if (back){
        runOdds = obj.exchangePrices.availableToBack;
        runOdds.sort( this.sortRunByPrice );
      }
      else{
        runOdds = obj.exchangePrices.availableToLay;
        runOdds.sort( this.sortRunByPriceDEC );
      }
  
      if(runOdds.length-1 < index){
        return false;
      }

      return true;

    }
    catch(ex){
      return false;
    }

}

  marketAvailable(){
    return true;
  }
}
