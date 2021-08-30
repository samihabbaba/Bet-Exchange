import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-bet-settle-modal',
  templateUrl: './bet-settle-modal.component.html',
  styleUrls: ['./bet-settle-modal.component.css']
})
export class BetSettleModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService,
    private sharedService:SharedFunctionsService,
    private dialogRef: MatDialogRef<BetSettleModalComponent>) { 
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {

  }

  settleBet(){
      // win , lose , cancel
      if(this.data.settleType == 'win'){
        this.winBet();
      } else if(this.data.settleType == 'lose'){
        this.loseBet()
      } else if(this.data.settleType == 'cancel'){
        this.voidBet();
      }
  }

  voidBet(){
    this.dataService.voidBets(this.data.id).subscribe(resp => {
      this.notify.success('Bet Updated');
      this.dialogRef.close();
    }, error => {
      this.dialogRef.close();
      this.sharedService.showErrorMsg(error, 'Error updating bet')
    })
  }

  winBet(){
    this.dataService.winBets(this.data.id).subscribe(resp => {
      this.notify.success('Bet Updated');
      this.dialogRef.close();
    }, error => {
      this.dialogRef.close();
      this.sharedService.showErrorMsg(error, 'Error updating bet')
    })
  }

  loseBet(){
    this.dataService.loseBets(this.data.id).subscribe(resp => {
      this.notify.success('Bet Updated');
      this.dialogRef.close();
    }, error => {
      this.dialogRef.close();
      this.sharedService.showErrorMsg(error, 'Error updating bet')
    })
  }
}

