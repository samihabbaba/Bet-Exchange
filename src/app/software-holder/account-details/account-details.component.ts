import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { contentInOut } from 'src/app/animations/animation';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';
import { BetDetailsComponent } from 'src/app/shared/bet-details/bet-details.component';
import { BetSettleModalComponent } from 'src/app/shared/bet-settle-modal/bet-settle-modal.component';
import { ConfirmationMessageComponent } from 'src/app/shared/confirmation-message/confirmation-message.component';
import { RisksTableComponent } from 'src/app/shared/risks-table/risks-table.component';
import { SetMyCommissionComponent } from 'src/app/shared/set-my-commission/set-my-commission.component';
import { UpdateRiskComponent } from 'src/app/shared/update-risk/update-risk.component';
import { AddBettingRuleComponent } from '../add-betting-rule/add-betting-rule.component';
import { DeleteBettingRuleComponent } from '../delete-betting-rule/delete-betting-rule.component';
import { Subscription } from 'rxjs';

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
  rangeTransSub = new FormGroup({
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
  forecastData = new MatTableDataSource<any>();

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
  pLData = new MatTableDataSource<any>();

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
  totalPLData = new MatTableDataSource<any>();

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
  casinoTotalData = new MatTableDataSource<any>();

  // Transactions Section
  displayedColumnsTransactions: string[] = [
    // 'transactionNo',
    'type',
    'user',
    'balanceBefore',
    'amount',
    'balanceAfter',
    // 'balance change',
    // 'balance',
    // 'currency',
    'date',
    'comment',
    // 'exchangeRate',
    // 'fromTo',
  ];
  transactionsData = new MatTableDataSource<any>();
  transactionsSubData = new MatTableDataSource<any>();

  
  // bettingRule Section
  displayedColumnsBettingRules: string[] = [
    // 'id',
    'eventTypeId',
    'category',
    'betType',
    'minAmount',
    'maxAmount',
    'multiplier',
    'minMatch',
    'minOdds',
    'maxMargin',
    'isActive',
    'disableOnFalse',
    'forceRule',
    'actions',
  ];
  bettingRulesData = new MatTableDataSource<any>();

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
    'actions',
    // 'avgOddsMatched',
  ];


  sportsData = new MatTableDataSource<any>();
  displayedColumnsSports: string[] = [
    'id',
    'name',
    'isActive',
    // 'actions',
  ];
  
  regionsData = new MatTableDataSource<any>();
  displayedColumnsRegions: string[] = [
    'countryCode',
    'name',
    'isActive',
    // 'actions',
  ];

  
  leaguesData = new MatTableDataSource<any>();
  displayedColumnsLeagues: string[] = [
    'id',
    'name',
    'category',
    'isActive',
    // 'actions',
  ];

  myUser:any = {
    role:'Client'
  };
  rangeBets = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });
  lengthBets = 0;
  pageIndexBets = 1;
  lengthTrans = 0;
  pageIndexTrans = 1;
  lengthTransSub = 0;
  pageIndexTransSub = 1;
  lengthBettingRules = 0;
  pageIndexBettingRules = 1;
  pageSize = this.sharedService.defaultPageSize;
  bettingHistoryData = new MatTableDataSource<any>();

  sportsList:any =[]
  regionsList:any =[]
  leaguesList:any =[]
  currentSportIdForRegions = ''
  currentSportIdForLeagues = ''
  currentRegionIdForLeagues = ''
  
  transactionType1=''
  transactionType2=''
  directParentTrans=false

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
  screenObserver$?: Subscription;
  screenSize='';
  
  constructor(private fb: FormBuilder,  private router: Router, private dataService:DataService
    , public sharedService:SharedFunctionsService, public authService:AuthService, 
    public dialog: MatDialog, private notify:NotificationService, private layoutService:LayoutService, private screenSizeService:ScreenSizeService) {
      this.userQuestionUpdate.pipe(
        debounceTime(800),
        distinctUntilChanged())
        .subscribe(value => {
          this.loadBets();
        });

        this.screenObserver$ = this.screenSizeService.currentScreenSize.subscribe( resp =>
            {
              this.screenSize = resp
            }
        )
    }
  ngOnInit(): void {
    this.loadUser()
    this.loadBets()
    this.loadSports(true);

    if(this.authService.decodedToken.role == 'SoftwareHolder'){
      this.loadBettingRules();
    }

    if(this.authService.decodedToken.role !== 'Client'){
      this.loadUsersTransactionsSub();
    }

    
    this.layoutService.mainContentDisplayType.next('other');

    this.changePasswordForm = this.fb.group({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmNewPassword: new FormControl(null, Validators.required),
    }, {validator: this.passwordMatchValidator});

  }

  secondStageLoads(){
    this.loadSubAccounts();
    this.loadUsersTransactions();
    this.setRoleOptions();
  }

  passwordMatchValidator(g: any){
    return g.get('newPassword').value === g.get('confirmNewPassword').value ? null : {'mismatch': true};
  }

  updatePassword(){
    this.dataService.updateMyPassword(this.changePasswordForm.value).subscribe(resp =>{
      this.notify.success('Password Changed Successfully');
      this.changePasswordForm.reset();
    }, error => {
      this.sharedService.showErrorMsg(error, 'Error updating user')
    })
  }
  
  loadUser(){

    this.dataService.getUserById(this.authService.decodedToken.id).subscribe(resp =>{
      debugger
      this.myUser = resp;
      this.secondStageLoads();
    },error =>{

      //redirect to error page
    })
  }

  loadBets(){
    let endD = new Date(this.rangeBets.controls.end.value);
    endD.setDate(endD.getDate() + 1);
    
    let start = this.sharedService.formatDate(this.rangeBets.controls.start.value.getDate(),this.rangeBets.controls.start.value.getMonth()+1,this.rangeBets.controls.start.value.getFullYear()) 
    let end = this.sharedService.formatDate(endD.getDate(),endD.getMonth()+1,endD.getFullYear(), true) 
    this.dataService.getBets(this.pageIndexBets, this.pageSize, this.userIdForBets, this.parentIdForBets, this.betTypeForBets,'','',this.sportIdForBets,'',start,end, this.onActionDateForBets, this.usernameForBets, this.statusForBets).subscribe(resp =>{
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
    let id = this.authService.decodedToken.id;
    let directParent = false;
    let parentId = '';
    if(this.authService.decodedToken.role == 'SoftwareHolder'){
      // parentId = id;
      directParent = true;
      id = '';
    }
    this.dataService.getTransactions(this.pageIndexTrans, this.pageSize, id, '', '',parentId, start,end,directParent,this.transactionType1 ).subscribe(resp =>{
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

    let id = '';
    // let id = this.authService.decodedToken.id;
    
    if(this.authService.decodedToken.role == 'SoftwareHolder'){
      id = '';
    }

    this.dataService.getTransactions(this.pageIndexTransSub , this.pageSize, '', '', '',id, start,end,this.directParentTrans, this.transactionType2 ).subscribe(resp =>{
      this.lengthTransSub= resp.body.pagingInfo.totalCount;
      this.transactionsSubData.data = resp.body.items;
    }, error =>{

      // redirect somewhere
    })
   }

   updatePageTransSub(page:any) {
    this.pageSize = page.pageSize;
    this.pageIndexTransSub = page.pageIndex + 1;
 
    this.loadUsersTransactionsSub();
  }

   loadBettingRules(){

    this.dataService.getBettingRules(this.pageIndexBettingRules, this.pageSize ).subscribe(resp =>{

      this.lengthBettingRules= resp.body.pagingInfo.totalCount;
      this.bettingRulesData.data = resp.body.items;
    }, error =>{

      // redirect somewhere
    })
   }

   loadSports(loadAfter = false){
     this.dataService.getSports().subscribe(resp => {

       this.sportsList = resp.body.sort((a:any, b:any) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
       this.sportsData.data = resp.body.sort((a:any, b:any) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
       
       if(this.currentSportIdForRegions === ''){
         this.currentSportIdForRegions = resp.body[0].id;
       }
       if(this.currentSportIdForLeagues === ''){
         this.currentSportIdForLeagues = resp.body[0].id;
       }
       this.sportForRegionChange()
       if(loadAfter){
         this.loadRegions(true);
       }
     })
   }

   loadRegions(loadAfter = false){
    this.dataService.getAllRegions('',null).subscribe(resp =>{
      this.regionsList = resp.body;
      this.regionsData.data = resp.body;
      this.sportForRegionChange()
      this.currentRegionIdForLeagues = resp.body[0].countryCode;
      if(loadAfter){
        this.loadLeagues();
      }
    })
   }

   loadLeagues(){
     this.dataService.getAllLeagues(this.currentSportIdForLeagues,this.currentRegionIdForLeagues).subscribe(resp =>{
       this.leaguesList = resp.body;
       this.leaguesData.data = resp.body;
     })
   
    }

    openEventDetail(id:any, Live=true){
      this.router.navigateByUrl('home').then( x=>
        {
          if(Live){
            this.dataService.loadMarketsForGameLive(id);
          }
          else{
            this.dataService.loadMarketsForGamePre(id);
          }
        }
      )
    }

    openMarketsForEvent(obj:any){
        if(obj.selectionType === 'UPCOMING'){
          this.dataService.getUpcomingById(obj.selection.eventId).subscribe(resp => {
        this.openEventDetail(obj.selection.eventId, false)

          }, error => {
            this.dataService.getLIveById(obj.selection.eventId).subscribe(resp =>{
              this.openEventDetail(obj.selection.eventId)
            },
            error => {
              this.notify.error('Can\'t open event details at the moment')
            })
          })
        }
        else if(obj.selectionType === 'LIVE'){
          this.dataService.getLIveById(obj.selection.eventId).subscribe(resp =>{
            this.openEventDetail(obj.selection.eventId)
      
            },
            error => {
              this.notify.error('Can\'t open event details at the moment')
            })
        }
    }

   openBetDetail(obj:any) {

    const dialogRef = this.dialog.open(BetDetailsComponent,{
      data:obj
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
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

 updatePageBettingRules(page:any){
  this.pageSize = page.pageSize;
  this.pageIndexBettingRules = page.pageIndex + 1;

  this.loadBettingRules();
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
    this.loadBets();
  });
  }

  
 openConfirmDialog(obj:any,functionToCall:number){

  let confirmMsg= '';
  let successMsg= '';
  let errorMsg= '';
  if(functionToCall == 1){
     confirmMsg= 'Are You Sure You want to toggle activation ?';
     successMsg= 'Sport updated';
     errorMsg= 'Error on sport update';
  }
  else if(functionToCall == 2){
    confirmMsg= 'Are You Sure You want to toggle activation ?';
     successMsg= 'Region updated';
     errorMsg= 'Error on region update';
  }
  else if(functionToCall == 3){
    confirmMsg= 'Are You Sure You want to toggle activation ?';
     successMsg= 'League updated';
     errorMsg= 'Error on league update';
  }
  else if(functionToCall == 4){

    confirmMsg= obj.isSuspended? 'Are You Sure You want to unsuspend user ?': 'Are You Sure You want to suspend user ?';
    successMsg= 'User Updated';
    errorMsg= 'Error on user update';
 }

  const dialogRef = this.dialog.open(ConfirmationMessageComponent,{
    data:{
      obj:obj,
      functionToCall:functionToCall,
      confirmMsg:confirmMsg,
      successMsg:successMsg,
      errorMsg:errorMsg,
      sportId:this.currentSportIdForRegions
    }
  });

  dialogRef.afterClosed().subscribe( async (result) => {
    await this.delay(1000);
    if(functionToCall == 1){
      this.loadSports();
    }
    else if(functionToCall == 2){
      this.loadSports();
      this.loadRegions();
    } 
    else if(functionToCall == 3){
      this.loadLeagues();
    } else if(functionToCall == 4){
      this.loadSubAccounts();
    }
  });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  addBettingRule(obj?:any){

    let dataToSend:any = {update:false}
    if(obj){
      dataToSend = {
        update:true,
        obj:obj
      };
    }

    const dialogRef = this.dialog.open(AddBettingRuleComponent, {
      data:dataToSend,
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(`Dialog result: ${result}`);
      await this.delay(1000);
      this.loadBettingRules();
    });
  }

  deleteBettingRule(obj?:any){
    const dialogRef = this.dialog.open(DeleteBettingRuleComponent, {
      data:obj,
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(`Dialog result: ${result}`);
      await this.delay(1000);
      this.loadBettingRules();
    });
  }

  notActiveRegions:any =[]
  sportForRegionChange2(){
    let index = this.sportsList.findIndex((x:any)=> x.id == this.currentSportIdForRegions)
    this.notActiveRegions = this.sportsList[index].deactivatedRegions;
  }

  isRegionActive(code:any){
    return !this.notActiveRegions.some((x:any)=> x.countryCode == code);
  }

  sportForRegionChange(){

    let index = this.sportsList.findIndex((x:any)=> x.id == this.currentSportIdForRegions)
    this.notActiveRegions = this.sportsList[index].deactivatedRegions;

    let newRegions:any = []
    this.regionsData.data.forEach(element => {
      newRegions.push(
        {
          ...element,
          isActiveForSport: !this.notActiveRegions.some((x:any)=> x.countryCode == element.countryCode)
        }
      )
    });

    this.regionsData.data = newRegions;
  }

  setUserIdForBet(username='', userId=''){
    this.usernameForBets = '';
    this.userIdForBets = userId;
    this.usernameForIdForBets = 'User: ' + username;

    this.loadBets();
  }

  updateLeague(league:any, evt?:any){

    // for radio btns check
    if(evt){
      let target = evt.target;
      if (target.checked) {
        league.category = target.defaultValue
      } else {
      return
      }
    }

    this.dataService.updateLeague(league).subscribe(resp => {
      this.notify.success('League updated')
    }, error =>{
      this.notify.error('Error updating league')
      this.loadLeagues();
    })
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

  openRiskUpdateDialog(obj:any){
    this.dataService.getRisk(obj.id).subscribe((resp:any) => {

      let masterRisk = resp.body[0].risks[resp.body[0].risks.findIndex((x:any)=>x.userId == obj.id)].risk
      let parent = this.sharedService.getUserParent(obj);
      let adminRisk = resp.body[0].risks[resp.body[0].risks.findIndex((x:any)=>x.userId == parent.id)].risk
      let minRisk = parent.minRisk;
      let maxRisk = parent.maxRisk;

      let objToSend = {
        masterId : obj.id,
        adminRisk:adminRisk,
        masterRisk:masterRisk,
        minRisk:minRisk,
        maxRisk:maxRisk,
      }
    const dialogRef = this.dialog.open(UpdateRiskComponent, {
      data: objToSend,
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.sharedService.delay(500);
      console.log(`Dialog result: ${result}`);
      this.loadUser();
    });

    }, error =>{
      this.notify.error("Error getting Risk")
    })

    
  }

  
  openCommissionUpdateDialog(obj:any){
debugger
    let width = '50%';
    if(this.screenSize == 'xs' || this.screenSize == 'sm'){
      width = '80%'
    } else if(this.screenSize == 'md' ){
      width = '75%'
    }
    // else if(this.screenSize == 'md' || this.screenSize == 'sm'){
    //   width = '80%'
    // }
    this.dataService.getUserById(obj.id).subscribe((resp:any) => {

      let objToSend = {
        user:resp
      }
    const dialogRef = this.dialog.open(SetMyCommissionComponent, {
      data: objToSend,
      width: '30%',
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.sharedService.delay(500);
      console.log(`Dialog result: ${result}`);
      this.loadUser();
    });

    }, error =>{
      this.notify.error("Error getting User info")
    })

    
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

  updateSport(sport:any){

    this.dataService.toggleSportActive(sport.id).subscribe(resp => {

      this.notify.success(`Sport ${sport.name} updated`);
    }
    , error => {
      sport.isActive = !sport.isActive;
      this.notify.error(`Error updating sport ${sport.name}`)
    })
  }

  updateRegion(region:any){

    this.dataService.toggleRegionActivationForSport(this.currentSportIdForRegions, region.countryCode).subscribe(resp => {

      let index = this.sportsList.findIndex((x:any)=> x.id == this.currentSportIdForRegions)

      if(region.isActiveForSport){
        let i = this.sportsList[index].deactivatedRegions.findIndex((x:any)=>x.countryCode == region.countryCode)
        if(i>-1){
          this.sportsList[index].deactivatedRegions.splice(i, 1);
        }
      }
      else{
        this.sportsList[index].deactivatedRegions.push({
          countryCode: region.countryCode,
          name: region.name
        });
      }
      
      this.notActiveRegions = this.sportsList[index].deactivatedRegions;

      this.notify.success(`Region ${region.name} updated for sport ${ this.sportsList[index].name}`);
    }
    , error => {
      region.isActiveForSport = !region.isActiveForSport;
      let index = this.sportsList.findIndex((x:any)=> x.id == this.currentSportIdForRegions)
      this.notify.error(`Error updating region ${region.name} for sport ${ this.sportsList[index].name}`)
    })
  }

  //////////////////////// sub accounts work

  lengthSubs = 0;
  pageIndexSubs = 1;
  subsData = new MatTableDataSource<any>()
  roleSearch = '';
  resetAccounts = true;

  displayedColumnsSubAccounts: string[] = [
    'userName',
    'name',
    'role',
    // 'email',
    // 'phoneNumber',
    'commission',
    'profitCommission',
    // 'unsettledCommission',
    'currency',
    'wallet balance',
    'isActive',
    'isSuspended',
    'actions',
  ];

  roles = [
    {i:0,name:'SoftwareHolder'},
    {i:1,name:'SuperAdmin'},
    {i:2,name:'Admin'},
    {i:3,name:'Master'},
    {i:4,name:'Client'}
  ]
  rolesOptions:any = [];
  currentSubId='';
  allUsersSearch:any = [];
  subAccountsObj:any = {
    SuperAdmin: {role:'SuperAdmin', data:[]},
    Admin: {role:'Admin', data:[]},
    Master: {role:'Master', data:[]},
    Client: {role:'Client', data:[]},
  }
  superAdminIdSearch = '';
  adminIdSearch = '';
  masterIdSearch = '';
  clientIdSearch = '';

  loadSubAccounts(){
   
    if(this.currentSubId == ''){
      this.currentSubId = this.myUser.id;
    }
    this.dataService.getAllUsers({
      PageNo:this.pageIndexSubs,
      PageSize:this.pageSize,
      parentId:this.currentSubId,
      Role:this.roleSearch
    }).subscribe(resp =>{
      this.subsData.data = resp.items;
      if(this.resetAccounts){
        this.setAvailableUser();
      }
     this.lengthSubs = resp.pagingInfo.totalCount
   }, error =>{
     // redirect somewhere
   })
  }

  setRoleOptions(){
    this.rolesOptions=[];
    let currentI = this.roles[this.roles.findIndex(x=>x.name == this.myUser.role)].i
    this.roles.forEach((element:any) => {
      if(element.i > currentI) {
        this.rolesOptions.push(element);
      }
    });
  }

  updatePageSubs(page:any) {
    this.pageSize = page.pageSize;
    this.pageIndexSubs = page.pageIndex + 1;

    this.loadSubAccounts();
  }

  setAvailableUser(){
    this.resetAccounts = false;

    this.allUsersSearch = this.subsData.data;
    this.subAccountsObj.SuperAdmin.data = this.allUsersSearch.filter((x:any)=>x.role =='SuperAdmin')
    this.subAccountsObj.Admin.data = this.allUsersSearch.filter((x:any)=>x.role =='Admin')
    this.subAccountsObj.Master.data = this.allUsersSearch.filter((x:any)=>x.role =='Master')
    this.subAccountsObj.Client.data = this.allUsersSearch.filter((x:any)=>x.role =='Client')
  }

  userDropdownChange(roleId:any, parentRoleId:any, role:any, roleLower:any){
    if(roleId == ''){
      if(parentRoleId !='-1'){
        this.currentSubId = parentRoleId;
      }else{
        this.currentSubId = this.myUser.id;
      }
    }
    else{
      this.currentSubId = roleId;
      this.setSubArray(roleLower,roleId)
    }
    
  }
  
  setSubArray(role:any, id:any){
    this.subAccountsObj[role].data = this.allUsersSearch.filter((x:any)=> x.role == role && x.parentHeirarchy[x.parentHeirarchy.findIndex((y:any)=> y.depth ==0)].id == id)
  }

  disableAdminSearch(){
    if(this.roleSearch !== ''){
      return true;
    }
    if(this.myUser.role == 'SuperAdmin'){
      return false
    }
    return this.superAdminIdSearch===''
  }
  
  disableMasterSearch(){
    if(this.roleSearch !== ''){
      return true;
    }
    if(this.myUser.role == 'Admin'){
      return false
    }
    return this.adminIdSearch===''
  }

}
