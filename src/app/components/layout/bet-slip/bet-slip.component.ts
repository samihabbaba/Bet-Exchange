import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BetSlipService } from 'src/app/services/bet-slip.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.css'],
})
export class BetSlipComponent implements OnInit {
  currentOpenBets: any[] = [];
  tabToDisplay: string = 'Singles';
  @ViewChild('singles') singlesTab?: ElementRef;
  @ViewChild('openBets') openBetsTab?: ElementRef;

  constructor(public betSlipService: BetSlipService,
    public sharedFunctionsService:SharedFunctionsService) {}

    stakeOptions =[
      10,
      20,
      50,
      100,
      200,
      500
    ]

  ngOnInit(): void {}

  fontAwesomeIcons = {
    exit: faTimes,
  };

  resetBets() {
    this.betSlipService.selectedBets = [];
  }

  submitBets() {
    console.log(this.betSlipService.selectedBets);
  }

  removeFromSelectedBets(betIndex: number) {
    this.betSlipService.selectedBets.splice(betIndex, 1);
  }

  handleTabClick(event: any) {
    if (event.target.textContent !== this.tabToDisplay) {
      this.singlesTab?.nativeElement.classList.remove('active');
      this.openBetsTab?.nativeElement.classList.remove('active');
      event.target.textContent == 'Singles'
        ? this.singlesTab?.nativeElement.classList.add('active')
        : this.openBetsTab?.nativeElement.classList.add('active');

      this.tabToDisplay = event.target.textContent;
    }
  }

  setStakeForBet(bet:any,stake:number){
    bet.stake = stake;
   this.setLiabilityForBet(bet);
  }

  setLiabilityForBet(bet:any){
    bet.liability = this.betSlipService.calculateSingleLiability(bet);
  }
}
