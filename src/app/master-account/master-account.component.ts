import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-master-account',
  templateUrl: './master-account.component.html',
  styleUrls: ['./master-account.component.css']
})
export class MasterAccountComponent implements OnInit {

  constructor(private router: Router, public authService:AuthService) { }

  ngOnInit(): void {
  }


  goToProfile() {
    this.router.navigate([`master/details`])
  }

  goToPlayersTable() {
    this.router.navigate([`master/players`])
  }

  goToLoginPage() {
    this.router.navigateByUrl('login');
  }
}
