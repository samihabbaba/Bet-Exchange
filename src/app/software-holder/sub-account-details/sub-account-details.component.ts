import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { stat } from 'fs';
import { from, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { contentInOut } from 'src/app/animations/animation';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';
import { BetDetailsComponent } from 'src/app/shared/bet-details/bet-details.component';
import { BetSettleModalComponent } from 'src/app/shared/bet-settle-modal/bet-settle-modal.component';
import { PayCommissionComponent } from 'src/app/shared/pay-commission/pay-commission.component';
import { RisksTableComponent } from 'src/app/shared/risks-table/risks-table.component';

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
    'balanceBefore',
    'amount',
    'balanceAfter',
    // 'balance change',
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
    'balanceBefore',
    'amount',
    'balanceAfter',
    // 'balance change',
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
    'liability',
    'odd',
    'payout',
    'netWin',
    'actualWin',
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
  sportsList:any = [];

  //bet filter parameters
  sportIdForBets=''; //EventTypeId
  betTypeForBets='';  // BACK / LAY
  onActionDateForBets=false;
  parentIdForBets='';
  userIdForBets='';
  usernameForIdForBets='';
  statusForBets='';
  usernameForBets='';

  userQuestionUpdate = new Subject<string>();

  betTotals:any = {
    totalActualWin:0,
    totalLiability:0,
    totalNetWin:0,
    totalStake:0
  };
  
  transTotals:any = {
    totalAmount:0
  };

  transSubTotals:any = {
    totalAmount:0
  };
  
  constructor(private route: ActivatedRoute, private dataService:DataService, private notify:NotificationService,
     public sharedService: SharedFunctionsService, public dialog: MatDialog, public authService:AuthService) {
      this.userQuestionUpdate.pipe(
        debounceTime(800),
        distinctUntilChanged())
        .subscribe(value => {
          this.loadUsersBet();
        });
     }

  ngOnInit(): void {

    

    this.sub = this.route.params.subscribe(params => {
      this.currentUserId = params['id']; 
      this.parentIdForBets = this.currentUserId;
      this.loadUserById();
      
      this.loadLoginHistory();
      this.loadSports();
   });
   
  }

  secondOrderLoads(){
    this.loadUsersBet();
    this.loadUsersTransactions();
    if(this.currentUser.role !== 'Client'){
      this.loadUsersTransactionsSub();
    }
  }

  loadUserById()
   {
     this.dataService.getUserById(this.currentUserId).subscribe(resp =>{
      this.currentUser = resp;
      this.secondOrderLoads();
     }, error =>{
       // redirect somewhere
     })
   }

   loadUsersBet(){

    let endD = new Date(this.rangeBets.controls.end.value);
    endD.setDate(endD.getDate() + 1);
    
     let start = this.sharedService.formatDate(this.rangeBets.controls.start.value.getDate(),this.rangeBets.controls.start.value.getMonth()+1,this.rangeBets.controls.start.value.getFullYear()) 
     let end = this.sharedService.formatDate(endD.getDate(),endD.getMonth()+1,endD.getFullYear(), true) 

    if(this.currentUser.role == 'Client' && this.parentIdForBets != ''){
      this.userIdForBets = this.parentIdForBets;
      this.parentIdForBets = '';
    }

     this.dataService.getBets(this.pageIndexBets, this.pageSize, this.userIdForBets, this.parentIdForBets, this.betTypeForBets,'','',this.sportIdForBets,'',start,end, this.onActionDateForBets,this.usernameForBets,this.statusForBets).subscribe(resp =>{
      this.betTotals = resp.body.stats;
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

    this.dataService.getTransactions(this.pageIndexTrans, this.pageSize, this.currentUserId, '', '','', start,end,'',this.transactionType1).subscribe(resp =>{
      if(resp.body.stats == null){
        this.transTotals.totalAmount = 0;
      }
      else{
        this.transTotals = resp.body.stats
      }
      this.lengthTrans= resp.body.pagingInfo.totalCount;      
      this.transactionsData.data = resp.body.items;
    }, error =>{
      // redirect somewhere
    })
   }

   loadUsersTransactionsSub(){

    let endD = new Date(this.rangeTransSub.controls.end.value);
     endD.setDate(endD.getDate() + 1);

    let start = this.sharedService.formatDate(this.rangeTransSub.controls.start.value.getDate(),this.rangeTransSub.controls.start.value.getMonth()+1,this.rangeTransSub.controls.start.value.getFullYear()) 
    let end = this.sharedService.formatDate(endD.getDate(),endD.getMonth()+1,endD.getFullYear(), true) 

    this.dataService.getTransactions(this.pageIndexTransSub, this.pageSize, '', '', '', this.currentUserId, start,end,this.directParentTrans,this.transactionType2).subscribe(resp =>{
      if(resp.body.stats == null){
        this.transSubTotals.totalAmount = 0;
      }
      else{
        this.transSubTotals = resp.body.stats
      }
      this.lengthTransSub= resp.body.pagingInfo.totalCount;      
      this.transactionsSubData.data = resp.body.items;
    }, error =>{

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

   loadSports(loadAfter = false){
    this.dataService.getSports().subscribe(resp => {

      this.sportsList = resp.body.sort((a:any, b:any) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
      
    })
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

  openRiskTableDialog(obj:any){
    this.dataService.getRisk(obj.id).subscribe((resp:any) => {

    const dialogRef = this.dialog.open(RisksTableComponent, {
      data: resp.body,
      width: '80%',
    });
    // dialogRef.afterClosed().subscribe(async (result) => {
    //   await this.sharedService.delay(500);
    //   console.log(`Dialog result: ${result}`);
    // });

    }, error =>{
      this.notify.error("Error getting Risk")
    }) 
  }
  
  openPayCommissionDialog(obj:any){
    // if(this.currentUser.unsettledCommission <= 0){
    //   return
    // }
    const dialogRef = this.dialog.open(PayCommissionComponent,{
      data:obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadUserById(); 
    }); 
  }

  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  setUserIdForBet(username='', userId=''){
    this.usernameForBets = '';
    if(userId == ''){
      this.parentIdForBets = this.currentUserId;
    }
    else{
      this.parentIdForBets = '';
    }
    this.userIdForBets = userId;
    this.usernameForIdForBets = 'User: ' + username;

    this.loadUsersBet();
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

   showCancelBet(bet:any){
    if(this.authService.decodedToken.role === 'SoftwareHolder'){
      return true;
    }
    else if(this.authService.decodedToken.role === 'SuperAdmin' || this.authService.decodedToken.role === 'Client'){
      if(bet.status == 'UNMATCHED'){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
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
