import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private fb: FormBuilder, private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.logut(false);
  }

  login(){
    let loginModel = {
      'username': this.loginForm.value.username,
      'password': this.loginForm.value.password
    }
    
    this.authService.performLogIn(loginModel);
  }
}
