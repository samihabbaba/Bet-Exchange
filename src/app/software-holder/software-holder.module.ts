import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareHolderRoutingModule } from './software-holder-routing.module';
import { SoftwareHolderComponent } from './software-holder.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { SharedModule } from '../shared/shared.module';
import { HolderMainDatatableComponent } from './holder-main-datatable/holder-main-datatable.component';
import { AddSuperModalComponent } from './add-super-modal/add-super-modal.component';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { DepositSuperModalComponent } from './deposit-super-modal/deposit-super-modal.component';
import { EditSuperModalComponent } from './edit-super-modal/edit-super-modal.component';
import { WithdrawSuperModalComponent } from './withdraw-super-modal/withdraw-super-modal.component';
import { SubAccountDetailsComponent } from './sub-account-details/sub-account-details.component';
import { AddBettingRuleComponent } from './add-betting-rule/add-betting-rule.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DeleteBettingRuleComponent } from './delete-betting-rule/delete-betting-rule.component';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    SoftwareHolderComponent,
    AccountDetailsComponent,
    HolderMainDatatableComponent,
    AddSuperModalComponent,
    ChangePasswordModalComponent,
    DepositSuperModalComponent,
    EditSuperModalComponent,
    WithdrawSuperModalComponent,
    SubAccountDetailsComponent,
    AddBettingRuleComponent,
    DeleteBettingRuleComponent
  ],
  imports: [
    CommonModule,
    SoftwareHolderRoutingModule,
    SharedModule,
    MatSlideToggleModule,
    FormsModule,
    MatRadioModule
  ]
})
export class SoftwareHolderModule { }
