import { Component, Input, OnInit } from '@angular/core';
import { multicast } from 'rxjs/operators';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-event-details-header',
  templateUrl: './event-details-header.component.html',
  styleUrls: ['./event-details-header.component.css']
})
export class EventDetailsHeaderComponent implements OnInit {
  @Input() event:any= null;

  constructor(public layoutService:LayoutService) { }

  ngOnInit(): void {
  }
  
}
