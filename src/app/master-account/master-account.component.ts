import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedFunctionsService } from '../services/shared-functions.service';

@Component({
  selector: 'app-master-account',
  templateUrl: './master-account.component.html',
  styleUrls: ['./master-account.component.css']
})
export class MasterAccountComponent implements OnInit {

  constructor(private router: Router, public authService:AuthService, public sharedService:SharedFunctionsService) { }

  ngOnInit(): void {
  }


  goToProfile() {
    this.router.navigate([`master/details`])
  }

  goToPlayersTable() {
    this.router.navigate([`master/players`])
  }

  goToLoginPage() {
    // this.router.navigateByUrl('login');

    this.authService.logut();

    this.router.navigate(['login'])
    .then(() => {
      window.location.reload();
    });
  }
}
