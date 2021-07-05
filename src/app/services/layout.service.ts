import { Injectable } from '@angular/core';
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

  constructor() {}

  displayPreGames() {
    this.mainContentDisplayType.next('pre');
  }

  displayLiveGames() {
    this.mainContentDisplayType.next('live');
  }

  displayGameDetails() {
    this.mainContentDisplayType.next('details');
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


}
