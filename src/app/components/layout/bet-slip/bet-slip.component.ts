import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BetSlipService } from 'src/app/services/bet-slip.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';
import { NotificationService } from 'src/app/services/notification.service';
import { finalize } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationMessageComponent } from 'src/app/shared/confirmation-message/confirmation-message.component';
import { BetDetailsComponent } from 'src/app/shared/bet-details/bet-details.component';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.css'],
})
export class BetSlipComponent implements OnInit {
  tabToDisplay: any = 'Singles';
  @ViewChild('singles') singlesTab?: ElementRef;
  @ViewChild('openBets') openBetsTab?: ElementRef;
  @ViewChild('loaderWrapper') loaderWrapper?: ElementRef;
  @ViewChild('loader') loader?: ElementRef;

  constructor(
    public betSlipService: BetSlipService,
    public dataService: DataService,
    private authService: AuthService,
    public sharedFunctionsService: SharedFunctionsService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.betSlipService.currentOpenTab.subscribe((val) => {
      this.tabToDisplay = val;
    });
  }

  stakeOptions = [10, 20, 50, 100, 200, 500];

  ngOnInit(): void {}

  fontAwesomeIcons = {
    exit: faTimes,
  };

  resetBets() {
    this.betSlipService.selectedBets = [];
  }

  submitBets() {
    // console.log(this.betSlipService.selectedBets);
    this.startLoading();
    let betsToSend: any = [];
    this.betSlipService.selectedBets.forEach((bet) => {
      betsToSend.push({
        stake: bet.stake,
        odd: bet.market.run.price,
        marketId: bet.market.marketId,
        selectionId: bet.market.run.selectionId,
        betType: bet.isBack ? 'BACK' : 'LAY',
      });
    });

    this.dataService
      .submitBets(betsToSend)
      .pipe(finalize(() => this.stopLoading()))
      .subscribe(
        async (resp: any) => {
          // debugger
          this.authService.updateCurrentBalance();

          if (resp.body.length > 0 && resp.body[0] !== null) {
            let g = resp.body[0].user.wallet.balance;
            this.authService.currentUserInfo.balance =
              resp.body[0].user.wallet.balance;
          }

          this.betSlipService.selectedBets = [];
          let newOpenBet = '';
          resp.body.successfulBets.forEach((bet: any) => {
            this.betSlipService.currentOpenBets.push(bet);
            newOpenBet = bet.selection.eventName;
          });

          let errorDisplayed = false;
          resp.body.errors.forEach((error: any) => {
            errorDisplayed = true;
            this.sharedFunctionsService.showErrorMsg(
              {
                error: { errorMessage: error },
              },
              'Error while adding Some Bet(s)!'
            );
          });

          if (
            this.betSlipService.currentOpenBets.some(
              (x) => x.selection.eventName === newOpenBet
            ) &&
            newOpenBet !== ''
          ) {
            this.betSlipService.selectedOpenBet = newOpenBet;
          }
          this.betSlipService.updateOpenBetsOptions(true);
          this.betSlipService.loadTopMarketBets(
            this.betSlipService.latestTopMarketId
          );

          this.betSlipService.handleTabClick('Open');

          if (resp.body.successfulBets.length > 0) {
            if (errorDisplayed) {
              await this.sharedFunctionsService.delay(2000);
            }
            this.notificationService.success('Bet(s) added successfully!');
          }
        },
        (error) => {
          this.sharedFunctionsService.showErrorMsg(
            error,
            'Error while adding Bet(s)!'
          );
          // try {
          //   let msg = error.error.fields[Object.keys(error.error.fields)[0]];

          //   if (msg !== undefined) {
          //     this.notificationService.error(msg);
          //   }
          //   else {
          //     let msg = error.error;
          //     if (msg !== undefined && msg) {
          //       this.notificationService.error(msg);
          //     } else {
          //       this.notificationService.error('Error while adding Bet(s)!');
          //     }
          //   }
          // } catch (ex) {
          //   try {
          //     let msg = error.error;
          //     if (msg !== undefined && msg) {
          //       this.notificationService.error(msg);
          //     } else {
          //       this.notificationService.error('Error while adding Bet(s)!');
          //     }
          //   } catch (exx) {
          //     this.notificationService.error('Error while adding Bet(s)!');
          //   }
          // }
        }
      );
  }

  removeFromSelectedBets(betIndex: number) {
    this.betSlipService.selectedBets.splice(betIndex, 1);
  }

  handleTabClick(event: any) {
    // not used --> replaced with the one in bet-slip service
    let text = event.target.textContent;
    console.log(text);
    text = text.trim();
    text = text.split(' ')[0];
    if (text !== this.tabToDisplay) {
      this.singlesTab?.nativeElement.classList.remove('active');
      this.openBetsTab?.nativeElement.classList.remove('active');
      text == 'Singles'
        ? this.singlesTab?.nativeElement.classList.add('active')
        : this.openBetsTab?.nativeElement.classList.add('active');

      this.tabToDisplay = text;
    }
  }

  setStakeForBet(bet: any, stake: number) {
    bet.stake = stake;
    this.setLiabilityForBet(bet);
  }

  setLiabilityForBet(bet: any) {
    bet.liability = this.betSlipService.calculateSingleLiability(bet);
  }

  startLoading() {
    this.loaderWrapper?.nativeElement.classList.add('loader-wrapper');
    this.loader?.nativeElement.classList.add('loader');
  }

  stopLoading() {
    this.loaderWrapper?.nativeElement.classList.remove('loader-wrapper');
    this.loader?.nativeElement.classList.remove('loader');
  }

  disableSlipSubmit() {
    if (this.betSlipService.selectedBets.length < 1) {
      return true;
    }

    if (
      this.betSlipService.selectedBets.some(
        (x) =>
          x.stake == undefined ||
          x.stake == null ||
          x.stake < this.betSlipService.minStakeForBet
      )
    ) {
      return true;
    }

    let hh = this.betSlipService.selectedBets[0].market.run.price;
    if (
      this.betSlipService.selectedBets.some(
        (x) =>
          x.market.run.price == undefined ||
          x.market.run.price == null ||
          x.market.run.price < 1.01
      )
    ) {
      return true;
    }

    return false;
  }

  openConfirmDialog(obj: any, functionToCall: number) {
    let confirmMsg = '';
    let successMsg = '';
    let errorMsg = '';
    let id = '';
    if (functionToCall == 5) {
      confirmMsg = 'Are You Sure You want to cancel the bet ?';
      successMsg = 'Bet canceled';
      errorMsg = 'Error on bet update';
    }

    if (functionToCall == 6) {
      let index = this.betSlipService.currentOpenBets.findIndex(
        (x) => x.selection.eventName === this.betSlipService.selectedOpenBet
      );
      if (index < 0) {
        this.notificationService.error('Error canceling the requested event');
        return;
      } else {
        obj.id = this.betSlipService.currentOpenBets[index].selection.eventId;
      }
      confirmMsg =
        'Are You Sure You want to cancel all unmatched bets for this event?';
      successMsg = 'Bets canceled';
      errorMsg = 'Error on bets update';
    }

    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      data: {
        obj: obj,
        functionToCall: functionToCall,
        confirmMsg: confirmMsg,
        successMsg: successMsg,
        errorMsg: errorMsg,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (functionToCall == 5) {
        // this.betSlipService.updateOpenBets();
      } else if (functionToCall == 6) {
        // this.betSlipService.updateOpenBetsOptions();
      }
      this.authService.updateCurrentBalance();
    });
  }

  openBetDetail(obj: any) {
    const dialogRef = this.dialog.open(BetDetailsComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
