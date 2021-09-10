import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BetSlipService } from 'src/app/services/bet-slip.service';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-pay-commission',
  templateUrl: './pay-commission.component.html',
  styleUrls: ['./pay-commission.component.css']
})
export class PayCommissionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService,
    private sharedService:SharedFunctionsService,
    private betSlipService:BetSlipService,
    private dialogRef: MatDialogRef<PayCommissionComponent>) {
      dialogRef.disableClose = true;
     }

     maxAmount = 0;
     amount = 0;
  ngOnInit(): void {
    this.amount = this.data.unsettledCommission;
    this.maxAmount = this.data.unsettledCommission;
  }



  settleCommission(){

    this.dataService.settleCommission(
      this.data.id,
      this.amount
    ).subscribe((resp:any) => {
      
      this.notify.success('Commission settled');
      this.dialogRef.close();

      // this.closeDialog();
    }, error => {
      this.dialogRef.close();
      this.sharedService.showErrorMsg(error, 'Error while commission settlement')

    })
  }





  async closeDialog(){
    await this.sharedService.delay(400);
    this.dialogRef.close();
  }

}
