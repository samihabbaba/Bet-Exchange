import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { contentInOut } from 'src/app/animations/animation';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
  animations: [contentInOut()],
})
export class AccountDetailsComponent implements OnInit {
  @ViewChild('profile') profile?: any;
  periodSelect: any[] = [
    'All',
    'Today',
    'From Yesterday',
    'Last Week',
    'Last Month',
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  rangeTrans = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  // Change Password Section
  changePasswordForm?: any;

  // Forecast Section
  displayedColumnsForecast: string[] = [
    'market',
    'startDate',
    'liability',
    'profit',
  ];
  forecastData = new MatTableDataSource<any>(FORECAST);

  // PL Section
  displayedColumnsPL: string[] = [
    'user',
    'pl',
    'mpl',
    'pt',
    'commission',
    'currentCommission',
    'total',
    'mTotal',
  ];
  pLData = new MatTableDataSource<any>(PL);

  // Total PL Section
  displayedColumnstotalPL: string[] = [
    'user',
    'pl',
    'mpl',
    'pt',
    'commission',
    'currentCommission',
    'total',
    'mTotal',
  ];
  totalPLData = new MatTableDataSource<any>(totalPL);

  // Total Casino Section
  displayedColumnsCasinoTotal: string[] = [
    'user',
    'pl',
    'mpl',
    'pt',
    'commission',
    'currentCommission',
    'total',
    'mTotal',
  ];
  casinoTotalData = new MatTableDataSource<any>(casinoTotal);

  // Transactions Section
  displayedColumnsTransactions: string[] = [
    // 'transactionNo',
    'type',
    'user',
    'amount',
    'balance change',
    'balance',
    'currency',
    'date',
    'comment',
    // 'exchangeRate',
    // 'fromTo',
  ];
  transactionsData = new MatTableDataSource<any>();

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

  myUser:any = {};
  rangeBets = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });
  lengthBets = 0;
  pageIndexBets = 1;
  lengthTrans = 0;
  pageIndexTrans = 1;
  pageSize = this.sharedService.defaultPageSize;
  bettingHistoryData = new MatTableDataSource<any>();

  constructor(private fb: FormBuilder,  private router: Router, private dataService:DataService, public sharedService:SharedFunctionsService, public authService:AuthService) {}
  ngOnInit(): void {
    this.loadUser()
    this.loadBets()
    this.loadUsersTransactions();

    this.changePasswordForm = this.fb.group({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      newPasswordConfirm: new FormControl(null, Validators.required),
    });


  }

  loadUser(){
    debugger
    this.dataService.getUserById(this.authService.decodedToken.id).subscribe(resp =>{
      debugger
      this.myUser = resp;
    },error =>{
      debugger
      //redirect to error page
    })
  }

  loadBets(){
    let start = this.sharedService.formatDate(this.rangeBets.controls.start.value.getDate(),this.rangeBets.controls.start.value.getMonth()+1,this.rangeBets.controls.start.value.getFullYear()) 
    let end = this.sharedService.formatDate(this.rangeBets.controls.end.value.getDate(),this.rangeBets.controls.end.value.getMonth()+1,this.rangeBets.controls.end.value.getFullYear()) 
   
    this.dataService.getBets(this.pageIndexBets, this.pageSize, '', '','','','','','',start,end).subscribe(resp =>{
     this.lengthBets = resp.body.pagingInfo.totalCount
     this.bettingHistoryData.data = resp.body.items;
   }, error =>{
     // redirect somewhere
   })
  }

  loadUsersTransactions(){

     
    let start = this.sharedService.formatDate(this.rangeTrans.controls.start.value.getDate(),this.rangeTrans.controls.start.value.getMonth()+1,this.rangeTrans.controls.start.value.getFullYear()) 
    let end = this.sharedService.formatDate(this.rangeTrans.controls.end.value.getDate()+1,this.rangeTrans.controls.end.value.getMonth()+1,this.rangeTrans.controls.end.value.getFullYear()) 

    let id = this.authService.decodedToken.id;
    this.dataService.getTransactions(this.pageIndexTrans, this.pageSize, id, '', '','', start,end).subscribe(resp =>{
      this.lengthTrans= resp.body.pagingInfo.totalCount;
       
      this.transactionsData.data = resp.body.items;
    }, error =>{
      // redirect somewhere
    })
   }

  disableReloadBtn(form:any){
    if(form.start.value == null || form.end.value == null){
      return true;
    }
    return false;
   }

   updatePageBets(page:any) {
    this.pageSize = page.pageSize;
    this.pageIndexBets = page.pageIndex + 1;

    this.loadBets();
  }

  updatePageTrans(page:any) {
   this.pageSize = page.pageSize;
   this.pageIndexTrans = page.pageIndex + 1;

   this.loadUsersTransactions();
 }

}

const FORECAST: any[] = [
  { market: 1, startDate: '28/07/2021', liability: 1.0079, profit: 500 },
];

const PL: any[] = [
  {
    user: 'Sami',
    pl: 20.5,
    mpl: 1.0079,
    pt: 50,
    commission: 0.5,
    currentCommission: 4,
    total: 18.5,
    mTotal: 19,
  },
];

const totalPL: any[] = [
  {
    user: 'Amro',
    pl: 20.5,
    mpl: 1.0079,
    pt: 50,
    commission: 0.5,
    currentCommission: 4,
    total: 18.5,
    mTotal: 19,
  },
];

const casinoTotal: any[] = [
  {
    user: 'Some',
    pl: 20.5,
    mpl: 1.0079,
    pt: 50,
    commission: 0.5,
    currentCommission: 4,
    total: 18.5,
    mTotal: 19,
  },
];

const transactions: any[] = [
  {
    date: '29/07/2001',
    transactionNo: 21421,
    transactionTypes: 'System/Internal',
    debits: 200,
    credits: 500,
    balance: 220,
    comment: 'test',
    fromTo: 'test -> testing',
  },
];
