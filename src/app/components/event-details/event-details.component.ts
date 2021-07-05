import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  game: any = [];
  subscription: Subscription;

  constructor(private dataService: DataService) {
    this.subscription = this.dataService.selectedEventDetails.subscribe(
      (resp) => {
        this.game = resp;
      }
    );
  }

  ngOnDestroy(): void {
    this.dataService.stopLiveEventListen();
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
