import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
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

  lengthBets = 0;
  pageIndexBets = 1;
  lengthTrans = 0;
  pageIndexTrans = 1;
  pageSize = this.sharedService.defaultPageSize;
  
  rangeBets = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  rangeTrans = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  range = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  displayedColumnsTransactions: string[] = [
    'date',
    // 'transactionNo',
    'type',
    'amount',
    'currency',
    'balance',
    'comment',
    // 'exchangeRate',
    // 'fromTo',
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

      this.currentUser = resp;
     }, error =>{
       // redirect somewhere
     })
   }

   loadUsersBet(){
     let start = this.sharedService.formatDate(this.rangeBets.controls.start.value.getDate(),this.rangeBets.controls.start.value.getMonth()+1,this.rangeBets.controls.start.value.getFullYear()) 
     let end = this.sharedService.formatDate(this.rangeBets.controls.end.value.getDate(),this.rangeBets.controls.end.value.getMonth()+1,this.rangeBets.controls.end.value.getFullYear()) 
    
     this.dataService.getBets(this.pageIndexBets, this.pageSize, '', this.currentUserId,'','','','','',start,end).subscribe(resp =>{
      this.lengthBets = resp.body.pagingInfo.totalCount
      this.bettingHistoryData.data = resp.body.items;
    }, error =>{
      // redirect somewhere
    })
   }
   
   loadUsersTransactions(){

     
    let start = this.sharedService.formatDate(this.rangeTrans.controls.start.value.getDate(),this.rangeTrans.controls.start.value.getMonth()+1,this.rangeTrans.controls.start.value.getFullYear()) 
    let end = this.sharedService.formatDate(this.rangeTrans.controls.end.value.getDate()+1,this.rangeTrans.controls.end.value.getMonth()+1,this.rangeTrans.controls.end.value.getFullYear()) 

    
    this.dataService.getTransactions(this.pageIndexTrans, this.pageSize, this.currentUserId, '', '','', start,end).subscribe(resp =>{
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

    this.loadUsersBet();
  }

  updatePageTrans(page:any) {
   this.pageSize = page.pageSize;
   this.pageIndexTrans = page.pageIndex + 1;

   this.loadUsersTransactions();
 }

  ss:Date = new Date();   
   check(){
      
     this.ss.getDate();
     this.ss.getMonth()+1;
     this.ss.getFullYear();

     let zft= this.ss.getFullYear();
     let zftt= this.ss.toISOString();
    //  let hfa = this.start.getDate();
    //  let hfaa = this.start.getMonth()+1;
    // let hfa = this.range.controls.start.value.toDateString()
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
