import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { finalize, map } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';
import { LayoutService } from './layout.service';
import { LiveFeedService } from './live-feed.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  headerType = 1; // 1-pre / 2-live / 3-other
  events = new BehaviorSubject<any>(null);
  selectedEvents = this.events.asObservable();


  eventDetails = new BehaviorSubject<any>(null);
  selectedEventDetails = this.eventDetails.asObservable();



  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private layoutService:LayoutService
    ,public liveFeed:LiveFeedService
    ) {

    this.liveFeed.selectedEvents.subscribe(resp => {
      this.handleLiveFeed(resp);
    });

    this.liveFeed.selectedEventDetail.subscribe(resp => {
      this.handleGameDetailFeed(resp);
    });

   }


  ////////////////////////////////
  ////// sports Controller //////
  ///////////////////////////////


  getSports(){
    return this.http.get<any>(`${this.baseUrl}sports`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
       });
  }


  /////////////////////////////////////
  ////// BettingRules Controller //////
  ////////////////////////////////////

  // GET​/bettingrules
  getBettingRules(pars:any){
    return this.http.get<any>(`${this.baseUrl}bettingrules?PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
       });
  }

  // POST/bettingrules
  addBettingRules(obj:any) {
    return this.http.post(`${environment.apiUrl}bettingrules`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // GET/bettingrules​/{id}
  getBettingRulesById(id:any){
    return this.http.get<any>(`${this.baseUrl}bettingrules/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // PUT/bettingrules​/{id}
  updateBettingRules(obj:any){
    return this.http.put<any>(`${this.baseUrl}bettingrules/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // DELETE/bettingrules​/{id}
  deleteBettingRulesById(id:any){
    return this.http.delete<any>(`${this.baseUrl}bettingrules/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }



  ////////////////////////////////
  ////// League Controller //////
  ////////////////////////////////

  // GET​/leagues
  getLeagues​(pars:any){
    return this.http.get<any>(`${this.baseUrl}leagues​?PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}&regionCode=${pars.regionCode?pars.regionCode:''}&SportId=${pars.SportId?pars.SportId:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
      });
  }

  // GET​/leagues
  getAllLeagues​(regionCode:string){
    return this.http.get<any>(`${this.baseUrl}leagues/all?regionCode=${regionCode?regionCode:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
      });
  }

  getLeagueById(id:any){
    return this.http.get<any>(`${this.baseUrl}leagues/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateLeague(obj:any){
    return this.http.put<any>(`${this.baseUrl}leagues/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }



  //////////////////////////////
  ////// Live Controller //////
  /////////////////////////////

  getLive​(pars:any){
    return this.http.get<any>(`${this.baseUrl}live?RegionCode=${pars.RegionCode?pars.RegionCode:''}&LeagueId=${pars.LeagueId?pars.LeagueId:''}&IncludeDisabled=${pars.IncludeDisabled?pars.IncludeDisabled:false}&PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
     });
  }

  getAllLive​(pars:any){
    return this.http.get<any>(`${this.baseUrl}live/all?RegionCode=${pars.RegionCode?pars.RegionCode:''}&LeagueId=${pars.LeagueId?pars.LeagueId:''}&IncludeDisabled=${pars.IncludeDisabled?pars.IncludeDisabled:false}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
     });
  }

  getLIveById(id:any){
    return this.http.get<any>(`${this.baseUrl}live/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }


  ////////////////////////////////
  ////// Region Controller //////
  ///////////////////////////////


  getRegions​(pars:any){
    return this.http.get<any>(`${this.baseUrl}regions?PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}&SportId=${pars.SportId?pars.SportId:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
     });
  }

  getAllRegions​​(sportId:number){
    return this.http.get<any>(`${this.baseUrl}regions/all`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
     });
  }

  getRegionById(id:any){
    return this.http.get<any>(`${this.baseUrl}regions/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateRegions(obj:any){
    return this.http.put<any>(`${this.baseUrl}regions/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }


  //////////////////////////////////
  ////// Upcoming Controller //////
  ////////////////////////////////

  getUpcoming(pars:any){
    return this.http.get<any>(`${this.baseUrl}upcoming?RegionCode=${pars.RegionCode?pars.RegionCode:''}&LeagueId=${pars.LeagueId?pars.LeagueId:''}&PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',    });
  }

  getAllUpcoming​​(pars:any){
    return this.http.get<any>(`${this.baseUrl}upcoming/all?RegionCode=${pars.RegionCode?pars.RegionCode:''}&LeagueId=${pars.LeagueId?pars.LeagueId:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',    });
  }

  getUpcomingById(id:any){
    return this.http.get<any>(`${this.baseUrl}upcoming/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }




  ////////////// end of API requests //////////////



  //////////////////////////////////
  ////// matches requests   //////
  ////////////////////////////////

  ////// live part

  loadLiveGames(){
    if(this.layoutService.isMainLoading()){
      return;
    }
    else{
      this.layoutService.startMainLoading();
    }

    this.events.next([]);
    this.layoutService.displayLiveGames();

    this.getAllLive({})
    .pipe(
      finalize( () =>       this.layoutService.stopMainLoading()
    )).subscribe(resp => {
    this.layoutService.displayLiveGames();
      this.events.next(resp.body);
      this.liveFeed.startLiveUpdate();
    }, error=>{
      this.events.next([]);
      // add error message here
    })
  }

  handleLiveFeed(games:any){
    if(this.layoutService.getHeaderValue() !== 'live'){
      return
    }
    this.events.next(games);

  }

  handleGameDetailFeed(game:any){

    if(this.layoutService.getHeaderValue() !== 'details'){
      return
    }
    this.eventDetails.next(game);

  }

  loadMarketsForGameLive(eventId:any, ignoreListen = false){
    if(this.layoutService.isMainLoading()){
      return;
    }else{
      this.layoutService.startMainLoading();
    }
    this.eventDetails.next([]);
    this.layoutService.displayGameDetails();

    this.getLIveById(eventId).pipe(
      finalize( () =>       this.layoutService.stopMainLoading()
    ))
    .subscribe(resp =>{
      this.layoutService.displayGameDetails();
      this.eventDetails.next({...resp.body, isLive:true});
      if(!ignoreListen){
        this.liveFeed.listenToEvent(eventId);
      }
    }, error=>{
      this.eventDetails.next([]);
      // add error message here
    })
  }

  stopLiveEventListen(){
    this.liveFeed.removeEventListen();
  }

  ////// pre part

  loadPreGames(leagueId:number, regionId:string){

    if(this.layoutService.isMainLoading()){
      return;
    }
    else{
      this.layoutService.startMainLoading();
    }

    this.events.next([]);
    this.layoutService.displayPreGames();

    this.getAllUpcoming({
      LeagueId:leagueId,
      RegionCode:regionId
    }).pipe(
      finalize( () =>       this.layoutService.stopMainLoading()
    ))
    .subscribe(resp =>{
      this.layoutService.displayPreGames();
      this.events.next(resp.body);
    }, error=>{
      this.events.next([]);
      // add error message here
    })
  }

  loadPreGamesFromHeader(){
    if(this.layoutService.isMainLoading()){
      return;
    }
    else{
      this.layoutService.startMainLoading();
    }

    this.events.next([]);
    this.layoutService.displayPreGames();

    this.getUpcoming({
      PageNo:1,
      PageSize:15,
      SortBy:'event.openDate',
      SortingType:1
    }).pipe(
      finalize( () =>       this.layoutService.stopMainLoading()
    ))
    .subscribe(resp =>{
      this.layoutService.displayPreGames();
      this.events.next(resp.body.items);
    }, error=>{
      this.events.next([]);
      // add error message here
    })
  }

  loadMarketsForGamePre(eventId:any){
    if(this.layoutService.isMainLoading()){
      return;
    }else{
      this.layoutService.startMainLoading();
    }
    this.eventDetails.next([]);
    this.layoutService.displayGameDetails();

    this.getUpcomingById(eventId).pipe(
      finalize( () =>       this.layoutService.stopMainLoading()
    ))
    .subscribe(resp =>{
      this.layoutService.displayGameDetails();

      this.eventDetails.next(resp.body);
    }, error=>{
      this.eventDetails.next([]);
      // add error message here
    })
  }

  ////////////////////////////////////////

  performLogIn(){

   let loginURL = 'https://api.vebobet.com/';
     let model = {
      username : "DiscTest",
      password : "Disc123!"
     }

     this.login(model).subscribe(resp=>{

      const user:any = resp.body;

        localStorage.setItem("token", user.token);

     }, error=>{

     })
   }

   login(model:any){
      let loginURL = 'https://api.vebobet.com/api/v1/auth/login';
      return this.http.post(loginURL, model, {
         headers: this.httpOptions.headers,
         observe: 'response',
      });
   }

}

