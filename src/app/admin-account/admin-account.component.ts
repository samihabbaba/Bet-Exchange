import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {

  constructor(private router: Router) { }

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
