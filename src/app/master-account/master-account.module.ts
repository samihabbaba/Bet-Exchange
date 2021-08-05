import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterAccountRoutingModule } from './master-account-routing.module';
import { MasterAccountComponent } from './master-account.component';
import { SharedModule } from '../shared/shared.module';
import { PlayersDatatableComponent } from './players-datatable/players-datatable.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { AddPlayerModalComponent } from './add-player-modal/add-player-modal.component';
import { ChangePlayerPasswordModalComponent } from './change-player-password-modal/change-player-password-modal.component';
import { EditPlayerModalComponent } from './edit-player-modal/edit-player-modal.component';
import { ExposureLimitModalComponent } from './exposure-limit-modal/exposure-limit-modal.component';


@NgModule({
  declarations: [
    MasterAccountComponent,
    PlayersDatatableComponent,
    PlayerDetailsComponent,
    MasterDetailsComponent,
    AddPlayerModalComponent,
    ChangePlayerPasswordModalComponent,
    EditPlayerModalComponent,
    ExposureLimitModalComponent
  ],
  imports: [
    CommonModule,
    MasterAccountRoutingModule,
    SharedModule
  ]
})
export class MasterAccountModule { }
