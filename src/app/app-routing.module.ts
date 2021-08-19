import { MainContentComponent } from './components/layout/main-content/main-content.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { RouteGuard } from './route.guard';
import { SoftwareHolderGuard } from './Guard/software-holder.guard';
import { MasterGuard } from './Guard/master.guard';
import { AdminGuard } from './Guard/admin.guard';
import { SuperGuard } from './Guard/super.guard';

const routes: Routes = [
  { path: '', component: MainContentComponent, canActivate: [RouteGuard] },
  { path: 'home', component: MainContentComponent, canActivate: [RouteGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'software-holder', loadChildren: () => import('./software-holder/software-holder.module').then(m => m.SoftwareHolderModule), canActivate: [SoftwareHolderGuard] },
  { path: 'super', loadChildren: () =>  import('./super-account/super-account.module').then( (m) => m.SuperAccountModule ), canActivate: [SuperGuard] },
  { path: 'admin', loadChildren: () => import('./admin-account/admin-account.module').then(m => m.AdminAccountModule), canActivate: [AdminGuard] },
  { path: 'master', loadChildren: () => import('./master-account/master-account.module').then( (m) => m.MasterAccountModule ), canActivate: [MasterGuard]},

  // { path: 'login', component: LoginComponent, outlet: 'auth' },
  { path: '**', component: MainContentComponent, canActivate: [RouteGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
