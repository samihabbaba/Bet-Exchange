import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-software-holder',
  templateUrl: './software-holder.component.html',
  styleUrls: ['./software-holder.component.css']
})
export class SoftwareHolderComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}

  goToProfile() {
    this.router.navigate([`software-holder/details`])
  }

  goToMastersTable() {
    this.router.navigate([`software-holder/supers`])
  }
  
  goToLoginPage() {
    this.router.navigateByUrl('login');
  }
}
