import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareHolderRoutingModule } from './software-holder-routing.module';
import { SoftwareHolderComponent } from './software-holder.component';


@NgModule({
  declarations: [
    SoftwareHolderComponent
  ],
  imports: [
    CommonModule,
    SoftwareHolderRoutingModule
  ]
})
export class SoftwareHolderModule { }
