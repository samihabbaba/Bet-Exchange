import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { contentInOut } from 'src/app/animations/animation';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
  animations: [contentInOut()],
})
export class PlayerDetailsComponent implements OnInit {
  transactionTypesSelect: any[] = ['Fuck', 'Fuck'];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  displayedColumnsTransactions: string[] = [
    'date',
    'transactionNo',
    'transactionType',
    'bet',
    'debits',
    'credits',
    'comment',
    'fromTo',
  ];

  transactionsData = new MatTableDataSource<any>(transactions);

  displayedColumnsLoginHistory: string[] = ['ip', 'createdAt', 'isSuccessfull'];
  loginHistoryData = new MatTableDataSource<any>(loginHistory);

  displayedColumnsProfitLoss: string[] = [
    'market',
    'startTime',
    'settledDate',
    'profitLoss',
  ];

  profitLossData = new MatTableDataSource<any>(profitLoss);

  displayedColumnsBettingHistory: string[] = [
    'market',
    'selection',
    'bidType',
    'betId',
    'betPlace',
    'stake',
    'matchedSize',
    'avgOddsMatched',
    'pl',
  ];
  bettingHistoryData = new MatTableDataSource<any>(bettingHistory);
  constructor() {}

  ngOnInit(): void {}
}

const transactions: any[] = [
  {
    date: '28/07/2021',
    transactionNo: 20,
    transactionType: 1.0079,
    bet: 'Lay',
    debits: 0.5,
    credits: 4,
    comment: 'FF',
    fromTo: 'Sami -> Amro',
  },
];

const profitLoss: any[] = [
  {
    market: 'Super Lig/ Galatasaray vs Fenerbahce',
    startTime: '28/07/2021',
    settledDate: '18/08/2021',
    profitLoss: -29,
  },
];

const bettingHistory: any[] = [
  {
    market: '',
    selection: '',
    bidType: '',
    betId: '',
    betPlace: '',
    stake: '',
    matchedSize: '',
    avgOddsMatched: '',
    pl: '',
  },
];

const loginHistory: any[] = [
  { ip: '321.412.412', createdAt: '27/03/2021', isSuccessfull: true },
];
