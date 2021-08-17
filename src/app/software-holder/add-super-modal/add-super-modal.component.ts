import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
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

  constructor(private fb: FormBuilder, public sharedFunctions:SharedFunctionsService, private dataService:DataService, private notify:NotificationService) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.addMasterForm.controls;
  }

  initalizeForm() {
    this.addMasterForm = this.fb.group({
      email: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),

      // firstName: new FormControl(null, Validators.required),
      // lastName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      // confirmPassword: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      commission: new FormControl(null, Validators.required),
      walletCurrency: new FormControl(null, Validators.required),
      // ptLimit: new FormControl(null, Validators.required),
      // forcedPt: new FormControl(null, Validators.required),
    });
  }

  addSuper(){
    
    this.dataService.addNewUser({...this.addMasterForm.value, role:'SuperAdmin'}).subscribe(resp => {

      this.notify.success('User Added');

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
