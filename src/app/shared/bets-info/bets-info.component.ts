import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-bets-info',
  templateUrl: './bets-info.component.html',
  styleUrls: ['./bets-info.component.css']
})
export class BetsInfoComponent implements OnInit {

  displayedColumnsBettingHistory: string[] = [
    // 'id',
    'userName',
    // 'sport',
    'eventName',
    'marketName',
    'selectionName',
    'betType', // Lay - Back
    // 'selectionType', // Live - Pre
    'stake',
    'liability',
    'odd',
    'payout',
    'netWin',
    // 'matchedSize',
    'status',
    'date',
    // 'lastActionDate',
    // 'eventDate',
    // 'matchedDate',
    // 'actions',
    // 'avgOddsMatched',
  ];
  bettingHistoryData = new MatTableDataSource<any>();

  
  constructor(public sharedService:SharedFunctionsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.bettingHistoryData.data = data;
    }

  ngOnInit(): void {
  }


}
