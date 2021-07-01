import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFutbol, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-pre-games',
  templateUrl: './pre-games.component.html',
  styleUrls: ['./pre-games.component.css'],
})
export class PreGamesComponent implements OnInit,OnDestroy {
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

  fontAwesomeIcons = {
    footBall: faFutbol,
    exit: faTimes,
    lock: faLock
  };
  
  games:any = [];
  subscription: Subscription 

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    
  }

  

  goToEventDetails() {
    this.layoutService.displayGameDetails();
  }
}
