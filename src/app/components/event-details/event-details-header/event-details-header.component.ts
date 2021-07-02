import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-details-header',
  templateUrl: './event-details-header.component.html',
  styleUrls: ['./event-details-header.component.css']
})
export class EventDetailsHeaderComponent implements OnInit {
  @Input() event?= null;

  constructor() { }

  ngOnInit(): void {
  }

}
