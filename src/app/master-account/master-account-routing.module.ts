import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      { path: 'players', component: PlayersDatatableComponent },
      { path: 'players/:id', component: PlayerDetailsComponent },
      { path: 'details', component: MasterDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterAccountRoutingModule {}
