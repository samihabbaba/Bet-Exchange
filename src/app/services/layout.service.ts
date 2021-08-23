import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  mainContentDisplayType = new BehaviorSubject<string>('pre');
  MainLoading = new BehaviorSubject<boolean>(false);
  menuLoading = new BehaviorSubject<boolean>(false);
  closeMenuChild = new BehaviorSubject<string>('');

  currentSport = new BehaviorSubject<any>(null);
  currentRegion = new BehaviorSubject<any>(null);
  currentLeague = new BehaviorSubject<any>(null);

  constructor(private router:Router) {}

  displayPreGames() {
    if(this.isItInRoute('profile')){
      this.router.navigate(['/home']);
    }
    this.mainContentDisplayType.next('pre');
  }

  displayLiveGames() {
    if(this.isItInRoute('profile')){
      this.router.navigate(['/home']);
    }
    this.mainContentDisplayType.next('live');
  }

  displayGameDetails() {
    this.mainContentDisplayType.next('details');
  }
  
  displayOther() {
    if(!this.isItInRoute('profile')){
      this.router.navigate(['/profile']);
    }

    this.mainContentDisplayType.next('other');
  }

  getHeaderValue() {
    return this.mainContentDisplayType.value;
  }

  isMainLoading() {
    return this.MainLoading.value;
  }

  startMainLoading() {
    this.MainLoading.next(true);
  }

  stopMainLoading() {
    this.MainLoading.next(false);
  }

  isMenuLoading() {
    return this.menuLoading.value;
  }

  startMenuLoading() {
    this.menuLoading.next(true);
  }

  stopMenuLoading() {
    this.menuLoading.next(false);
  }

  closeMenuChilds() {
    this.closeMenuChild.next('close');
  }





  getCurrentSport(){
    return this.currentSport.value;
  }
  getCurrentRegion(){
    return this.currentRegion.value;
  }
  getCurrentLeague(){
    return this.currentLeague.value;
  }

  isItInRoute(route:string){
    debugger;
    let url = this.router.url;
    return url == '/profile';
  }


}
