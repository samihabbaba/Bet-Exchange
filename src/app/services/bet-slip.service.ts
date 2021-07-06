import { Injectable } from '@angular/core';
import { BetSlip } from '../models/bet-slip';

@Injectable({
  providedIn: 'root',
})
export class BetSlipService {
  selectedBets: any[] = ['s', '2'];
  currentOpenBets: any[] = [];

  constructor() {}

  pushToSelectedBets(eventName: any, isBack = false) {
    console.log(eventName);
    isBack ? console.log('Im Back') : console.log('Im Lay');
  }
}
