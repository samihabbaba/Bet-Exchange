import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFutbol, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-pre-games',
  templateUrl: './pre-games.component.html',
  styleUrls: ['./pre-games.component.css'],
})
export class PreGamesComponent implements OnInit {
  constructor(
    public dataService: DataService,
    public sharedService: SharedFunctionsService,
    private router: Router,
    private layoutService: LayoutService
  ) {}

  games:any = [];
  ngOnInit(): void {
    this.dataService.selectedEvents.subscribe(resp => {
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
