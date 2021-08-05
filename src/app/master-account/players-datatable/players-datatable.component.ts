import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PlayerUser } from 'src/app/models/player-user';
import { AddPlayerModalComponent } from '../add-player-modal/add-player-modal.component';
import { ChangePlayerPasswordModalComponent } from '../change-player-password-modal/change-player-password-modal.component';
import { EditPlayerModalComponent } from '../edit-player-modal/edit-player-modal.component';
import { ExposureLimitModalComponent } from '../exposure-limit-modal/exposure-limit-modal.component';

@Component({
  selector: 'app-players-datatable',
  templateUrl: './players-datatable.component.html',
  styleUrls: ['./players-datatable.component.css']
})
export class PlayersDatatableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource: MatTableDataSource<PlayerUser>;

  displayedColumns: string[] = [
    'account',
    'exposure',
    'subAccountBalance',
    'subAccountBalanceWithExposure',
    'depositWithdraw',
    'creditReference',
    'status',
    'actions',
  ];
  users: any[] = [
    {
      id: '1',
      account: 'Sami',
      exposure: 90,
      subAccountBalance: 24,
      subAccountBalanceWithExposure: 56,
      creditReference: 32,
      status: 'active',
      actions: '',
    },
    {
      id: '2',
      account: 'Amro',
      exposure: 70,
      subAccountBalance: 29,
      subAccountBalanceWithExposure: 56,
      creditReference: 32,
      status: 'active',
      actions: '',
    },
    {
      id: '3',
      account: 'Ibrahim',
      exposure: 30,
      subAccountBalance: 99,
      subAccountBalanceWithExposure: 56,
      creditReference: 22,
      status: 'active',
      actions: '',
    },
    {
      id: '4',
      account: 'Hyeladi',
      exposure: 20,
      subAccountBalance: 59,
      subAccountBalanceWithExposure: 54,
      creditReference: 52,
      status: 'suspended',
      actions: '',
    },

    {
      id: '5',
      account: 'Faize',
      exposure: 28,
      subAccountBalance: 109,
      subAccountBalanceWithExposure: 54,
      creditReference: 62,
      status: 'suspended',
      actions: '',
    },

    {
      id: '6',
      account: 'Isam',
      exposure: 28,
      subAccountBalance: 5,
      subAccountBalanceWithExposure: 34,
      creditReference: 62,
      status: 'inactive',
      actions: '',
    },

    {
      id: '7',
      account: 'Khader',
      exposure: 98,
      subAccountBalance: 54,
      subAccountBalanceWithExposure: 8,
      creditReference: 82,
      status: 'active',
      actions: '',
    },
  ];

  constructor(private router: Router, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit() {}

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

  getCreditReference() {
    return this.dataSource.data
      .map((t) => t.creditReference)
      .reduce((acc, value) => acc + value, 0);
  }

  openDetails(id: string) {
    this.router.navigate([`master/players/${id}`]);
  }

  openAddPlayerDialog() {
    const dialogRef = this.dialog.open(AddPlayerModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditPlayerDialog(id?: string) {
    const dialogRef = this.dialog.open(EditPlayerModalComponent, {
      data: {balance: 100, id: 'Master Id'},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openExposureLimitDialog(id?: string) {
    const dialogRef = this.dialog.open(ExposureLimitModalComponent, {
      data: {balance: 100, id: 'Player Id'},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openChangePasswordDialog(id?: string) {
    const dialogRef = this.dialog.open(ChangePlayerPasswordModalComponent, {
      data: {balance: 100, id: 'Player Id'},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
