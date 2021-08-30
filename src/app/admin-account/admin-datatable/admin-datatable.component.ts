import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddSuperModalComponent } from '../../software-holder/add-super-modal/add-super-modal.component';
import { ActivationModalComponent } from 'src/app/shared/activation-modal/activation-modal.component';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';
import { DataService } from 'src/app/services/data.service';
import { DepositSuperModalComponent } from 'src/app/software-holder/deposit-super-modal/deposit-super-modal.component';
import { WithdrawSuperModalComponent } from 'src/app/software-holder/withdraw-super-modal/withdraw-super-modal.component';
import { ChangePasswordModalComponent } from 'src/app/software-holder/change-password-modal/change-password-modal.component';
import { EditSuperModalComponent } from 'src/app/software-holder/edit-super-modal/edit-super-modal.component';
import { ConfirmationMessageComponent } from 'src/app/shared/confirmation-message/confirmation-message.component';

@Component({
  selector: 'app-admin-datatable',
  templateUrl: './admin-datatable.component.html',
  styleUrls: ['./admin-datatable.component.css']
})
export class AdminDatatableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource: MatTableDataSource<any>;

  
  length = 0;
  pageIndex = 1;
  pageSize = this.sharedFunctions.defaultPageSize;

  displayedColumns: string[] = [
    'userName',
    'name',
    'email',
    'phoneNumber',
    'risk',
    'commission',
    'wallet balance',
    'isActive',
    'isSuspended',
    // 'role',
    // 'currency',
    // 'account',
    // 'availableBalance',
    // 'exposure',
    // 'subAccountBalance',
    // 'subAccountBalanceWithExposure',
    // 'totalBalance',
    // 'status',
    'actions',
  ];
  

  constructor(private router: Router, public dialog: MatDialog, private dataService:DataService, public sharedFunctions:SharedFunctionsService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){

    this.dataService.getAllUsers({
      PageNo:1,
      PageSize:5,
      rParentId:'',
      Role:'Master'
    }).subscribe(resp => {
      this.dataSource.data = resp.items
    }, error => {

    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updatePage(page:any) {
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex + 1;

    this.loadUsers();
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
    this.router.navigate([`admin/masters/${id}`]);
  }

  openAddMasterDialog() {
    const dialogRef = this.dialog.open(AddSuperModalComponent,{
      data:{
        roleToCreate:'Master',
        createrRole:'Admin'
      }
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.sharedFunctions.delay(500);
      this.loadUsers();
      console.log(`Dialog result: ${result}`);
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
