import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-super-modal',
  templateUrl: './add-super-modal.component.html',
  styleUrls: ['./add-super-modal.component.css']
})
export class AddSuperModalComponent implements OnInit {
  addMasterForm: any;
  form: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.addMasterForm.controls;
  }

  initalizeForm() {
    this.addMasterForm = this.fb.group({
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
