import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  
  /////////////////////////////////////
  ////// BettingRules Controller //////
  ////////////////////////////////////

  // GET​/bettingrules
  getBettingRules(pars:any){
    return this.http.get<any>(`${this.baseUrl}bettingrules?PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}`,  {
      headers: this.httpOptions.headers,
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
    return this.http.get<any>(`${this.baseUrl}leagues​?PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}`,  {
      headers: this.httpOptions.headers,
    });
  }

  // GET​/leagues
  getAllLeagues​(){
    return this.http.get<any>(`${this.baseUrl}leagues​/all`,  {
      headers: this.httpOptions.headers,
    });
  }

  getLeagueById(id:any){
    return this.http.get<any>(`${this.baseUrl}leagues​/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateLeague(obj:any){
    return this.http.put<any>(`${this.baseUrl}leagues​/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }



  //////////////////////////////
  ////// Live Controller //////
  /////////////////////////////

  getLive​(pars:any){
    return this.http.get<any>(`${this.baseUrl}live?CountryCode=${pars.CountryCode?pars.CountryCode:''}&CompetitionId=${pars.CompetitionId?pars.CompetitionId:''}&IncludeDisabled=${pars.IncludeDisabled?pars.IncludeDisabled:''}&PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}`,  {
      headers: this.httpOptions.headers,
    });
  }

  getAllLive​(pars:any){
    return this.http.get<any>(`${this.baseUrl}live?CountryCode=${pars.CountryCode?pars.CountryCode:''}&CompetitionId=${pars.CompetitionId?pars.CompetitionId:''}&IncludeDisabled=${pars.IncludeDisabled?pars.IncludeDisabled:''}`,  {
      headers: this.httpOptions.headers,
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
    return this.http.get<any>(`${this.baseUrl}/regions?PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}`,  {
      headers: this.httpOptions.headers,
    });
  }

  getAllRegions​​(){
    return this.http.get<any>(`${this.baseUrl}/regions/all`,  {
      headers: this.httpOptions.headers,
    });
  }

  getRegionById(id:any){
    return this.http.get<any>(`${this.baseUrl}/regions/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateRegions(obj:any){
    return this.http.put<any>(`${this.baseUrl}/regions/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }



  //////////////////////////////////
  ////// Upcoming Controller //////
  ////////////////////////////////

  getUpcoming(pars:any){
    return this.http.get<any>(`${this.baseUrl}//upcoming?PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}`,  {
      headers: this.httpOptions.headers,
    });
  }

  getAllUpcoming​​(){
    return this.http.get<any>(`${this.baseUrl}//upcoming/all`,  {
      headers: this.httpOptions.headers,
    });
  }

  getUpcomingById(id:any){
    return this.http.get<any>(`${this.baseUrl}//upcoming/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }



}

