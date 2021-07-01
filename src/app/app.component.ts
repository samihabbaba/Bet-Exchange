import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-exchange';
  
  constructor(public router: Router, private dataService:DataService) {}
  ngOnInit(): void {
    this.dataService.performLogIn();
  }

  


}
