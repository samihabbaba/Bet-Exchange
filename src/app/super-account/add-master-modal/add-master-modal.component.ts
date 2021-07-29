import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-master-modal',
  templateUrl: './add-master-modal.component.html',
  styleUrls: ['./add-master-modal.component.css'],
})
export class AddMasterModalComponent implements OnInit {
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
