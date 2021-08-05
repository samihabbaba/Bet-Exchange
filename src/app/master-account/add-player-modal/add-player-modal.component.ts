import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-player-modal',
  templateUrl: './add-player-modal.component.html',
  styleUrls: ['./add-player-modal.component.css'],
})
export class AddPlayerModalComponent implements OnInit {
  addPlayerForm: any;
  form: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.form = this.addPlayerForm.controls;
  }

  initalizeForm() {
    this.addPlayerForm = this.fb.group({
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
