import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {

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

  returnHighestBet(bets:any){
    if(bets == null){
        return null;
      }
    let maxPrice =  Math.max.apply(Math, bets.map(function(o:any) { return o.price; }))
    let index = bets.findIndex((x:any) => x.price === maxPrice);
    if(index != -1){
      return bets[index];
      }
    else{
      return null
      }
  }

  getBackObj(obj:any,index:number){
  try{
      return obj.markets[0].runners[index].exchange.availableToBack;
    }
    catch(ex){
      return null
    }  
  }

  getLayObj(obj:any,index:number){
    try{
      return obj.markets[0].runners[index].exchange.availableToLay;
    }
    catch(ex){
      return null
    }  
  }

  getBackObjForRun(obj:any){
    try{
        return obj.exchange.availableToBack;
      }
      catch(ex){
        return null
      }  
    }
  
    getLayObjForRun(obj:any){
      try{
        return obj.exchange.availableToLay;
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
   
    if(!item || !item.exchange || (!ToLay && !item.exchange.availableToBack)|| (ToLay && !item.exchange.availableToLay) ){
      return {
        price:'',
        size:'',
        block:true
      };
    }

    let obj = {...item.exchange.availableToLay}

    if(ToLay){

      if(index > ( item.exchange.availableToLay.length-1)){
        return {
          price:'',
          size:'',
          block:true
        };
      }
      else
      {
         obj = item.exchange.availableToLay
      }

    }
    else{

      if(index > ( item.exchange.availableToBack.length-1)){
        return {
          price:'',
          size:'',
          block:true
        };
      }
      else
      {
         obj = item.exchange.availableToBack
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
  

}
