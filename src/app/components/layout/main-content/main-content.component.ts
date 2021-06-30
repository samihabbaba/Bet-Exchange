import { Component, OnInit } from '@angular/core';
import { faFutbol, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
  host: {
    class: 'main-content'
  }
})
export class MainContentComponent implements OnInit {

  constructor(public dataService:DataService,
    public sharedService:SharedFunctionsService) { }

  ngOnInit(): void {
  }

  fontAwesomeIcons = {
    footBall : faFutbol,
    exit: faTimes,
  }

}
