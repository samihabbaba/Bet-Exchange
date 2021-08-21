import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-bet-details',
  templateUrl: './bet-details.component.html',
  styleUrls: ['./bet-details.component.css']
})
export class BetDetailsComponent implements OnInit {

  constructor(    @Inject(MAT_DIALOG_DATA) public data: any,
  public sharedService:SharedFunctionsService, private dataService:DataService) { }

  ngOnInit(): void {
  }

}
