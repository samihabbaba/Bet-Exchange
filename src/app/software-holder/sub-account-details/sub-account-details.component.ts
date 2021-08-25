import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { from } from 'rxjs';
import { contentInOut } from 'src/app/animations/animation';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';
import { BetDetailsComponent } from 'src/app/shared/bet-details/bet-details.component';
import { BetSettleModalComponent } from 'src/app/shared/bet-settle-modal/bet-settle-modal.component';

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
  lengthTransSub = 0;
  pageIndexTransSub = 1;
  lengthLogin = 0;
  pageIndexLogin = 1;
  pageSize = this.sharedService.defaultPageSize;
  
  rangeBets = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  rangeTrans = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });
  
  rangeTransSub = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  rangeLogin = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  range = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  displayedColumnsTransactions: string[] = [
    // 'transactionNo',
    'type',
    'amount',
    'balance change',
    // 'balance',
    'currency',
    'date',
    'comment',
    // 'exchangeRate',
    // 'fromTo',
  ];

  displayedColumnsTransactionsSub: string[] = [
    // 'transactionNo',
    'userName',
    'type',
    'amount',
    'balance change',
    // 'balance',
    'currency',
    'date',
    'comment',
    // 'exchangeRate',
    // 'fromTo',
  ];

  transactionsData = new MatTableDataSource<any>();
  transactionsSubData = new MatTableDataSource<any>();

  displayedColumnsLoginHistory: string[] = ['ip', 'createdAt', 'isSuccessfull'];
  loginHistoryData = new MatTableDataSource<any>();

  displayedColumnsProfitLoss: string[] = [
    'market',
    'startTime',
    'settledDate',
    'profitLoss',
  ];

  profitLossData = new MatTableDataSource<any>(profitLoss);

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
    'odd',
    'payout',
    // 'matchedSize',
    'status',
    'date',
    // 'lastActionDate',
    // 'eventDate',
    // 'matchedDate',
    'actions',
    // 'avgOddsMatched',
  ];


  bettingHistoryData = new MatTableDataSource<any>();
  private sub: any;
  currentUserId = '';
  currentUser:any = {};
  transactionType1=''
  transactionType2=''
  directParentTrans=false

  constructor(private route: ActivatedRoute, private dataService:DataService,
     public sharedService: SharedFunctionsService, public dialog: MatDialog, public authService:AuthService) {}

  ngOnInit(): void {

    

    this.sub = this.route.params.subscribe(params => {
      this.currentUserId = params['id']; 
      this.loadUserById();
      this.loadUsersBet();
      this.loadUsersTransactions();
      this.loadUsersTransactionsSub();
      this.loadLoginHistory();
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

    let endD = new Date(this.rangeBets.controls.end.value);
    endD.setDate(endD.getDate() + 1);
    
     let start = this.sharedService.formatDate(this.rangeBets.controls.start.value.getDate(),this.rangeBets.controls.start.value.getMonth()+1,this.rangeBets.controls.start.value.getFullYear()) 
     let end = this.sharedService.formatDate(endD.getDate(),endD.getMonth()+1,endD.getFullYear(), true) 

     this.dataService.getBets(this.pageIndexBets, this.pageSize, '', this.currentUserId,'','','','','',start,end).subscribe(resp =>{
      this.lengthBets = resp.body.pagingInfo.totalCount
      this.bettingHistoryData.data = resp.body.items;
    }, error =>{

      // redirect somewhere
    })
   }
   
   loadUsersTransactions(){

    let endD = new Date(this.rangeTrans.controls.end.value);
     endD.setDate(endD.getDate() + 1);

    let start = this.sharedService.formatDate(this.rangeTrans.controls.start.value.getDate(),this.rangeTrans.controls.start.value.getMonth()+1,this.rangeTrans.controls.start.value.getFullYear()) 
    let end = this.sharedService.formatDate(endD.getDate(),endD.getMonth()+1,endD.getFullYear(), true) 

    debugger
    this.dataService.getTransactions(this.pageIndexTrans, this.pageSize, this.currentUserId, '', '','', start,end,'',this.transactionType1).subscribe(resp =>{

      this.lengthTrans= resp.body.pagingInfo.totalCount;      
      this.transactionsData.data = resp.body.items;
    }, error =>{
      debugger
      // redirect somewhere
    })
   }

   
   loadUsersTransactionsSub(){

    let endD = new Date(this.rangeTransSub.controls.end.value);
     endD.setDate(endD.getDate() + 1);

    let start = this.sharedService.formatDate(this.rangeTransSub.controls.start.value.getDate(),this.rangeTransSub.controls.start.value.getMonth()+1,this.rangeTransSub.controls.start.value.getFullYear()) 
    let end = this.sharedService.formatDate(endD.getDate(),endD.getMonth()+1,endD.getFullYear(), true) 

    debugger
    this.dataService.getTransactions(this.pageIndexTransSub, this.pageSize, '', '', '', this.currentUserId, start,end,this.directParentTrans,this.transactionType2).subscribe(resp =>{
      debugger

      this.lengthTransSub= resp.body.pagingInfo.totalCount;      
      this.transactionsSubData.data = resp.body.items;
    }, error =>{
      debugger
      // redirect somewhere
    })
   }

   loadLoginHistory(){
    let endD = new Date(this.rangeLogin.controls.end.value);
    endD.setDate(endD.getDate() + 1);
         
    let start = this.sharedService.formatDate(this.rangeLogin.controls.start.value.getDate(),this.rangeLogin.controls.start.value.getMonth()+1,this.rangeLogin.controls.start.value.getFullYear()) 
    let end = this.sharedService.formatDate(endD.getDate(),endD.getMonth()+1,endD.getFullYear(), true) 

    this.dataService.getLoginHistory( this.currentUserId, start, end , this.pageIndexLogin, this.pageSize).subscribe(resp =>{

      this.lengthLogin= resp.body.pagingInfo.totalCount;
      this.loginHistoryData.data = resp.body.items;
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
  
  updatePageTransSub(page:any) {
    this.pageSize = page.pageSize;
    this.pageIndexTransSub = page.pageIndex + 1;
 
    this.loadUsersTransactionsSub();
  }

 openBetDetail(obj:any) {
  const dialogRef = this.dialog.open(BetDetailsComponent,{
    data:obj
  });
  dialogRef.afterClosed().subscribe((result) => {
    console.log(`Dialog result: ${result}`);
  });
}

   openBetSettleDialog(obj:any, type:string){
    let dataToSend = {
      ...obj,
      settleType:type
    }
    const dialogRef = this.dialog.open(BetSettleModalComponent,{
      data:dataToSend
    });

    dialogRef.afterClosed().subscribe( async (result) => {
      await this.delay(1000);
      this.loadUsersBet();
    });
  }

  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
