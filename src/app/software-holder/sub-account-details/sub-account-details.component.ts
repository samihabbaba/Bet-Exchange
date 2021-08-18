import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { contentInOut } from 'src/app/animations/animation';
import { DataService } from 'src/app/services/data.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-sub-account-details',
  templateUrl: './sub-account-details.component.html',
  styleUrls: ['./sub-account-details.component.css'],
  animations: [contentInOut()],
})
export class SubAccountDetailsComponent implements OnInit {
  transactionTypesSelect: any[] = ['Fuck', 'Fuck'];

  // start:Date= new Date();
  //  end:Date= new Date();

  range = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
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
  private sub: any;
  currentUserId = '';
  currentUser:any = {};

  constructor(private route: ActivatedRoute, private dataService:DataService, public sharedService: SharedFunctionsService) {}

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.currentUserId = params['id']; 
      this.loadUserById();
      this.loadUsersBet();
      this.loadUsersTransactions();
   });

   
  }

  loadUserById()
   {
     this.dataService.getUserById(this.currentUserId).subscribe(resp =>{
      debugger
      this.currentUser = resp;
     }, error =>{
       // redirect somewhere
     })
   }

   loadUsersBet(){
    this.dataService.getBets(1, 5, '', this.currentUserId).subscribe(resp =>{

      debugger;
      this.bettingHistoryData.data = resp.body.items;
    }, error =>{
      // redirect somewhere
    })
   }
   
   loadUsersTransactions(){
    this.dataService.getTransactions(1, 5, '', '', '', this.currentUserId).subscribe(resp =>{
      this.transactionsData.data = resp.body.items;
    }, error =>{
      // redirect somewhere
    })
   }

  ss:Date = new Date();   
   check(){
     debugger
     let zft= this.ss.getFullYear();
     let zftt= this.ss.toISOString();
    //  let hfa = this.start.getDate();
    //  let hfaa = this.start.getMonth();
    let hfa = this.range.controls.start.value.toDateString()
   }

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
