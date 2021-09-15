import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-expo-details',
  templateUrl: './expo-details.component.html',
  styleUrls: ['./expo-details.component.css']
})
export class ExpoDetailsComponent implements OnInit {

  constructor(    @Inject(MAT_DIALOG_DATA) public data: any,
  public sharedService:SharedFunctionsService, private dataService:DataService) { }

  selections = [];
  ngOnInit(): void {
    debugger
    this.data
    this.selections = this.data.bets[0].selection.runnerNames;

    debugger
  }





  getRunMoney( selectionId:any){ // maybe take run name also ?

    // debugger
    // if(this.betsForMarket.length == 0 || this.betsForMarket[0].selection.marketId !== marketId){
    //   return 0;
    // }

    // how much each run will cost, either as winning money or losing
    // get all events for the user with the needed market id
    // take only the pending bets - no unmatched or settled 
    // debugger

    let runBack = this.data.bets.filter((x:any)=>x.selection.selectionName == selectionId && x.selection.betType == 'BACK')    
    let runLay = this.data.bets.filter((x:any)=>x.selection.selectionName == selectionId && x.selection.betType == 'LAY')    
    let notRunBack = this.data.bets.filter((x:any)=>x.selection.selectionName != selectionId && x.selection.betType == 'BACK')    
    let notRunLay = this.data.bets.filter((x:any)=>x.selection.selectionName != selectionId && x.selection.betType == 'LAY')    

    let runBackProfit = runBack.reduce((runBackProfit:any, b:any) => runBackProfit + (b.payout - b.stake),0);
    let runLayLiability = runLay.reduce((runLayLiability:any, b:any) => runLayLiability + ((b.odd-1)*b.stake),0);    
    let notRunBackStake = notRunBack.reduce((notRunBackStake:any, b:any) => notRunBackStake + b.stake,0);
    let notRunLayStake = notRunLay.reduce((notRunLayStake:any, b:any) => notRunLayStake + b.stake,0);
    
    //calculate the winning money (stake + profit/liability) for the bets with runner id --> minus liability of the others

    let num =  (runBackProfit - runLayLiability) + (notRunLayStake - notRunBackStake);
    return this.sharedService.formatNumber(-1*num)
    
    // return (runBackProfit - runLayLiability) + (notRunLayStake - notRunBackStake);
  }


  showPendingRunMoney(marketId:any){
    return this.data.bets.some((x:any)=> x.market.marketId == marketId && x.stake !== undefined && x.stake !== 0 && x.stake !== null)
  }


  returnBetsProfit(bet:any){
    if(bet.selection.betType == 'BACK'){
      return bet.payout - bet.stake;
    }
    else if(bet.selection.betType == 'LAY'){
      return bet.stake;
    }
    else{
      return -1;
    }
  }

  getBetsNumForSelection(selectionId:any){
    debugger
    return this.data.bets.filter((x:any)=> x.selection.selectionName == selectionId).length
  }

  
  getPlayerNumForSelection(selectionId:any){
    debugger
    let bets = this.data.bets.filter((x:any)=> x.selection.selectionName == selectionId);
    let users = bets.map(function(i:any) {
      return i.userName;
    });

    let uniq = [...new Set(users)];

    return uniq.length;
  }

}