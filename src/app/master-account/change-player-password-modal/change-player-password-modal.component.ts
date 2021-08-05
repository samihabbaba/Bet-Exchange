import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-player-password-modal',
  templateUrl: './change-player-password-modal.component.html',
  styleUrls: ['./change-player-password-modal.component.css'],
})
export class ChangePlayerPasswordModalComponent implements OnInit {
  changePasswordForm: any;
  form: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.changePasswordForm.controls;

    console.log(this.data);
  }

  initalizeForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      confirmNewPassword: new FormControl(null, Validators.required),
    });
  }
}
