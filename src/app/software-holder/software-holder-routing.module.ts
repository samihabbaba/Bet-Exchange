import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolderMainDatatableComponent } from './holder-main-datatable/holder-main-datatable.component';
import { SubAccountDetailsComponent } from './sub-account-details/sub-account-details.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { SoftwareHolderComponent } from './software-holder.component';

const routes: Routes = [
  {
   path: '', component: SoftwareHolderComponent ,
   children: [
    { path: '', pathMatch: 'full', redirectTo: 'supers' },
    { path: 'supers', component: HolderMainDatatableComponent },
    { path: 'supers/:id', component: SubAccountDetailsComponent },
    { path: 'details', component: AccountDetailsComponent },
    // { path: '**', component: HolderMainDatatableComponent },
  ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareHolderRoutingModule { }
