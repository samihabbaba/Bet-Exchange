import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterAccountRoutingModule } from './master-account-routing.module';
import { MasterAccountComponent } from './master-account.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MasterAccountComponent
  ],
  imports: [
    CommonModule,
    MasterAccountRoutingModule,
    SharedModule
  ]
})
export class MasterAccountModule { }
