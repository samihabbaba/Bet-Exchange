import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService) { }

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
  }

  toggleSportActivation(){
    this.dataService.toggleUserActive(this.data.obj.id).subscribe(resp => {

      this.notify.success(this.successMsg);

    }, error => {

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
    this.dataService.toggleUserActive(this.data.obj.id).subscribe(resp => {

      this.notify.success(this.successMsg);

    }, error => {

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
    this.dataService.updateLeague(this.data.obj.id).subscribe(resp => {

      this.notify.success(this.successMsg);

    }, error => {

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
}
