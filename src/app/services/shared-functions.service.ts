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
}