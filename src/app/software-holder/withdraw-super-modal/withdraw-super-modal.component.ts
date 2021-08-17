import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-withdraw-super-modal',
  templateUrl: './withdraw-super-modal.component.html',
  styleUrls: ['./withdraw-super-modal.component.css']
})
export class WithdrawSuperModalComponent implements OnInit {

  withdrawMasterForm: any;
  form: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.withdrawMasterForm.controls;

    console.log(this.data);
  }

  initalizeForm() {
    this.withdrawMasterForm = this.fb.group({
      amount: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      comment: new FormControl(null),
    });
  }
}
