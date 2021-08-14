import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BetSlipService } from 'src/app/services/bet-slip.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';
import { NotificationService } from 'src/app/services/notification.service';
import { finalize } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.css'],
})
export class BetSlipComponent implements OnInit {
  openBetsSelectOptions: any[] = ['Bet1', 'Bet2'];
  selectedOpenBet: any = 'Bet1';
  tabToDisplay: any = 'Singles';
  @ViewChild('singles') singlesTab?: ElementRef;
  @ViewChild('openBets') openBetsTab?: ElementRef;
  @ViewChild('loaderWrapper') loaderWrapper?: ElementRef;
  @ViewChild('loader') loader?: ElementRef;

  constructor(
    public betSlipService: BetSlipService,
    public dataService: DataService,
    public sharedFunctionsService: SharedFunctionsService,
    private notificationService: NotificationService
  ) {}

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
    let betsToSend:any = []
    this.betSlipService.selectedBets.forEach(bet => {
      betsToSend.push({
        walletId:'String',
        stake:bet.stake,
        marketId:bet.market.marketId,
        selectionId:bet.market.run.selectionId,
        betType:bet.isBack?'BACK':'LAY'
      })
    });

    this.dataService.submitBets(betsToSend)
    .pipe(finalize( () =>       this.stopLoading()
    ))
    .subscribe(resp => {
      this.notificationService.success("Bet(s) added successfully!")
    }, error =>{
      this.notificationService.error("Error while adding Bet(s)!")
    });
    
  }

  removeFromSelectedBets(betIndex: number) {
    this.betSlipService.selectedBets.splice(betIndex, 1);
  }

  handleTabClick(event: any) {
    let text = event.target.textContent;
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

  disableSlipSubmit(){
    if(this.betSlipService.selectedBets.length < 1){
      return true;
    }

    if(this.betSlipService.selectedBets.some(x=>x.stake == undefined || x.stake == null || x.stake < this.betSlipService.minStakeForBet)){
      return true;
    }

    return false;
  }
}
