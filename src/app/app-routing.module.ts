import { MainContentComponent } from './components/layout/main-content/main-content.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

const routes: Routes = [
  // { path: '', component: MainContentComponent },
  { path: 'login', component: LoginComponent, outlet: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
