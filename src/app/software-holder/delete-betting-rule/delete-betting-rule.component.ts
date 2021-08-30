import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-delete-betting-rule',
  templateUrl: './delete-betting-rule.component.html',
  styleUrls: ['./delete-betting-rule.component.css']
})
export class DeleteBettingRuleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService,
    private sharedFunctions:SharedFunctionsService,
    private dialogRef: MatDialogRef<DeleteBettingRuleComponent>) { 
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {

  }

  deleteBettingRule(){
    this.dataService.deleteBettingRulesById(this.data.id).subscribe(resp => {

      this.notify.success('Rule deleted');
      this.dialogRef.close();
    }, error => {
      this.dialogRef.close();
      this.sharedFunctions.showErrorMsg(error,'Error deleting rule')
        
    })
  }
}

