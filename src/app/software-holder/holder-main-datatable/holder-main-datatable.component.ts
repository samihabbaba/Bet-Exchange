import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';
import { ActivationModalComponent } from 'src/app/shared/activation-modal/activation-modal.component';
import { ConfirmationMessageComponent } from 'src/app/shared/confirmation-message/confirmation-message.component';
// import { MasterUser } from 'src/app/models/master-user';
import { AddSuperModalComponent } from '../add-super-modal/add-super-modal.component';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';
// import { DepositMasterModalComponent } from '../deposit-master-modal/deposit-master-modal.component';
import { DepositSuperModalComponent } from '../deposit-super-modal/deposit-super-modal.component';
// import { EditMasterModalComponent } from '../edit-master-modal/edit-master-modal.component';
import { EditSuperModalComponent } from '../edit-super-modal/edit-super-modal.component';
// import { WithdrawMasterModalComponent } from '../withdraw-master-modal/withdraw-master-modal.component';
import { WithdrawSuperModalComponent } from '../withdraw-super-modal/withdraw-super-modal.component';

@Component({
  selector: 'app-holder-main-datatable',
  templateUrl: './holder-main-datatable.component.html',
  styleUrls: ['./holder-main-datatable.component.css']
})
export class HolderMainDatatableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource: MatTableDataSource<any>  = new MatTableDataSource<any>();
  
  length = 0;
  pageIndex = 1;
  pageSize = this.sharedFunctions.defaultPageSize;

  displayedColumns: string[] = [
    // 'id',
    'userName',
    'name',
    'email',
    'phoneNumber',
    // 'risk',
    // 'minRisk',
    // 'maxRisk',
    'commission',
    'profitCommission',
    'unsettledCommission',
    'wallet balance',
    'isActive',
    'isSuspended',
    // 'role',
    'currency',
    // 'account',
    // 'availableBalance',
    // 'exposure',
    // 'subAccountBalance',
    // 'subAccountBalanceWithExposure',
    // 'totalBalance',
    // 'status',
    'actions',
  ];
  // users: any[] = [
  //   {
  //     id: '1',
  //     account: 'Sami',
  //     availableBalance: 80,
  //     exposure: 90,
  //     subAccountBalance: 24,
  //     subAccountBalanceWithExposure: 56,
  //     totalBalance: 32,
  //     status: 'active',
  //     actions: '',
  //   },
  //   {
  //     id: '2',
  //     account: 'Amro',
  //     availableBalance: 50,
  //     exposure: 70,
  //     subAccountBalance: 29,
  //     subAccountBalanceWithExposure: 56,
  //     totalBalance: 32,
  //     status: 'active',
  //     actions: '',
  //   },
  //   {
  //     id: '3',
  //     account: 'Ibrahim',
  //     availableBalance: 50,
  //     exposure: 30,
  //     subAccountBalance: 99,
  //     subAccountBalanceWithExposure: 56,
  //     totalBalance: 22,
  //     status: 'active',
  //     actions: '',
  //   },
  //   {
  //     id: '4',
  //     account: 'Hyeladi',
  //     availableBalance: 30,
  //     exposure: 20,
  //     subAccountBalance: 59,
  //     subAccountBalanceWithExposure: 54,
  //     totalBalance: 52,
  //     status: 'suspended',
  //     actions: '',
  //   },

  //   {
  //     id: '5',
  //     account: 'Faize',
  //     availableBalance: 90,
  //     exposure: 28,
  //     subAccountBalance: 109,
  //     subAccountBalanceWithExposure: 54,
  //     totalBalance: 62,
  //     status: 'suspended',
  //     actions: '',
  //   },

  //   {
  //     id: '6',
  //     account: 'Isam',
  //     availableBalance: 10,
  //     exposure: 28,
  //     subAccountBalance: 5,
  //     subAccountBalanceWithExposure: 34,
  //     totalBalance: 62,
  //     status: 'inactive',
  //     actions: '',
  //   },

  //   {
  //     id: '7',
  //     account: 'Khader',
  //     availableBalance: 20,
  //     exposure: 98,
  //     subAccountBalance: 54,
  //     subAccountBalanceWithExposure: 8,
  //     totalBalance: 82,
  //     status: 'active',
  //     actions: '',
  //   },
  // ];

  constructor(private router: Router, public dialog: MatDialog, private dataService:DataService, public sharedFunctions:SharedFunctionsService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.dataService.getAllUsers({
      PageNo:this.pageIndex,
      PageSize:this.pageSize,
      ParentId:'',
      Role:'SuperAdmin'
    }).subscribe(resp => {

      this.dataSource.data = resp.items
    }, error => {

    })
  }

  updatePage(page:any) {
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex + 1;

    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAvailableBalance() {
    return this.dataSource.data
      .map((t) => t.availableBalance)
      .reduce((acc, value) => acc + value, 0);
  }

  getExposure() {
    return this.dataSource.data
      .map((t) => t.exposure)
      .reduce((acc, value) => acc + value, 0);
  }

  getSubAccountBalance() {
    return this.dataSource.data
      .map((t) => t.subAccountBalance)
      .reduce((acc, value) => acc + value, 0);
  }

  getSubAccountBalanceWithExposure() {
    return this.dataSource.data
      .map((t) => t.subAccountBalanceWithExposure)
      .reduce((acc, value) => acc + value, 0);
  }

  getTotalBalance() {
    return this.dataSource.data
      .map((t) => t.totalBalance)
      .reduce((acc, value) => acc + value, 0);
  }

  openDetails(id: string) {
    this.router.navigate([`software-holder/supers/${id}`]);
  }

  openAddMasterDialog() {
    const dialogRef = this.dialog.open(AddSuperModalComponent,{
      data:{
        roleToCreate:'SuperAdmin',
        createrRole:'SoftwareHolder'
      }
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.sharedFunctions.delay(500);
      console.log(`Dialog result: ${result}`);
      this.loadUsers();
    });
  }

  openEditMasterDialog(obj:any) {
    let objToSend = {...obj, commission : obj.commission *100}
    const dialogRef = this.dialog.open(EditSuperModalComponent, {
      data: objToSend,
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.sharedFunctions.delay(500);
      console.log(`Dialog result: ${result}`);
      this.loadUsers();
    });
  }

  openDepositMasterDialog(obj: any) {
    const dialogRef = this.dialog.open(DepositSuperModalComponent, {
      data: {...obj},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadUsers();
    });
  }

  openWithdrawMasterDialog(obj: any) {


    const dialogRef = this.dialog.open(WithdrawSuperModalComponent, {
      data: {...obj},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadUsers();
    });
  }

  openChangePasswordDialog(id?: string) {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      data: { id: id},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openActivationDialog(obj:any){

    const dialogRef = this.dialog.open(ActivationModalComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadUsers();
    });
  }

  openConfirmDialog(obj:any,functionToCall:number){
 
    let confirmMsg= '';
    let successMsg= '';
    let errorMsg= '';
    if(functionToCall == 4){

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
      }
    });
  
    dialogRef.afterClosed().subscribe( async (result) => {
      if(functionToCall == 4){
        this.loadUsers();
      }
    });
  }
  
}
