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
  selector: 'app-edit-super-modal',
  templateUrl: './edit-super-modal.component.html',
  styleUrls: ['./edit-super-modal.component.css']
})
export class EditSuperModalComponent implements OnInit {
  editMasterForm: any;
  form: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private notify:NotificationService
  ) {}

  ngOnInit(): void {
    this.initalizeForm();
    // this.data.commission = this.data.commission*100;
    
    this.editMasterForm.value =  this.data;
    this.form = this.editMasterForm.controls;

    // Use this as a master id then after making getMasterById patch the data to editMasterForm
    console.log(this.data);
  }

  initalizeForm() {
    this.editMasterForm = this.fb.group({
      email: new FormControl(this.data.email, Validators.required),
      name: new FormControl(this.data.name, Validators.required),
      phoneNumber: new FormControl(this.data.phoneNumber, Validators.required),
      commission: new FormControl(this.data.commission, Validators.required),
      
    });
  }

  updateSuper(){
    this.dataService.updateUser({...this.editMasterForm.value, id:this.data.id}).subscribe(resp => {

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

