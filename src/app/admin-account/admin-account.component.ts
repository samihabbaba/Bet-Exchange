import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {

  constructor(private router: Router, public authService:AuthService) { }

  ngOnInit(): void {
  }

  goToProfile() {
    this.router.navigate([`admin/details`])
  }

  goToMastersTable() {
    this.router.navigate([`admin/masters`])
  }
  
  goToLoginPage() {
    this.router.navigateByUrl('login');
  }

}
