import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from '../software-holder/account-details/account-details.component';
import { SubAccountDetailsComponent } from '../software-holder/sub-account-details/sub-account-details.component';
import { AdminAccountComponent } from './admin-account.component';
import { AdminDatatableComponent } from './admin-datatable/admin-datatable.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAccountComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'masters' },
      { path: 'masters', component: AdminDatatableComponent },
      // { path: 'admins/:id', component: SubAccountDetailsComponent },
      { path: 'masters/:id', component: SubAccountDetailsComponent },
      { path: 'details', component: AccountDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAccountRoutingModule { }
