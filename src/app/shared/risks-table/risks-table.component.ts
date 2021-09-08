import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-risks-table',
  templateUrl: './risks-table.component.html',
  styleUrls: ['./risks-table.component.css']
})
export class RisksTableComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sharedFunctions:SharedFunctionsService
  ) { 
    this.dataSource = new MatTableDataSource(data);
  }

  dataSource: MatTableDataSource<any>  = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'SuperAdmin',
    'Risk %1',
    'Admin',
    'Risk %2',
    'Master',
    'Risk %3',
  ];

  ngOnInit(): void {
  }

  getRiskByRole(role:string, risks:any){
    return risks[risks.findIndex((x:any)=>x.role == role)]
  }

}
