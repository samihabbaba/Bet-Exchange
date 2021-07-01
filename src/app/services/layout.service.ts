import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  mainContentDisplayType = new BehaviorSubject<string>('pre');

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
}
