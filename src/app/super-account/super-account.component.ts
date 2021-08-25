import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedFunctionsService } from '../services/shared-functions.service';

@Component({
  selector: 'app-super-account',
  templateUrl: './super-account.component.html',
  styleUrls: ['./super-account.component.css'],
})
export class SuperAccountComponent implements OnInit {
  constructor(private router: Router, public authService:AuthService, public sharedService:SharedFunctionsService) {}
  ngOnInit() {}

  goToProfile() {
    this.router.navigate([`super/details`])
  }

  goToMastersTable() {
    this.router.navigate([`super/admins`])
  }
  
  goToLoginPage() {
    this.router.navigateByUrl('login');
  }
}
