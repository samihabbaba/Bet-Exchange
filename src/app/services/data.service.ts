import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { LayoutService } from './layout.service';
import { LiveFeedService } from './live-feed.service';

@Injectable({
  providedIn: 'root',
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
  constructor(
    private http: HttpClient,
    private layoutService: LayoutService,
    public liveFeed: LiveFeedService
  ) {
    this.liveFeed.selectedEvents.subscribe((resp) => {
      this.handleLiveFeed(resp);
    });

    this.liveFeed.selectedEventDetail.subscribe((resp) => {
      this.handleGameDetailFeed(resp);
    });
  }



  ////////////////////////////////
  ////// Bet Controller //////
  ///////////////////////////////

  getBets(PageNo:number, PageSize:number, UserId='', ParentId='', BetType='', MarketId='', SelectionId='', EventTypeId='', CompetitionId='',StartDate='', EndDate='', OnLastActionDate=false) {
    return this.http.get<any>(`${this.baseUrl}bets?PageNo=${PageNo}&PageSize=${PageSize}&UserId=${UserId}&ParentId=${ParentId}&BetType=${BetType}&MarketId=${MarketId}&SelectionId=${SelectionId}&EventTypeId=${EventTypeId}&CompetitionId=${CompetitionId}&StartDate=${StartDate}&EndDate=${EndDate}&OnLastActionDate=${OnLastActionDate}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  submitBets(bets:any){        
     return this.http.post(`${environment.apiUrl}bets`, bets, {
       headers: this.httpOptions.headers,
       observe: "response",
     });
  }
    
  getBetById(id:string) {
    return this.http.get<any>(`${this.baseUrl}bets/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  voidBets(id:string){        
    return this.http.post(`${environment.apiUrl}bets/${id}/void`,{}, {
      headers: this.httpOptions.headers,
      observe: "response",
    });
 }
 
  winBets(id:string){        
    return this.http.post(`${environment.apiUrl}bets/${id}/win`,{}, {
      headers: this.httpOptions.headers,
      observe: "response",
    });
  }

  loseBets(id:string){        
      return this.http.post(`${environment.apiUrl}bets/${id}/lose`,{}, {
        headers: this.httpOptions.headers,
        observe: "response",
      });
    }

  ///////////////////////////////////
  ///// Transaction Controller /////
  //////////////////////////////////

  getTransactions(PageNo:number, PageSize:number, UserId='', ToUserId='', CurrencyCode='', ParentId='', StartDate='',EndDate='',DirectParent:any='',BettingTransactionsOnly:any='' ) {
    //BettingTransactionsOnly  [ null (all), true (only bet related), flase (filter out the bet related transactions)]
    let query = this.convertObjectToQueryString({
      PageNo:PageNo, PageSize:PageSize, UserId:UserId, ToUserId:ToUserId, CurrencyCode:CurrencyCode, ParentId:ParentId, StartDate:StartDate,EndDate:EndDate, DirectParent:DirectParent, BettingTransactionsOnly:BettingTransactionsOnly
    })
    return this.http.get<any>(`${this.baseUrl}transactions${query}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
    // return this.http.get<any>(`${this.baseUrl}transactions?PageNo=${PageNo}&PageSize=${PageSize}&UserId=${UserId}&ParentId=${ParentId}&ToUserId=${ToUserId}&CurrencyCode=${CurrencyCode}&StartDate=${StartDate}&EndDate=${EndDate}&DirectParent=${DirectParent}&BettingTransactionsOnly=${BettingTransactionsOnly}`, {
    //   headers: this.httpOptions.headers,
    //   observe: 'response',
    // });
  }
    
  getTransactionById(id:string) {
    return this.http.get<any>(`${this.baseUrl}transactions/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }






///////////////////////////////////
  ///// Sports Controller /////
  //////////////////////////////////

  getSports() {
    return this.http.get<any>(`${this.baseUrl}sports`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

///////////////////////////////////
  ///// login history Controller /////
  //////////////////////////////////

  getLoginHistory(userId:string , StartDate:string, EndDate:string, PageNo:number, PageSize:number) {
    return this.http.get<any>(`${this.baseUrl}login-history?userId=${userId}&StartDate=${StartDate}&EndDate${EndDate}&PageNo=${PageNo}&PageSize=${PageSize}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  /////////////////////////////////////
  ////// BettingRules Controller //////
  ////////////////////////////////////

  // GET​/bettingrules
  getBettingRules(PageNo:any, PageSize:any, SortBy:any=null,) {

    return this.http.get<any>(
      `${this.baseUrl}bettingrules?PageNo=${
        PageNo ? PageNo : ''
      }&PageSize=${PageSize ? PageSize : ''}&SortingType=1`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  // POST/bettingrules
  addBettingRules(obj: any) {
    return this.http.post(`${environment.apiUrl}bettingrules`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // GET/bettingrules​/{id}
  getBettingRulesById(id: any) {
    return this.http.get<any>(`${this.baseUrl}bettingrules/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // PUT/bettingrules​/{id}
  updateBettingRules(obj: any) {
    return this.http.put<any>(`${this.baseUrl}bettingrules/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // DELETE/bettingrules​/{id}
  deleteBettingRulesById(id: any) {
    return this.http.delete<any>(`${this.baseUrl}bettingrules/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  
  ////////////////////////////////
  ////// League Controller //////
  ////////////////////////////////

  // GET​/leagues
  getLeagues(pars: any) {
    return this.http.get<any>(
      `${this.baseUrl}leagues/paged​?PageNo=${
        pars.PageNo ? pars.PageNo : ''
      }&PageSize=${pars.PageSize ? pars.PageSize : ''}&SortBy=${
        pars.SortBy ? pars.SortBy : ''
      }&SortingType=1&regionCode=${
        pars.regionCode ? pars.regionCode : ''
      }&EventTypeId=${pars.SportId ? pars.SportId : ''}&HasInPlay=${pars.HasInPlay ? pars.HasInPlay : false}`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  // GET​/leagues
  getAllLeagues(sportId:string,regionCode: string, HasInPlay:any =null) {

    let query = this.convertObjectToQueryString({
      sportId:sportId,
      regionCode:regionCode,
      HasInPlay:HasInPlay
    })

    return this.http.get<any>(
      `${this.baseUrl}leagues${query}`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  getLeagueById(id: any) {
    return this.http.get<any>(`${this.baseUrl}leagues/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateLeague(obj: any) {
    return this.http.put<any>(`${this.baseUrl}leagues/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }
  
  toggleLeagueActivation(obj: any) {
    return this.http.put<any>(`${this.baseUrl}leagues/${obj.id}/active/toggle`, {}, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  //////////////////////////////
  ////// Live Controller //////
  /////////////////////////////

  getLive(pars: any) {
    return this.http.get<any>(
      `${this.baseUrl}live/paged?RegionCode=${
        pars.RegionCode ? pars.RegionCode : ''
      }&CompetitionId=${pars.LeagueId ? pars.LeagueId : ''}&IncludeDisabled=${
        pars.IncludeDisabled ? pars.IncludeDisabled : false
      }&PageNo=${pars.PageNo ? pars.PageNo : ''}&PageSize=${
        pars.PageSize ? pars.PageSize : ''
      }&SortBy=OpenDate&SortingType=1`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  getAllLive(pars: any) {
    return this.http.get<any>(
      `${this.baseUrl}live?RegionCode=${
        pars.RegionCode ? pars.RegionCode : ''
      }&CompetitionId=${pars.LeagueId ? pars.LeagueId : ''}&IncludeDisabled=${
        pars.IncludeDisabled ? pars.IncludeDisabled : false
      }&SortBy=OpenDate`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  getLIveById(id: any) {
    return this.http.get<any>(`${this.baseUrl}live/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  ////////////////////////////////
  ////// Region Controller //////
  ///////////////////////////////

  getRegions(pars: any) {
    return this.http.get<any>(
      `${this.baseUrl}regions/paged?PageNo=${
        pars.PageNo ? pars.PageNo : ''
      }&PageSize=${pars.PageSize ? pars.PageSize : ''}&SortBy=${
        pars.SortBy ? pars.SortBy : ''
      }&SortingType=1&EventTypeId=${
        pars.SportId ? pars.SportId : ''
      }&HasInPlay=${pars.HasInPlay ? pars.HasInPlay : false}`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  getAllRegions(sportId: any,HasInPlay:any=null) {
    return this.http.get<any>(`${this.baseUrl}regions?EventTypeId=${sportId}&HasInPlay=${HasInPlay ? HasInPlay : false}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getRegionById(id: any) {
    return this.http.get<any>(`${this.baseUrl}regions/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateRegions(obj: any) {
    return this.http.put<any>(`${this.baseUrl}regions/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }
  
  toggleRegionActivation(obj: any) {
    return this.http.put<any>(`${this.baseUrl}regions/${obj.id}/active/toggle`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  //////////////////////////////////
  ////// Upcoming Controller //////
  ////////////////////////////////

  getUpcoming(pars: any) {

    return this.http.get<any>(
      `${this.baseUrl}upcoming/paged?RegionCode=${
        pars.RegionCode ? pars.RegionCode : ''
      }&CompetitionId=${pars.LeagueId ? pars.LeagueId : ''}&PageNo=${
        pars.PageNo ? pars.PageNo : ''
      }&PageSize=${pars.PageSize ? pars.PageSize : ''}&SortBy=OpenDate&SortingType=1&EventTypeId=${pars.sportId ? pars.sportId : ''}`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  getAllUpcoming(pars: any) {
    return this.http.get<any>(
      `${this.baseUrl}upcoming?RegionCode=${
        pars.RegionCode ? pars.RegionCode : ''
      }&CompetitionId=${pars.LeagueId ? pars.LeagueId : ''}&EventTypeId=${pars.sportId ? pars.sportId : ''}&SortBy=OpenDate`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  getUpcomingById(id: any) {
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

  loadLiveGames() {
    this.layoutService.closeMenuChilds();
    if (this.layoutService.isMainLoading()) {
      return;
    } else {
      this.layoutService.startMainLoading();
    }

    this.events.next([]);
    this.layoutService.displayLiveGames();

    this.getAllLive({})
      .pipe(finalize(() => this.layoutService.stopMainLoading()))
      .subscribe(
        (resp) => {
          this.layoutService.displayLiveGames();

            let sorted = resp.body/*.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null)*/.sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0)
            let result = sorted.reduce(function (r:any, a:any) {
              r[a.eventTypeId] = r[a.eventTypeId] || [];
              r[a.eventTypeId].push(a);
              return r;
            }, Object.create(null))

          // this.events.next(resp.body.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null).sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0));
          this.events.next(result);
          this.liveFeed.startLiveUpdate();
        },
        (error) => {
          this.events.next([]);
          // add error message here
        }
      );
  }

  handleLiveFeed(games: any) {
    if (this.layoutService.getHeaderValue() !== 'live') {
      return;
    }
    // this.events.next(games.filter((x:any)=>x.markets.length > 0));
    //x.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    
    let sorted = games/*.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null)*/.sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0)
    let result = sorted.reduce(function (r:any, a:any) {
      r[a.eventTypeId] = r[a.eventTypeId] || [];
      r[a.eventTypeId].push(a);
      return r;
    }, Object.create(null))


    // this.events.next(games.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null).sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0));
    this.events.next(result);
  }

  handleGameDetailFeed(game: any) {
    if (this.layoutService.getHeaderValue() !== 'details') {
      return;
    }
    this.eventDetails.next(game);
  }

  loadMarketsForGameLive(eventId: any, ignoreListen = false) {
    if (this.layoutService.isMainLoading()) {
      return;
    } else {
      this.layoutService.startMainLoading();
    }
    this.eventDetails.next([]);
    this.layoutService.displayGameDetails();

    this.getLIveById(eventId)
      .pipe(finalize(() => this.layoutService.stopMainLoading()))
      .subscribe(
        (resp) => {
          this.layoutService.displayGameDetails();
          this.eventDetails.next({ ...resp.body, isLive: true });
          if (!ignoreListen) {
            this.liveFeed.listenToEvent(eventId);
          }
        },
        (error) => {
          this.eventDetails.next([]);
          // add error message here
        }
      );
  }

  stopLiveEventListen() {
    this.liveFeed.removeEventListen();
  }

  ////// pre part

  loadPreGames(leagueId: any, regionId: string,sportId:string, paged=false) {
    if (this.layoutService.isMainLoading()) {
      return;
    }
    if (!this.layoutService.isMainLoading() && !paged) {
      this.layoutService.startMainLoading();
    }

    this.events.next([]);
    this.layoutService.displayPreGames();

    if(paged){
      this.loadPreGamesFromHeader(sportId);
    }
    else{
      this.getAllUpcoming({
        LeagueId: leagueId,
        RegionCode: regionId,
        sportId:sportId
      })
        .pipe(
          finalize(() => {
            this.layoutService.stopMainLoading();
            this.layoutService.stopMenuLoading();
          })
        )
        .subscribe(
          (resp) => {
  
            this.layoutService.displayPreGames();
            
  
            let sorted = resp.body/*.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null)*/.sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0)
            let result = sorted.reduce(function (r:any, a:any) {
              r[a.eventTypeId] = r[a.eventTypeId] || [];
              r[a.eventTypeId].push(a);
              return r;
            }, Object.create(null))
      
            // this.events.next(resp.body.filter((x:any)=>x.markets.length > 0));
            // this.events.next(resp.body.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null).sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0));
            this.events.next(result);
            
          },
          (error) => {
            this.events.next([]);
            // add error message here
          }
        );
    }
    
  }

  loadPreGamesFromHeader(sportId?:any) {
// return //uncomment here

this.layoutService.closeMenuChilds();
    if (this.layoutService.isMainLoading()) {
      return;
    } else {
      this.layoutService.startMainLoading();
    }

    this.events.next([]);
    this.layoutService.displayPreGames();
    if(!sportId || sportId == null || sportId =='')
    {
      sportId='1';
    }
    this.getUpcoming({
      PageNo: 1,
      PageSize: 15,
      SortBy: 'OpenDate',
      SortingType: 1,
      sportId:sportId
    })
      .pipe(
        finalize(
          () => {
            this.layoutService.stopMainLoading()
            }
          )
        )
      .subscribe(
        (resp) => {

          this.layoutService.displayPreGames();

          let sorted = resp.body.items/*.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null)*/.sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0)
          let result = sorted.reduce(function (r:any, a:any) {
            r[a.eventTypeId] = r[a.eventTypeId] || [];
            r[a.eventTypeId].push(a);
            return r;
          }, Object.create(null))

          // this.events.next(resp.body.items.filter((x:any)=>x.markets.length > 0));
          // this.events.next(resp.body.items.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null).sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0));          
          this.events.next(result);          
        },
        (error) => {
          this.events.next([]);
          // add error message here
        }
      );
  }

  loadMarketsForGamePre(eventId: any) {
    if (this.layoutService.isMainLoading()) {
      return;
    } else {
      this.layoutService.startMainLoading();
    }
    this.eventDetails.next([]);
    this.layoutService.displayGameDetails();

    this.getUpcomingById(eventId)
      .pipe(finalize(() => this.layoutService.stopMainLoading()))
      .subscribe(
        (resp) => {
          this.layoutService.displayGameDetails();

          this.eventDetails.next(resp.body);
        },
        (error) => {
          this.eventDetails.next([]);
          // add error message here
        }
      );
  }

  ////////////////////////////////////////

  performLogIn() {
    let loginURL = 'https://api.vebobet.com/';
    let model = {
      username: 'DiscTest',
      password: 'Disc123!',
    };

    this.login(model).subscribe(
      (resp) => {
        const user: any = resp.body;

        localStorage.setItem('token', user.token);
      },
      (error) => {}
    );
  }

  login(model: any) {
    let loginURL = 'https://api.vebobet.com/api/v1/auth/login';
    return this.http.post(loginURL, model, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }
































  /////////////////////// users ////////////////////////////



 getAllUsers(pars:any) {
      return this.http.get<any>( `${this.baseUrl}users?PageNo=${
        pars.PageNo ? pars.PageNo : ''
      }&PageSize=${pars.PageSize ? pars.PageSize : ''}&ParentId=${
        pars.parentId ? pars.parentId : ''
      }&Role=${pars.Role ? pars.Role : ''}`, {
        headers: this.httpOptions.headers,
      });
    }

    getUserById(id:string) {
      return this.http.get<any>(`${environment.apiUrl}users/${id}`, {
        headers: this.httpOptions.headers,
      });
    }

    updateUser(obj:any) {

      if(obj.commission){
        obj.commission /= 100.
      }
      return this.http.put(
        `${environment.apiUrl}users/${obj.id}`,
        obj,
        { headers: this.httpOptions.headers, observe: 'response' }
      );
    }

    addNewUser(obj:any) {
      if(obj.commission){
        obj.commission /= 100.
      }

      return this.http.post(`${environment.apiUrl}users`, obj, {
        headers: this.httpOptions.headers,
        observe: 'response',
      });
    }
  
    updatePassword(id:string , password:string) {
      return this.http.put(
        `${environment.apiUrl}users/${id}/password`,
        {newPassword:password},
        { headers: this.httpOptions.headers, observe: 'response' }
      );
    }
    
    updateMyPassword( obj:any) {
      return this.http.put(
        `${environment.apiUrl}users/me/password`,
        obj,
        { headers: this.httpOptions.headers, observe: 'response' }
      );
    }

    toggleUserActive(id:string) {
      return this.http.post(`${environment.apiUrl}users/${id}/active/toggle`, {}, {
        headers: this.httpOptions.headers,
        observe: 'response',
      });
    }

    changeUserRisk(id:string, newRisk:number) {
      return this.http.post(`${environment.apiUrl}users/${id}/risk`, {newRisk:newRisk}, {
        headers: this.httpOptions.headers,
        observe: 'response',
      });
    }
    
    depositUser( obj:any) {
      return this.http.post(`${environment.apiUrl}users/${obj.toUserId}/deposit`, obj, {
        headers: this.httpOptions.headers,
        observe: 'response',
      });
    }

    withdrawUser( obj:any) {
      return this.http.post(`${environment.apiUrl}users/${obj.toUserId}/withdraw`, obj, {
        headers: this.httpOptions.headers,
        observe: 'response',
      });
    }
    
    exchangeUser( obj:any) {
      return this.http.post(`${environment.apiUrl}users/exchange`, obj, {
        headers: this.httpOptions.headers,
        observe: 'response',
      });
    }





    /**
     * Convert query object to query string representation
     * @param obj Query object
     * @returns Query string representation of obj
     */
    convertObjectToQueryString(obj: any){
      let query = "?";
      for (const [key, value] of Object.entries(obj)) {

        if(value === '' || value === null){
          continue;
        }
        query += query[query.length - 1] === '?' ? `${key}=${value}` : `&${key}=${value}`;
      }
      if (query === "?") return "";
      return query;
    }
}
