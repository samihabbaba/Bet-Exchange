import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-activation-modal',
  templateUrl: './activation-modal.component.html',
  styleUrls: ['./activation-modal.component.css']
})
export class ActivationModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService) { }

  ngOnInit(): void {

  }

  toggleActivate(){
    this.dataService.toggleUserActive(this.data.id).subscribe(resp => {

      this.notify.success('User Updated');

    }, error => {

        try{
          let msg = error.error.fields[Object.keys(error.error.fields)[0]]; 
          if( msg !== undefined){
            this.notify.error(msg);
          }else{
            this.notify.error('Error updating user');
          }
        }
        catch(ex){
          this.notify.error('Error updating user');
        }

    })
  }
}
