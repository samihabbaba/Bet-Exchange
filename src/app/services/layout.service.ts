import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  mainContentDisplayType = new BehaviorSubject<string>('pre');
  MainLoading = new BehaviorSubject<boolean>(false);

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

  isMainLoading(){
    return this.MainLoading.value;
  }

  startMainLoading(){
    this.MainLoading.next(true);
  }

  stopMainLoading(){
    this.MainLoading.next(false);
  }

}
