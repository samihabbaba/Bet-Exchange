import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BetSlipService {
  selectedBets: any[] = ['s' , '2'];
  currentOpenBets: any[] = [];

  constructor() {}

  pushToSelectedBet(amount: any, event: any) {

  }
}
