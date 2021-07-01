import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFutbol, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-live-games',
  templateUrl: './live-games.component.html',
  styleUrls: ['./live-games.component.css'],
})
export class LiveGamesComponent implements OnInit, OnDestroy {
  constructor(
    public dataService: DataService,
    public sharedService: SharedFunctionsService,
    private router: Router,
    private layoutService: LayoutService
  ) {}
  games:any = [];
  subscription?: Subscription 

  ngOnDestroy(): void {
    // this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.subscription = this.dataService.selectedEvents.subscribe(resp => {
      this.games = resp;
    })
  }

  fontAwesomeIcons = {
    footBall: faFutbol,
    exit: faTimes,
  };

  goToEventDetails() {
    this.layoutService.displayGameDetails();
  }
}
