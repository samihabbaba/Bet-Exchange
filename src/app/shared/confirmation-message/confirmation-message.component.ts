import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BetSlipService } from 'src/app/services/bet-slip.service';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService,
    private sharedService:SharedFunctionsService,
    private betSlipService:BetSlipService,
    private dialogRef: MatDialogRef<ConfirmationMessageComponent>) {
      dialogRef.disableClose = true;
     }

    confirmMsg = '';
    successMsg = '';
    errorMsg = '';
    functionToCall = 1;
  ngOnInit(): void {
    this.confirmMsg = this.data.msg;
    this.successMsg = this.data.successMsg;
    this.errorMsg = this.data.errorMsg;
    this.functionToCall = this.data.functionToCall;
  }

  triggerFunction(){
    if(this.functionToCall == 1){
      this.toggleSportActivation();
    }
    else if(this.functionToCall == 2){
      this.toggleRegionActivation();
    }
    else if(this.functionToCall == 3){
      this.toggleLeagueActivation();
    }
    else if(this.functionToCall == 4){
      this.toggleUserSuspend();
    }
    else if(this.functionToCall == 5){
      this.cancelSingleBet();
    }
    else if(this.functionToCall == 6){
      this.cancelUnmatchedBetsForEvent();
    }
  }

  toggleSportActivation(){
    this.dataService.toggleSportActive(this.data.obj.id).subscribe(resp => {

      this.notify.success(this.successMsg);
      this.closeDialog();

    }, error => {
      this.dialogRef.close();
      this.sharedService.showErrorMsg(error, this.errorMsg)
    })
  }

  toggleRegionActivation(){
    this.dataService.toggleRegionActivationForSport(this.data.sportId,this.data.obj.countryCode).subscribe(resp => {

      this.notify.success(this.successMsg);
      this.closeDialog();
    }, error => {
      this.dialogRef.close();
      this.sharedService.showErrorMsg(error, this.errorMsg)
    })
  }

  toggleLeagueActivation(){
    this.dataService.toggleLeagueActivation(this.data.obj.id).subscribe(resp => {

      this.notify.success(this.successMsg);
      this.closeDialog();
    }, error => {
      this.dialogRef.close();
      this.sharedService.showErrorMsg(error, this.errorMsg)


    })
  }

  
  toggleUserSuspend(){
    this.dataService.toggleUserSuspend(this.data.obj.id).subscribe(resp => {

      this.notify.success(this.successMsg);
      this.closeDialog();
    }, error => {
      this.dialogRef.close();
      this.sharedService.showErrorMsg(error, this.errorMsg)

    })
  }


  cancelSingleBet(){
    this.betSlipService.currentOpenBets;
    this.dataService.voidBets(this.data.obj.id).subscribe(resp => {
      this.betSlipService.currentOpenBets;

      this.notify.success(this.successMsg);
      this.betSlipService.cancelOpenBetById(this.data.obj.id);
      this.closeDialog();
    }, error => {
      this.dialogRef.close();
      this.sharedService.showErrorMsg(error, this.errorMsg)

    })
  }

  cancelUnmatchedBetsForEvent(){

    this.dataService.voidBetsMulti({
      eventId:this.data.obj.id,
      marketId: null,
      betIds: null
    
    }).subscribe(resp => {

      this.notify.success(this.successMsg);
      this.betSlipService.cancelAllOpenBetsForEventId(this.data.obj.id);
      this.closeDialog();
    }, error => {
      this.dialogRef.close();
      this.sharedService.showErrorMsg(error, this.errorMsg)

    })
  }





  async closeDialog(){
    await this.sharedService.delay(400);
    this.dialogRef.close();
  }
}
