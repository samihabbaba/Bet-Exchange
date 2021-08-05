import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player-modal',
  templateUrl: './edit-player-modal.component.html',
  styleUrls: ['./edit-player-modal.component.css']
})
export class EditPlayerModalComponent implements OnInit {
  editPlayerForm: any;
  form: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.editPlayerForm.controls;

    // Use this as a master id then after making getMasterById patch the data to editMasterForm
    console.log(this.data);
  }

  initalizeForm() {
    this.editPlayerForm = this.fb.group({
      email: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      exposure: new FormControl(null, Validators.required),
      commission: new FormControl(null, Validators.required),
      pt: new FormControl(null, Validators.required),
      comment: new FormControl(null),
    });
  }
}
