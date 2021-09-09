import { Component, Input, OnInit } from '@angular/core';
import { eventNames } from 'process';
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
    // debugger
    this.event
  }
  
  returnEventName(eventName:string){
    if(eventName == null || eventName == undefined){
      return '';
    }

    if(eventName.includes(" v ")){
      return eventName.replace(' v ',' vs ')
    }
    else if(eventName.includes(" @ ")){
      return eventName.replace(' @ ',' vs ')
    }
    else{
      return eventName;
    }
  }

  showRegionFlag(event:any){
    try{
      if(!event || !event.region || !event.region.name){
        return false
      }
      else{
        return true;
      }
    }
    catch(ex){
      return false;
    }
  }

}
