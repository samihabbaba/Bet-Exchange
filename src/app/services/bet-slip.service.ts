import { HttpClient } from '@angular/common/http';
import { DebugElement, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BetSlip } from '../models/bet-slip';
import { DataService } from './data.service';
import { SharedFunctionsService } from './shared-functions.service';
import { SignalRNotificationsService } from './signal-r-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class BetSlipService {
  selectedBets: BetSlip[] = [];
  currentOpenBets: any[] = [];
  minStakeForBet = 1;
  // currentOpenTab = 'Singles'

  openTab = new BehaviorSubject<any>('Singles');
  currentOpenTab = this.openTab.asObservable();

  openBetsToView: any[] = [];
  openBetsToViewMatched: any[] = [];
  openBetsToViewUnmatched: any[] = [];
  openBetsToViewPartiallyMatched: any[] = [];

  openBetsSelectOptions: any[] = ['', ''];
  selectedOpenBet: any = '';

  constructor(
    private http: HttpClient,
    private notiSignalR: SignalRNotificationsService,
    private sharedService: SharedFunctionsService,
    private dataService: DataService
  ) {
    this.notiSignalR.notification.subscribe((noti) => {
      if (!noti) {
        return;
      }

      //bet id should be in .message or .payload (not sure)
      else if (noti.type == 'BET_MATCHED') {
        if (this.currentOpenBets.some((x) => x.id == noti.payload)) {
          let index = this.currentOpenBets.findIndex(
            (x) => x.id == noti.payload
          );
          if (index > -1) {
            this.currentOpenBets[index].status = 'PENDING';
            this.updateOpenBets();
          }
        }
        this.loadTopMarketBets(this.latestTopMarketId);
      } else if (noti.type == 'BET_EXPIRED' || noti.type == 'EXPIRED') {
        if (this.currentOpenBets.some((x) => x.id == noti.payload)) {
          let index = this.currentOpenBets.findIndex(
            (x) => x.id == noti.payload
          );
          if (index > -1) {
            this.currentOpenBets.splice(index, 1);
            this.updateOpenBets();
          }
        }
        this.loadTopMarketBets(this.latestTopMarketId);
      }
    });

    this.notiSignalR.betUpdate.subscribe((bet) => {
      if (!bet) {
        return;
      }

      // 'MATCHED'
      // 'UNMATCHED'
      // 'PARTIALLY_MATCHED'
      if (bet.status == 'BET_EXPIRED' || bet.status == 'EXPIRED') {
        if (this.currentOpenBets.some((x) => x.id == bet.id)) {
          let index = this.currentOpenBets.findIndex((x) => x.id == bet.id);
          if (index > -1) {
            this.currentOpenBets.splice(index, 1);
            this.updateOpenBets();
          }
        }
        // this.loadTopMarketBets(this.latestTopMarketId);
      } else if (this.currentOpenBets.some((x) => x.id == bet.id)) {
        let index = this.currentOpenBets.findIndex((x) => x.id == bet.id);
        if (index > -1) {
          this.currentOpenBets[index].status = bet.status;
          this.currentOpenBets[index].stake = bet.stake;
          this.currentOpenBets[index].liability = bet.liability;
          this.currentOpenBets[index].payout = bet.payout;
          this.currentOpenBets[index].net = bet.net;
          this.updateOpenBets();
        }
      }
      this.loadTopMarketBets(this.latestTopMarketId);
    });
  }

  pushToSelectedBets(
    event: any,
    isBack = false,
    market?: any,
    runners?: any,
    run?: any
  ) {
    // debugger

    this.openTab.next('Singles');

    if (
      !this.validOdd(market, runners, run) ||
      !this.sharedService.marketAvailable(market)
    ) {
      return;
    }

    let selection = {
      isBack: isBack,
      eventName: this.sharedService.returnEventName(event.name),
      eventId: event.id,
      liability: 0,
      market: {
        marketName: market.name,
        marketId: market.id,
        run: {
          runnerName:
            runners.name +
            ' ' +
            this.returnSecondPartRunName(runners, market.name),
          price: run.price,
          size: run.size,
          selectionId: runners.selectionId,
        },
      },
    };

    let lastPrice = -1;
    let lastSize = -1;
    // if (run?.price) {
    let index = this.selectedBets.findIndex(
      (x) =>
        String(x.eventId) == String(event.id) &&
        x.isBack == isBack &&
        String(x.market.marketId) == String(market.id) &&
        String(x.market.run.selectionId) == String(runners.selectionId) &&
        x.market.run.runnerName ==
          runners.name +
            ' ' +
            this.returnSecondPartRunName(runners, market.name)
    );
    if (index > -1) {
      lastPrice = this.selectedBets[index].market.run.price;
      lastSize = this.selectedBets[index].market.run.size;
      this.selectedBets.splice(index, 1);
    }

    if (
      (lastPrice > -1 || lastSize > -1) &&
      selection.market.run.price == lastPrice &&
      selection.market.run.size == lastSize
    ) {
      // do nothing
    } else {
      if (!selection.isBack) {
        this.selectedBets.push(selection);
      } else {
        let i = this.selectedBets.findIndex((x) => !x.isBack);
        i === -1
          ? this.selectedBets.push(selection)
          : this.selectedBets.splice(i, 0, selection);
      }
    }
  }

  checkIfBetIsSelected(
    eventId: string,
    marketId: string,
    selectionId: string,
    isBack = false,
    runName?: any
  ) {
    return this.selectedBets.some(
      (x) =>
        x.market.run.selectionId === selectionId &&
        x.isBack === isBack &&
        x.market.marketId === marketId &&
        x.eventId === eventId &&
        (runName ? x.market.run.runnerName == runName : true)
    );
  }

  returnSecondPartRunName(run: any, marketName: string): any {
    let showSign = marketName.toLowerCase().includes('handicap');

    if (run.handicap) {
      let num = +run.handicap;
      if (num.toString().includes('.75') || num.toString().includes('.25')) {
        if (!num.toString().includes('-') && showSign) {
          return '+' + (num - 0.25) + ' & ' + '+' + (num + 0.25);
        } else {
          return num - 0.25 + ' & ' + (num + 0.25);
        }
      } else {
        return num;
      }
    } else {
      return '';
    }
  }

  calculateSingleLiability(run: BetSlip) {
    if (run.isBack) {
      return run.stake ? run.stake : 0;
    } else {
      return run.stake ? run.stake * (run.market.run.price - 1) : 0;
    }
  }

  calculateAllLiability() {
    let backBets = this.selectedBets.filter((x) => x.isBack);
    let LayBets = this.selectedBets.filter((x) => !x.isBack);

    let backLia = backBets.reduce((backLia, b) => backLia + b.liability, 0);
    let LayLia = LayBets.reduce((LayLia, b) => LayLia + b.liability, 0);

    // get lay liability with highest value
    // let LayLia = 0;
    // if(LayBets.length > 0){
    // LayLia = LayBets.reduce((a, b) => a.liability > b.liability? a:b).liability;
    // }

    return LayLia + backLia;
  }

  validOdd(market: any, runners: any, run: any) {
    if (!run || !run.price || !run.size || run.price == '' || run.size == '') {
      return false;
    }

    return true;
  }

  pickAllTopMarketsOdds(event: any, market: any, isBack = true) {
    // event: any,
    // isBack = false,
    // market?: any,
    // runners?: any,
    // run?: any

    let f = false;
    for (let i = 0; i < market.runners.length; i++) {
      try {
        if (isBack) {
          let run = market.runners[i].exchangePrices.availableToBack[0];
          this.pushToSelectedBets(
            event,
            isBack,
            market,
            market.runners[i],
            run
          );
        } else {
          let run = market.runners[i].exchangePrices.availableToLay[0];
          this.pushToSelectedBets(
            event,
            isBack,
            market,
            market.runners[i],
            run
          );
        }
      } catch (ex) {
        continue;
      }
    }
  }

  clearMatchedBets() {
    this.currentOpenBets = this.currentOpenBets.filter(
      (x) => x.status == 'UNMATCHED' || x.status == 'PARTIALLY_MATCHED'
    );
    this.updateOpenBetsOptions();
  }

  updateOpenBets(event?: any, val = 0) {
    this.openBetsToView = this.currentOpenBets
      .filter((x) => x.selection.eventName === this.selectedOpenBet)
      .sort((a: any, b: any) =>
        a.selection.betType < b.selection.betType
          ? -1
          : a.selection.betType > b.selection.betType
          ? 1
          : 0
      );
    this.openBetsToViewUnmatched = this.currentOpenBets
      .filter(
        (x) =>
          x.selection.eventName === this.selectedOpenBet &&
          x.status == 'UNMATCHED'
      )
      .sort((a: any, b: any) =>
        a.selection.betType < b.selection.betType
          ? -1
          : a.selection.betType > b.selection.betType
          ? 1
          : 0
      );
    this.openBetsToViewMatched = this.currentOpenBets
      .filter(
        (x) =>
          x.selection.eventName === this.selectedOpenBet &&
          x.status == 'PENDING'
      )
      .sort((a: any, b: any) =>
        a.selection.betType < b.selection.betType
          ? -1
          : a.selection.betType > b.selection.betType
          ? 1
          : 0
      );
    this.openBetsToViewPartiallyMatched = this.currentOpenBets
      .filter(
        (x) =>
          x.selection.eventName === this.selectedOpenBet &&
          x.status == 'PARTIALLY_MATCHED'
      )
      .sort((a: any, b: any) =>
        a.selection.betType < b.selection.betType
          ? -1
          : a.selection.betType > b.selection.betType
          ? 1
          : 0
      );

    if (val != 2) {
      this.updateOpenBetsOptions(true, ++val);
    }
  }

  updateOpenBetsOptions(keepEvent = false, val = 0) {
    this.openBetsSelectOptions = this.currentOpenBets.map(function (i) {
      return i.selection.eventName;
    });

    this.openBetsSelectOptions = [...new Set(this.openBetsSelectOptions)];
    if (
      keepEvent &&
      this.openBetsSelectOptions.some((x) => x == this.selectedOpenBet)
    ) {
    } else {
      if (this.openBetsSelectOptions.length > 0) {
        this.selectedOpenBet = this.openBetsSelectOptions[0];
      } else {
        this.selectedOpenBet = '';
      }
    }

    if (val != 2) {
      this.updateOpenBets(null, ++val);
    }
  }

  cancelAllOpenBetsForEventId(betIds: any) {
    // this.currentOpenBets = this.currentOpenBets.filter(x=> x.selection.eventId !== eventId || (x.selection.eventId === eventId && x.status === 'PENDING') )
    this.currentOpenBets = this.currentOpenBets.filter(
      (x) => !betIds.some((y: any) => y == x.id)
    );
    this.updateOpenBetsOptions(true);
  }

  cancelOpenBetById(id: string) {
    this.currentOpenBets = this.currentOpenBets.filter((x) => x.id !== id);
    this.updateOpenBetsOptions(true);
  }

  betsForMarket: any = [];
  latestTopMarketId = '';
  loadTopMarketBets(marketId: any) {
    if (marketId == '') {
      return;
    }
    this.latestTopMarketId = marketId;
    // add bet to the array if came as matched from signalR or on bet place
    // maybe just make an obs variable and trigger it when ever it's needed to reload it
    this.dataService
      .getBets(
        1,
        5000,
        '',
        '',
        '',
        marketId,
        '',
        '',
        '',
        '',
        '',
        false,
        '',
        'Pending',
        '',
        ''
      )
      .subscribe(
        (resp) => {
          this.betsForMarket = resp.body.items;
        },
        (erorr) => {
          this.betsForMarket = [];
        }
      );
  }

  getRunMoney(
    marketId: any,
    marketName: any,
    selectionId: any,
    selectionName: any,
    selectionHandicap: any
  ) {

    // maybe take run name also ?

    if (
      this.betsForMarket.length == 0 ||
      this.betsForMarket[0].selection.marketId !== marketId
    ) {
      return 0;
    }
    // how much each run will cost, either as winning money or losing
    // get all events for the user with the needed market id
    // take only the pending bets - no unmatched or settled
    // debugger 
    let runBack = this.betsForMarket.filter(
      (x: any) =>
        x.selection.selectionId == selectionId &&
        x.selection.betType == 'BACK' &&
        x.selection.fullSelectionName.trim() ==
          (
            selectionName +
            ' ' +
            this.returnSecondPartRunName(
              { handicap: selectionHandicap },
              marketName
            )
          ).trim()
    );
    let runLay = this.betsForMarket.filter(
      (x: any) =>
        x.selection.selectionId == selectionId &&
        x.selection.betType == 'LAY' &&
        x.selection.fullSelectionName.trim() ==
          (
            selectionName +
            ' ' +
            this.returnSecondPartRunName(
              { handicap: selectionHandicap },
              marketName
            )
          ).trim()
    );
    let notRunBack = this.betsForMarket.filter(
      (x: any) =>
        (x.selection.selectionId != selectionId ||
          x.selection.fullSelectionName.trim() !==
            (
              selectionName +
              ' ' +
              this.returnSecondPartRunName(
                { handicap: selectionHandicap },
                marketName
              )
            ).trim()) &&
        x.selection.betType == 'BACK'
    );
    let notRunLay = this.betsForMarket.filter(
      (x: any) =>
        (x.selection.selectionId != selectionId ||
          x.selection.fullSelectionName.trim() !==
            (
              selectionName +
              ' ' +
              this.returnSecondPartRunName(
                { handicap: selectionHandicap },
                marketName
              )
            ).trim()) &&
        x.selection.betType == 'LAY'
    );

    let runBackProfit = runBack.reduce(
      (runBackProfit: any, b: any) => runBackProfit + (b.payout - b.stake),
      0
    );
    let runLayLiability = runLay.reduce(
      (runLayLiability: any, b: any) => runLayLiability + (b.odd - 1) * b.stake,
      0
    );
    let notRunBackStake = notRunBack.reduce(
      (notRunBackStake: any, b: any) => notRunBackStake + b.stake,
      0
    );
    let notRunLayStake = notRunLay.reduce(
      (notRunLayStake: any, b: any) => notRunLayStake + b.stake,
      0
    );

    //calculate the winning money (stake + profit/liability) for the bets with runner id --> minus liability of the others

    let num =
      runBackProfit - runLayLiability + (notRunLayStake - notRunBackStake);
    // return this.sharedService.formatNumber(num)
    return num;

    // return (runBackProfit - runLayLiability) + (notRunLayStake - notRunBackStake);
  }

  getPendingRunMoney(
    marketId: any,
    marketName: any,
    selectionId: any,
    selectionName: any,
    selectionHandicap: any
  ) {
    // debugger
    let normalMoney = this.getRunMoney(
      marketId,
      marketName,
      selectionId,
      selectionName,
      selectionHandicap
    );

    let marketBets = this.selectedBets.filter(
      (x) =>
        x.market.marketId == marketId &&
        x.stake !== undefined &&
        x.stake !== 0 &&
        x.stake !== null
    );
    // let marketBetss = this.selectedBets.filter(x=> (x.stake - x.market.run.price));

    let runBack = marketBets.filter(
      (x: any) =>
        x.market.run.selectionId == selectionId &&
        x.isBack &&
        x.market.run.runnerName.trim() ===
          (
            selectionName +
            ' ' +
            this.returnSecondPartRunName(
              { handicap: selectionHandicap },
              marketName
            )
          ).trim()
    );
    let runLay = marketBets.filter(
      (x: any) =>
        x.market.run.selectionId == selectionId &&
        !x.isBack &&
        x.market.run.runnerName.trim() ===
          (
            selectionName +
            ' ' +
            this.returnSecondPartRunName(
              { handicap: selectionHandicap },
              marketName
            )
          ).trim()
    );
    let notRunBack = marketBets.filter(
      (x: any) =>
        (x.market.run.selectionId != selectionId ||
          x.market.run.runnerName.trim() !==
            (
              selectionName +
              ' ' +
              this.returnSecondPartRunName(
                { handicap: selectionHandicap },
                marketName
              )
            ).trim()) &&
        x.isBack
    );
    let notRunLay = marketBets.filter(
      (x: any) =>
        (x.market.run.selectionId != selectionId ||
          x.market.run.runnerName.trim() !==
            (
              selectionName +
              ' ' +
              this.returnSecondPartRunName(
                { handicap: selectionHandicap },
                marketName
              )
            ).trim()) &&
        !x.isBack
    );

    let runBackProfit = runBack.reduce(
      (runBackProfit: any, b: any) =>
        runBackProfit + (b.stake * b.market.run.price - b.stake),
      0
    );
    let runLayLiability = runLay.reduce(
      (runLayLiability: any, b: any) =>
        runLayLiability + (b.market.run.price - 1) * b.stake,
      0
    );
    let notRunBackStake = notRunBack.reduce(
      (notRunBackStake: any, b: any) => notRunBackStake + b.stake,
      0
    );
    let notRunLayStake = notRunLay.reduce(
      (notRunLayStake: any, b: any) => notRunLayStake + b.stake,
      0
    );

    let num =
      runBackProfit - runLayLiability + (notRunLayStake - notRunBackStake);
    num += +normalMoney;

    // return this.sharedService.formatNumber(num)
    return num;
  }

  showPendingRunMoney(marketId: any) {
    return this.selectedBets.some(
      (x) =>
        x.market.marketId == marketId &&
        x.stake !== undefined &&
        x.stake !== 0 &&
        x.stake !== null
    );
  }

  returnBetsProfit(bet: any, usePartial = false) {
    let payout = bet.fullPayout;
    let stake = bet.fullStake;

    if (usePartial) {
      payout = bet.payout;
      stake = bet.stake;
    }

    if (bet.selection.betType == 'BACK') {
      return payout - stake;
    } else if (bet.selection.betType == 'LAY') {
      return stake;
    } else {
      return -1;
    }
  }

  handleTabClick(value: string) {
    this.openTab.next(value);
  }

  ///////////////// API requests ////////////////////////

  // login(model: any) {
  //   let loginURL = 'https://api.vebobet.com/api/v1/auth/login';
  //   return this.http.post(loginURL, model, {
  //     headers: this.httpOptions.headers,
  //     observe: 'response',
  //   });
  // }
}
