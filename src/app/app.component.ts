import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BetSlipService } from './services/bet-slip.service';
import { DataService } from './services/data.service';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BetSlipService],
})
export class AppComponent implements OnInit {
  title = 'angular-exchange';
  viewType?: string;
  isLoading?: boolean;
  menuLoading?: boolean;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    // private dataService: DataService,
    private layoutService: LayoutService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.initializeSubscriptions();

    if(!this.authService.loggedIn()){
      this.router.navigateByUrl('login');
    }
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

  checkForRoute() {
    if (
      this.router.url.includes('super') ||
      this.router.url.includes('master') ||
      this.router.url.includes('login')
    ) {
      return true;
    } else {
      return false;
    }
  }
}
