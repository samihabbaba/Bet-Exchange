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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
