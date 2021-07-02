import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  constructor(private dataService:DataService, ) {}

  ngOnDestroy(): void {
    this.dataService.stopLiveEventListen();
  }

  ngOnInit(): void {}
}