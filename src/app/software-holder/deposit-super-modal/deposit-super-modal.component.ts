import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.depositMasterForm.controls;

    console.log(this.data);
  }

  initalizeForm() {
    this.depositMasterForm = this.fb.group({
      amount: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      comment: new FormControl(null),
    });
  }
}
