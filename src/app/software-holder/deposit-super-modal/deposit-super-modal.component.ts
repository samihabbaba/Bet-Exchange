import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-deposit-super-modal',
  templateUrl: './deposit-super-modal.component.html',
  styleUrls: ['./deposit-super-modal.component.css']
})
export class DepositSuperModalComponent implements OnInit {
  depositMasterForm: any;
  form: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService
  ) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.depositMasterForm.controls;

    console.log(this.data);
  }

  initalizeForm() {
    this.depositMasterForm = this.fb.group({
      amount: new FormControl(null, Validators.required),
      // password: new FormControl(null, Validators.required),
      comment: new FormControl(null),
    });
  }

  addDeposit(){
    
    let objToSend = this.depositMasterForm.value;
    objToSend.toUserId = this.data.id;

    if(this.data.role == "SuperAdmin"){
      this.dataService.depositUser(objToSend).subscribe(resp => {
        this.notify.success('Deposit added to the user')
      },
      error => {
        try{
          let msg = error.error.fields[Object.keys(error.error.fields)[0]]; 
          if( msg !== undefined){
            this.notify.error(msg);
          }else{
            this.notify.error('Error adding deposit');
          }
        }
        catch(ex){
          this.notify.error('Error adding deposit');
        }
      })
    }
    else{

      this.dataService.exchangeUser(objToSend).subscribe(resp => {
        this.notify.success('Deposit added to the user')
      },
      error => {
        try{
          let msg = error.error.fields[Object.keys(error.error.fields)[0]]; 
          if( msg !== undefined){
            this.notify.error(msg);
          }else{
            this.notify.error('Error adding deposit');
          }
        }
        catch(ex){
          this.notify.error('Error adding deposit');
        }
      })

    }

  }
}
