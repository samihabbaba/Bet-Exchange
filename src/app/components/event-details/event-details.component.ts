import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  @Input() isLoading?: boolean;
  
  constructor() {}

  ngOnInit(): void {}
}
