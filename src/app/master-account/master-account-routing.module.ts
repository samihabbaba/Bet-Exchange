import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterAccountComponent } from './master-account.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'panel' },
  { path: 'panel', component: MasterAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterAccountRoutingModule {}
