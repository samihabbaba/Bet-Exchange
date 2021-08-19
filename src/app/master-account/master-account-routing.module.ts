import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from '../software-holder/account-details/account-details.component';
import { SubAccountDetailsComponent } from '../software-holder/sub-account-details/sub-account-details.component';
import { ClientDatatableComponent } from './client-datatable/client-datatable.component';
import { MasterAccountComponent } from './master-account.component';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { PlayersDatatableComponent } from './players-datatable/players-datatable.component';

const routes: Routes = [
  {
    path: '',
    component: MasterAccountComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'players' },
      // { path: 'players', component: PlayersDatatableComponent },
      { path: 'players', component: ClientDatatableComponent },
      // { path: 'players/:id', component: PlayerDetailsComponent },
      { path: 'players/:id', component: SubAccountDetailsComponent },
      // { path: 'details', component: MasterDetailsComponent },
      { path: 'details', component: AccountDetailsComponent },
      // { path: '**', redirectTo: 'players' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterAccountRoutingModule {}
