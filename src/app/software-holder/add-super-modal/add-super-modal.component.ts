import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-add-super-modal',
  templateUrl: './add-super-modal.component.html',
  styleUrls: ['./add-super-modal.component.css']
})
export class AddSuperModalComponent implements OnInit {
  addMasterForm: any;
  form: any;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
     public sharedFunctions:SharedFunctionsService,
     private dataService:DataService,
      private notify:NotificationService,
      private dialogRef: MatDialogRef<AddSuperModalComponent>) {
        dialogRef.disableClose = true;
      }

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.addMasterForm.controls;
  }

  initalizeForm() {

    let objValidation:any = {
      email: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      // commission: new FormControl(null, Validators.required),
      // walletCurrency: new FormControl(null, Validators.required),
    }

    if(this.data.roleToCreate !== 'Client'){
      objValidation = {...objValidation, commission: new FormControl(null, [Validators.required,Validators.max(10)])}
    }
    
    if(this.data.roleToCreate === 'SuperAdmin'){
      objValidation = {...objValidation, walletCurrency: new FormControl(null, Validators.required)}
    }

    this.addMasterForm = this.fb.group(objValidation);

  }

  addSuper(){
    
    this.dataService.addNewUser({...this.addMasterForm.value, role:this.data.roleToCreate}).subscribe(resp => {

      this.notify.success('User Added');
      this.dialogRef.close();
    }, error => {

        try{
          let msg = error.error.fields[Object.keys(error.error.fields)[0]]; 
          if( msg !== undefined){
            this.notify.error(msg);
          }else{
            this.notify.error('Error adding user');
          }
        }
        catch(ex){
          this.notify.error('Error adding user');
        }

    })
  }

}
