import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFutbol, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  @Input() isLoading?: boolean;

  constructor(
    public dataService: DataService,
    public sharedService: SharedFunctionsService,
    private router: Router,
    private layoutService: LayoutService
  ) {
    this.subscription = this.dataService.selectedEvents.subscribe(resp => {
    this.games = resp;
    })
  }

  games:any = [];
  subscription: Subscription

  fontAwesomeIcons = {
    footBall: faFutbol,
    exit: faTimes,
    lock: faLock
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {

  }

  goToEventDetails(eventId:any) {
    this.dataService.loadMarketsForGameLive(eventId);
    // this.layoutService.displayGameDetails();
  }
}
