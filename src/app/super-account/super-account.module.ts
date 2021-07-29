import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAccountRoutingModule } from './super-account-routing.module';
import { SuperAccountComponent } from './super-account.component';
import { SharedModule } from '../shared/shared.module';
import { SubAccountDetailsComponent } from './sub-account-details/sub-account-details.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { MainDatatableComponent } from './main-datatable/main-datatable.component';
import { AddMasterModalComponent } from './add-master-modal/add-master-modal.component';
import { EditMasterModalComponent } from './edit-master-modal/edit-master-modal.component';
import { DepositMasterModalComponent } from './deposit-master-modal/deposit-master-modal.component';
import { WithdrawMasterModalComponent } from './withdraw-master-modal/withdraw-master-modal.component';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';


@NgModule({
  declarations: [
    SuperAccountComponent,
    SubAccountDetailsComponent,
    AccountDetailsComponent,
    MainDatatableComponent,
    AddMasterModalComponent,
    EditMasterModalComponent,
    DepositMasterModalComponent,
    WithdrawMasterModalComponent,
    ChangePasswordModalComponent
  ],
  imports: [
    CommonModule,
    SuperAccountRoutingModule,
    SharedModule
  ]
})
export class SuperAccountModule { }
