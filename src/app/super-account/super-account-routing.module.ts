import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from '../software-holder/account-details/account-details.component';
import { SubAccountDetailsComponent } from '../software-holder/sub-account-details/sub-account-details.component';
// import { AccountDetailsComponent } from './account-details/account-details.component';
import { MainDatatableComponent } from './main-datatable/main-datatable.component';
// import { SubAccountDetailsComponent } from './sub-account-details/sub-account-details.component';
import { SuperAccountComponent } from './super-account.component';

const routes: Routes = [
  {
    path: '',
    component: SuperAccountComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'admins' },
      { path: 'admins', component: MainDatatableComponent },
      // { path: 'admins/:id', component: SubAccountDetailsComponent },
      { path: 'admins/:id', component: SubAccountDetailsComponent },
      // { path: 'details', component: AccountDetailsComponent },
      { path: 'details', component: AccountDetailsComponent },
      { path: '**', component: MainDatatableComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAccountRoutingModule {}
