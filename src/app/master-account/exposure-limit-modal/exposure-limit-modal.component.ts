import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exposure-limit-modal',
  templateUrl: './exposure-limit-modal.component.html',
  styleUrls: ['./exposure-limit-modal.component.css']
})
export class ExposureLimitModalComponent implements OnInit {
  exposureForm: any;
  form: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.exposureForm.controls;

    console.log(this.data);
  }

  initalizeForm() {
    this.exposureForm = this.fb.group({
      exposure: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
}
