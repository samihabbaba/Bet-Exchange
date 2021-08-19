import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAccountRoutingModule } from './admin-account-routing.module';
import { AdminAccountComponent } from './admin-account.component';
import { AdminDatatableComponent } from './admin-datatable/admin-datatable.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminAccountComponent,
    AdminDatatableComponent
  ],
  imports: [
    CommonModule,
    AdminAccountRoutingModule,
    SharedModule
  ]
})
export class AdminAccountModule { }
