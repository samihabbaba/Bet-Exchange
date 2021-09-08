import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-update-risk',
  templateUrl: './update-risk.component.html',
  styleUrls: ['./update-risk.component.css']
})
export class UpdateRiskComponent implements OnInit {
  editRiskForm: any;
  form: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService,
    public authService:AuthService,
    private sharedService:SharedFunctionsService,
    private dialogRef: MatDialogRef<UpdateRiskComponent>
  ) {
    dialogRef.disableClose = true;
  }

  minRisk=0;
  maxRisk=100;

  ngOnInit(): void {
    this.minRisk = this.data.minRisk;
    this.maxRisk = this.data.maxRisk;
    this.initalizeForm();
    this.editRiskForm.value =  this.data;
    this.form = this.editRiskForm.controls;
  }

  initalizeForm() {
    
    if(this.authService.decodedToken.role == 'Master'){
      this.editRiskForm = this.fb.group({
        // adminRisk: new FormControl(this.data.adminRisk, [Validators.required, Validators.max(100), Validators.min(0)]),
        masterRisk: new FormControl(this.data.masterRisk, [Validators.required, Validators.max(100), Validators.min(0)])
      });
    }
    else{
      this.editRiskForm = this.fb.group({
        adminRisk: new FormControl(this.data.adminRisk, [Validators.required, Validators.max(100), Validators.min(0)]),
        masterRisk: new FormControl(this.data.masterRisk, [Validators.required, Validators.max(100), Validators.min(0)])
      });
    }
  }

  updateRisk(){
    this.dataService.updateRisk(this.data.masterId, this.editRiskForm.value).subscribe(resp => {
      this.notify.success("Risk Updated")
    }, error => {
      this.sharedService.showErrorMsg(error,'Error updating risk')
      this.dialogRef.close();
    })
  }
}
