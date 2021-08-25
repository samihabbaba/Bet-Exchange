import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-withdraw-super-modal',
  templateUrl: './withdraw-super-modal.component.html',
  styleUrls: ['./withdraw-super-modal.component.css']
})
export class WithdrawSuperModalComponent implements OnInit {

  withdrawMasterForm: any;
  form: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    
    this.initalizeForm();
    this.form = this.withdrawMasterForm.controls;

    console.log(this.data);
  }

  initalizeForm() {
    this.withdrawMasterForm = this.fb.group({
      amount: new FormControl(null, Validators.required),
      // password: new FormControl(null, Validators.required),
      comment: new FormControl(null),
    });
  }

  addWithdraw(){

    let objToSend = this.withdrawMasterForm.value;
    objToSend.toUserId = this.data.id;

    this.dataService.withdrawUser(objToSend).subscribe(resp => {
      this.notify.success('changes done successfully');
      this.authService.updateCurrentBalance();
    },
    error => {
      try{
        let msg = error.error.fields[Object.keys(error.error.fields)[0]]; 
        if( msg !== undefined){
          this.notify.error(msg);
        }else{
          this.notify.error('Error while withdraw attempt');
        }
      }
      catch(ex){
        this.notify.error('Error while withdraw attempt');
      }
    })

  }

}
