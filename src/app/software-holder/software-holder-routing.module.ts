import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoftwareHolderComponent } from './software-holder.component';

const routes: Routes = [{ path: '', component: SoftwareHolderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareHolderRoutingModule { }
