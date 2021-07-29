import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-withdraw-master-modal',
  templateUrl: './withdraw-master-modal.component.html',
  styleUrls: ['./withdraw-master-modal.component.css']
})
export class WithdrawMasterModalComponent implements OnInit {

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
