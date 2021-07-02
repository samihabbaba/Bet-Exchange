import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-exchange';
  viewType?: string;
  isLoading?: boolean;
  menuLoading?: boolean;

  constructor(
    public router: Router,
    private dataService: DataService,
    private layoutService: LayoutService
  ) {}
  ngOnInit(): void {
    this.initializeSubscriptions();
    this.dataService.performLogIn();
  }

  initializeSubscriptions() {
    this.layoutService.mainContentDisplayType.subscribe((value) => {
      this.viewType = value;
    });

    this.layoutService.MainLoading.subscribe((value) => {
      this.isLoading = value;
    });

    this.layoutService.menuLoading.subscribe((value) => {
      this.menuLoading = value;
    });
  }
}
