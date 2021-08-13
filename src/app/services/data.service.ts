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


  submitBets(bets:any){        
     return this.http.post(`${environment.apiUrl}bets`, bets, {
       headers: this.httpOptions.headers,
       observe: "response",
     });
  }
    

  getSports() {
    return this.http.get<any>(`${this.baseUrl}sports`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  /////////////////////////////////////
  ////// BettingRules Controller //////
  ////////////////////////////////////

  // GET​/bettingrules
  getBettingRules(pars: any) {
    return this.http.get<any>(
      `${this.baseUrl}bettingrules?PageNo=${
        pars.PageNo ? pars.PageNo : ''
      }&PageSize=${pars.PageSize ? pars.PageSize : ''}&SortBy=${
        pars.SortBy ? pars.SortBy : ''
      }&SortingType=1`,
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
      }&EventTypeId=${pars.SportId ? pars.SportId : ''}`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  // GET​/leagues
  getAllLeagues(sportId:string,regionCode: string) {
    return this.http.get<any>(
      `${this.baseUrl}leagues?EventTypeId=${sportId ? sportId : ''}&regionCode=${regionCode ? regionCode : ''}`,
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
      }&SortBy=${pars.SortBy ? pars.SortBy : ''}&SortingType=1`,
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
      }`,
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
      }`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  getAllRegions(sportId: number) {
    return this.http.get<any>(`${this.baseUrl}regions?EventTypeId=${sportId}`, {
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

  //////////////////////////////////
  ////// Upcoming Controller //////
  ////////////////////////////////

  getUpcoming(pars: any) {
    return this.http.get<any>(
      `${this.baseUrl}upcoming/paged?RegionCode=${
        pars.RegionCode ? pars.RegionCode : ''
      }&CompetitionId=${pars.LeagueId ? pars.LeagueId : ''}&PageNo=${
        pars.PageNo ? pars.PageNo : ''
      }&PageSize=${pars.PageSize ? pars.PageSize : ''}&SortBy=${
        pars.SortBy ? pars.SortBy : ''
      }&SortingType=1&EventTypeId=${pars.sportId ? pars.sportId : ''}`,
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
      }&CompetitionId=${pars.LeagueId ? pars.LeagueId : ''}&EventTypeId=${pars.sportId ? pars.sportId : ''}`,
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

            let sorted = resp.body.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null).sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0)
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
    
    let sorted = games.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null).sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0)
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

  loadPreGames(leagueId: number, regionId: string,sportId:string) {
    if (this.layoutService.isMainLoading()) {
      return;
    }
    if (!this.layoutService.isMainLoading()) {
      this.layoutService.startMainLoading();
    }
    if (this.layoutService.isMenuLoading()) {
      return;
    }
    if (!this.layoutService.isMenuLoading()) {
      this.layoutService.startMenuLoading();
    }

    this.events.next([]);
    this.layoutService.displayPreGames();

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
          

          let sorted = resp.body.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null).sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0)
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

  loadPreGamesFromHeader(sportId?:any) {
return //uncomment here
    this.layoutService.closeMenuChilds();
    if (this.layoutService.isMainLoading()) {
      return;
    } else {
      this.layoutService.startMainLoading();
    }

    this.events.next([]);
    this.layoutService.displayPreGames();
    sportId='1';
    this.getUpcoming({
      PageNo: 1,
      PageSize: 15,
      SortBy: 'OpenDate',
      SortingType: 1,
      sportId:sportId
    })
      .pipe(finalize(() => this.layoutService.stopMainLoading()))
      .subscribe(
        (resp) => {
          console.log(resp.body.items.filter((x:any)=>x.markets.length > 0))
          this.layoutService.displayPreGames();

          let sorted = resp.body.items.filter((x:any)=>x.markets.length > 0 && x.markets[0] !== null).sort((a:any, b:any) => a.eventTypeId < b.eventTypeId ? -1 : a.eventTypeId > b.eventTypeId ? 1 : 0)
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
}
