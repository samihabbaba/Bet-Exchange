import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-master-modal',
  templateUrl: './edit-master-modal.component.html',
  styleUrls: ['./edit-master-modal.component.css'],
})
export class EditMasterModalComponent implements OnInit {
  editMasterForm: any;
  form: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.editMasterForm.controls;

    // Use this as a master id then after making getMasterById patch the data to editMasterForm
    console.log(this.data);
  }

  initalizeForm() {
    this.editMasterForm = this.fb.group({
      email: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      commission: new FormControl(null, Validators.required),
      pt: new FormControl(null, Validators.required),
      ptLimit: new FormControl(null, Validators.required),
      forcedPt: new FormControl(null, Validators.required),
    });
  }
}
