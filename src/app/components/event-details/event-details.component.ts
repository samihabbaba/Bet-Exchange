import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFutbol, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  host: {
    class: 'event-details',
  },
})
export class EventDetailsComponent implements OnInit {
  fontAwesomeIcons = {
    footBall: faFutbol,
    exit: faTimes,
  };

  constructor(
    public dataService: DataService,
    public sharedService: SharedFunctionsService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
