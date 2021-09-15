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
  selector: 'app-set-my-commission',
  templateUrl: './set-my-commission.component.html',
  styleUrls: ['./set-my-commission.component.css']
})
export class SetMyCommissionComponent implements OnInit {
  editCommissionForm: any;
  form: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService,
    public authService:AuthService,
    private sharedService:SharedFunctionsService,
    private dialogRef: MatDialogRef<SetMyCommissionComponent>
  ) {
    dialogRef.disableClose = true;
  }


  ngOnInit(): void {
    if(!this.data.maxCommission){
      this.data.maxCommission = 10 - this.authService.currentUserInfo.parentCommission;
    }

    if(this.data.maxCommission > 10 || this.data.maxCommission<0){
      this.data.maxCommission = 0
    }

    this.initalizeForm();
    this.editCommissionForm.value =  this.data.user;
    this.form = this.editCommissionForm.controls;
  }

  initalizeForm() {
    this.editCommissionForm = this.fb.group({
      commission: new FormControl(this.data.user.commission*100, [Validators.required,Validators.max(this.data.maxCommission),Validators.min(0)])
    });
  }

  updateCommission(){

    let objToSend = {
      id:this.data.user.id,
      commission:this.editCommissionForm.value.commission
    }
    // objToSend.commission = this.editCommissionForm.value.commission;

    this.dataService.updateUser(objToSend).subscribe(resp => {
      this.notify.success("user Updated")
    }, error => {
      this.sharedService.showErrorMsg(error,'Error updating user')
      this.dialogRef.close();
    })
  }

  showTotalCom(){
    if(this.data.role === 'SuperAdmin'){
      return false
    }

    let total = this.authService.currentUserInfo.parentCommission + this.form.commission.value;
    if(total <= 10)
    {
      return true
    }
    return false
  }

}
