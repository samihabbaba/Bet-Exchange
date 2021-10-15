import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {

  changePasswordForm: any;
  form: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private notify:NotificationService,
    private sharedFunctions:SharedFunctionsService
  ) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.changePasswordForm.controls;

    console.log(this.data);
  }

  initalizeForm() {
    this.changePasswordForm = this.fb.group({
      // oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      confirmNewPassword: new FormControl(null, Validators.required),
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: any){
    return g.get('newPassword').value === g.get('confirmNewPassword').value ? null : {'mismatch': true};
  }

  updatePassword(){
    
    this.dataService.updatePassword(this.data.id,this.changePasswordForm.get('newPassword').value).subscribe(resp => {
      this.notify.success('Password changed successfully')
    }, error =>{
      this.sharedFunctions.showErrorMsg(error,'Error while changing password')
    
    })
  }
}
