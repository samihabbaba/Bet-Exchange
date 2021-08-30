import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-activation-modal',
  templateUrl: './activation-modal.component.html',
  styleUrls: ['./activation-modal.component.css']
})
export class ActivationModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService,
    private sharedService:SharedFunctionsService,
    private dialogRef: MatDialogRef<ActivationModalComponent>) {
      dialogRef.disableClose = true;
     }

  ngOnInit(): void {

  }

  toggleActivate(){
    this.dataService.toggleUserActive(this.data.id).subscribe(resp => {
      this.notify.success('User Updated');
      this.dialogRef.close();
    }, error => {
        this.sharedService.showErrorMsg(error,'Error updating user')
    })
  }
}
