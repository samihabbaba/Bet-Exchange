import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareHolderRoutingModule } from './software-holder-routing.module';
import { SoftwareHolderComponent } from './software-holder.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SoftwareHolderComponent,
    AccountDetailsComponent
  ],
  imports: [
    CommonModule,
    SoftwareHolderRoutingModule,
    SharedModule
  ]
})
export class SoftwareHolderModule { }
