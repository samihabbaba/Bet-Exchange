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

  returnSecondPartRunName(run:any, marketName:string){

    //*ngIf="currentSport" in detail to above level
    
    let showSign = marketName.toLowerCase().includes('handicap');

    if(run.handicap){
      let num = +run.handicap;
      if(num.toString().includes('.75') || num.toString().includes('.25')){
        if(!num.toString().includes('-') && showSign){
          return '+'+(num +0.25) + ' & ' + '+'+(num -0.25)
        } else{
          return (num +0.25) + ' & ' + (num -0.25)
        }
      }else{
        return num;
      }
    }
    else{
      return '';
    }
  }
  
}
