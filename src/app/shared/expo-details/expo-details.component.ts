import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';
import { BetsInfoComponent } from '../bets-info/bets-info.component';

@Component({
  selector: 'app-expo-details',
  templateUrl: './expo-details.component.html',
  styleUrls: ['./expo-details.component.css']
})
export class ExpoDetailsComponent implements OnInit {

  constructor(    @Inject(MAT_DIALOG_DATA) public data: any,
  public sharedService:SharedFunctionsService, private dataService:DataService,
  private dialog: MatDialog) { }

  selections = [];
  checkedMarket:any = [];
  ngOnInit(): void {

    this.selections = this.data.bets[0].selection.runnerNames;

    this.data.bets.forEach((bet:any) => {
      if(!this.checkedMarket.some((x:any)=> x.name === bet.selection.marketName)){
        let marketName = bet.selection.marketName
        let selectionsList:any = []
        bet.selection.runners.forEach((run:any) => {
          selectionsList.push({
            id:run.selectionId,
            name:(run.runnerName+' '+this.returnSecondPartRunName(run,marketName)).trim()
          })
        })
        
        this.checkedMarket.push({
          name:marketName,
          selections:selectionsList
        })


      }
    });

  }







  getRunMoney( marketName:any, selectionId:any, selectionName:any){ // maybe take run name also ?

    // if(this.data.bets.length == 0 || this.data.bets[0].selection.marketId !== marketId){
    //   return 0;
    // }
    // how much each run will cost, either as winning money or losing
    // get all events for the user with the needed market id
    // take only the pending bets - no unmatched or settled 
    // debugger

    let marketsToCheck = this.data.bets.filter((x:any)=> x.selection.marketName == marketName)
    
    let runBack = marketsToCheck.filter((x:any)=>x.selection.selectionId == selectionId && x.selection.betType == 'BACK' && x.selection.fullSelectionName.trim() == selectionName.trim())    
    let runLay = marketsToCheck.filter((x:any)=>x.selection.selectionId == selectionId && x.selection.betType == 'LAY' && x.selection.fullSelectionName.trim() == selectionName.trim())    
    let notRunBack = marketsToCheck.filter((x:any)=> (x.selection.selectionId != selectionId || x.selection.fullSelectionName.trim() !== selectionName) && x.selection.betType == 'BACK')    
    let notRunLay = marketsToCheck.filter((x:any)=> (x.selection.selectionId != selectionId || x.selection.fullSelectionName.trim() !== selectionName.trim()) && x.selection.betType == 'LAY')    

    let runBackProfit = runBack.reduce((runBackProfit:any, b:any) => runBackProfit + (b.payout - b.stake),0);
    let runLayLiability = runLay.reduce((runLayLiability:any, b:any) => runLayLiability + ((b.odd-1)*b.stake),0);    
    let notRunBackStake = notRunBack.reduce((notRunBackStake:any, b:any) => notRunBackStake + b.stake,0);
    let notRunLayStake = notRunLay.reduce((notRunLayStake:any, b:any) => notRunLayStake + b.stake,0);
    
    //calculate the winning money (stake + profit/liability) for the bets with runner id --> minus liability of the others

    let num =  (runBackProfit - runLayLiability) + (notRunLayStake - notRunBackStake);
    // return this.sharedService.formatNumber(-1*num)
    return (-1*num)
    
    // return (runBackProfit - runLayLiability) + (notRunLayStake - notRunBackStake);
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

  getBetsNumForSelection(selection:any, marketName:any){
    let i = this.data.bets.filter((x:any)=> x.selection.fullSelectionName == selection.name && x.selection.marketName == marketName).length
    return  i ;
  }

  
  getPlayerNumForSelection(selection:any, marketName:any){
    let bets = this.data.bets.filter((x:any)=> x.selection.fullSelectionName == selection.name&& x.selection.marketName == marketName);
    let users = bets.map(function(i:any) {
      return i.userName;
    });

    let uniq = [...new Set(users)];

    return uniq.length;
  }

  returnSecondPartRunName(run:any, marketName:string):any{

    let showSign = marketName.toLowerCase().includes('handicap');

    if(run.handicap){
      let num = +run.handicap;
      if(num.toString().includes('.75') || num.toString().includes('.25')){
        if(!num.toString().includes('-') && showSign){
          return '+'+(num -0.25) + ' & ' + '+'+(num +0.25)
        } else{
          return (num -0.25) + ' & ' + (num +0.25)
        }
      }else{
        return num;
      }
    }
    else{
      return '';
    }
  }

  openBetInfo(marketName:any) {
    let obj = this.data.bets.filter((x:any)=> x.selection.marketName == marketName);
    const dialogRef = this.dialog.open(BetsInfoComponent,{
      data:obj
    });
    dialogRef.afterClosed().subscribe((result) => {

    });
  }

}