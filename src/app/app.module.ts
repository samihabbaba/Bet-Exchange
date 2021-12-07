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
import { HttpClientModule } from '@angular/common/http';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { LiveGamesComponent } from './components/live-games/live-games.component';
import { PreGamesComponent } from './components/pre-games/pre-games.component';
import { EventDetailsHeaderComponent } from './components/event-details/event-details-header/event-details-header.component';
import { EventContentComponent } from './components/event-details/event-content/event-content.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NoEventComponent } from './components/no-event/no-event.component';
import { LanguageDropdownDirective } from './directives/language-dropdown.directive';
import { ScrollShadowDirective } from './directives/scroll-shadow.directive';
import { CloseAppMenuDirective } from './directives/close-app-menu.directive';
import { CloseBetSlipDirective } from './directives/close-bet-slip.directive';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminAccountModule } from './admin-account/admin-account.module';
import { MatIconModule } from '@angular/material/icon';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CurrencyConverterPipe } from './Pipe/currency-converter.pipe';



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
    EventDetailsComponent,
    LiveGamesComponent,
    PreGamesComponent,
    EventDetailsHeaderComponent,
    EventContentComponent,
    LoaderComponent,
    NoEventComponent,
    LanguageDropdownDirective,
    ScrollShadowDirective,
    CloseAppMenuDirective,
    CloseBetSlipDirective,
    ClientProfileComponent,
    CurrencyConverterPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    AdminAccountModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    CurrencyConverterPipe
  ],
})
export class AppModule {}
