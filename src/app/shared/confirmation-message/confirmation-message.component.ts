import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  }

  toggleSportActivation(){
    this.dataService.toggleSportActive(this.data.obj.id).subscribe(resp => {

      this.notify.success(this.successMsg);
      this.closeDialog();

    }, error => {
      this.dialogRef.close();
        try{
          let msg = error.error.fields[Object.keys(error.error.fields)[0]]; 
          if( msg !== undefined){
            this.notify.error(msg);
          }else{
            this.notify.error(this.errorMsg);
          }
        }
        catch(ex){
          this.notify.error(this.errorMsg);
        }

    })
  }

  toggleRegionActivation(){
    this.dataService.toggleRegionActivationForSport(this.data.sportId,this.data.obj.countryCode).subscribe(resp => {

      this.notify.success(this.successMsg);
      this.closeDialog();
    }, error => {
      this.dialogRef.close();
        try{
          let msg = error.error.fields[Object.keys(error.error.fields)[0]]; 
          if( msg !== undefined){
            this.notify.error(msg);
          }else{
            this.notify.error(this.errorMsg);
          }
        }
        catch(ex){
          this.notify.error(this.errorMsg);
        }

    })
  }

  toggleLeagueActivation(){
    this.dataService.toggleLeagueActivation(this.data.obj.id).subscribe(resp => {

      this.notify.success(this.successMsg);
      this.closeDialog();
    }, error => {
      this.dialogRef.close();
        try{
          let msg = error.error.fields[Object.keys(error.error.fields)[0]]; 
          if( msg !== undefined){
            this.notify.error(msg);
          }else{
            this.notify.error(this.errorMsg);
          }
        }
        catch(ex){
          this.notify.error(this.errorMsg);
        }

    })
  }

  
  toggleUserSuspend(){
    this.dataService.toggleUserSuspend(this.data.obj.id).subscribe(resp => {

      this.notify.success(this.successMsg);
      this.closeDialog();
    }, error => {
      this.dialogRef.close();
        try{
          let msg = error.error.fields[Object.keys(error.error.fields)[0]]; 
          if( msg !== undefined){
            this.notify.error(msg);
          }else{
            this.notify.error(this.errorMsg);
          }
        }
        catch(ex){
          this.notify.error(this.errorMsg);
        }

    })
  }


  async closeDialog(){
    await this.sharedService.delay(400);
    this.dialogRef.close();
  }
}
