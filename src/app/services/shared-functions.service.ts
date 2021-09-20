import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {

  pageSizeOptions = [5, 10, 25, 100, 500, 1000];
  defaultPageSize = 50;

  popularMarkets = ['Match Odds', 'Half Time', 'Both teams to Score?', 'Over/Under 1.5 Goals', 'First Half Goals 1.5', 'Series Winner', 'Regular Time Match Odds',
   'Match Winner', 'Moneyline', 'Fight Result', 'Winner']

   mainMarkets = ['Match Odds', 'Fight Result', 'Moneyline', 'Match Winner', 'Regular Time Match Odds', ];

   currencyList = ['TRY', 'USD', 'EUR', 'GBP'];
   sports:any = []
   sportToMainMarket = [{ id:'1',main: ['Match Odds'] },{ id:'26420387',main: ['Fight Result'] },{ id:'7524',main: ['Moneyline'] },{ id:'7522',main: ['Moneyline'] }
   ,{ id:'2',main: ['Match Odds'] },{ id:'6423',main: ['Moneyline'] },{ id:'6422',main: ['Match Winner','Match Odds'] },{ id:'5',main: ['Match Odds'] }
   ,{ id:'1477',main: ['Match Odds','Regular Time Match Odds'] },{ id:'3503',main: ['Match Odds'] },{ id:'6',main: ['Match Odds'] },{ id:'7511',main: ['Moneyline'] }
   ,{ id:'11',main: [] },{ id:'8',main: [] },{ id:'7',main: [] },{ id:'61420',main: [] }
   ,{ id:'606611',main: [] },{ id:'4339',main: [] },{ id:'4',main: ['Match Odds'] },{ id:'3',main: [] }
   ,{ id:'27454571',main: ['Match Odds'] },{ id:'2378961',main: [] },{ id:'2152880',main: [] },{ id:'10',main: [] }]

   strictedSports =[
    'Special Bets',
    'Cycling',
    'Gaelic Games',
    'Politics',
    'Mixed Martial Arts',
    'Esports',
    'Golf',
    'Cricket',
    'Greyhound Racing',
    'Boxing',
    'Australian Rules',
    'Horse Racing',
    'Baseball',
    'Motor Sport',
   ]

  constructor(private dataService:DataService , private notify:NotificationService) {
    this.loadSports();
   }

  loadSports(){
    this.dataService.getSports().subscribe(resp => {
      this.sports = resp.body;
    })
  }

  returnTeamNameFromEvent(eventName:string, isHome = true){

    if(eventName === undefined || eventName === null || (!eventName.includes(" v ") && !eventName.includes(" @ ")&& !eventName.includes(" vs "))){
      if(isHome){
        return eventName;
      }else{
        return "";
      }
    }

    if(eventName.includes(" v ")){
      if(isHome){
        return eventName.split(" v ")[0].trim();
      }else{
        return eventName.split(" v ")[1].trim();
      }
    }
    else if(eventName.includes(" @ ")){
      if(isHome){
        return eventName.split(" @ ")[0].trim();
      }else{
        return eventName.split(" @ ")[1].trim();
      }
    }
    else if(eventName.includes(" vs ")){
      if(isHome){
        return eventName.split(" vs ")[0].trim();
      }else{
        return eventName.split(" vs ")[1].trim();
      }
    }
    else{
      return "";
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
    try{
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
    catch(ex){
      return -1;
    }
    
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
    || runs.some((x:any)=> x.name.toLowerCase().includes('over ')) || runs.some((x:any)=> x.name.toLowerCase().includes(' over'))
    || runs.some((x:any)=> x.name.toLowerCase().includes('under '))|| runs.some((x:any)=> x.name.toLowerCase().includes(' under'))
    ){
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

    if(!obj.markets[0]){
      return false;
    }

    if(!this.marketAvailable(obj.markets[0])){
      return false;
    }

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

  marketAvailable(market:any){
    try{
      if(market.status == 'SUSPENDED'){
        return false;
      }
      else{
        return true;
      }
    }
    catch(ex){
      return false;
    }
  }

  formatDate(day:number, month:number, year:number, addOneDay = false){
    // if(addOneDay){
    //   day=day+1
    // }
    return month+'/'+day+'/'+year
  }


  getSportNameById(id:string){
    
    let index = this.sports.findIndex((x:any)=> x.id == id);
    if(index == -1){
      return 'Unkown'
    }else{
      return this.sports[index].name;
    }
  }

  getMatchedDate(date:any){
    if(date){
      return date;
    }
    else{
      return 'not Matched'
    }
  }

  

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  returnEventName(eventName:string){
    if(eventName == null || eventName == undefined){
      return '';
    }

    if(eventName.includes(" v ")){
      return eventName.replace(' v ',' vs ')
    }
    else if(eventName.includes(" @ ")){
      return eventName.replace(' @ ',' vs ')
    }
    else{
      return eventName;
    }
  }
  
  showErrorMsg(error:any, defaultMsg:any){
    if(error.error.errorMessage){
      this.notify.error(error.error.errorMessage);
      return
    }
    else{
      this.notify.error(defaultMsg);
      return
    }

    try{
      let msg = error.error.fields[Object.keys(error.error.fields)[0]]; 
      if( msg !== undefined){
        this.notify.error(msg);
      }else{
        this.notify.error(defaultMsg);
      }
    }
    catch(ex){
      this.notify.error(defaultMsg);
    }
  }

  getUserParent(user:any){
    try{
      let parents = user.parentHeirarchy;
      parents = parents.sort((a:any, b:any) => a.depth < b.depth ? -1 : a.depth > b.depth ? 1 : 0);
      return parents[0];
    }
    catch(ex){
      return null
    }
  }

  displayOdds(event:any){
    
   let eventType = ''
   let marketName = ''
    try{
      event.id;
      event.markets[0]?.id;
      event.markets[0]?.runners[0]?.selectionId;

      eventType = event.eventType.id;
      marketName = event.markets[0].name
    }
    catch(ex){
      return false
    }

    if(eventType && eventType !=='' && marketName && marketName !==''){
      let index = this.sportToMainMarket.findIndex(x=> x.id == eventType);
      if(index !== -1 && this.sportToMainMarket[index].main.some(x=> x == marketName)){
        return true
      }
      else{
        return false;
      }
    }
    else{
      return false
    }
  }

}

