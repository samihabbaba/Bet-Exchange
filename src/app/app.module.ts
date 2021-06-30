import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SubHeaderComponent } from './components/layout/sub-header/sub-header.component';
import { MainContentComponent } from './components/layout/main-content/main-content.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BetSlipComponent } from './components/layout/bet-slip/bet-slip.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubHeaderComponent,
    MainContentComponent,
    MenuComponent,
    BetSlipComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
