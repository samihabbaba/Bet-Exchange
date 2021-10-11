import { Inject, Injectable, Injector, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { SignalRNotificationsService } from './signal-r-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar, private zone: NgZone
    , private notiSignalR:SignalRNotificationsService, @Inject(Injector) private injector: Injector) {
    this.notiSignalR.notification.subscribe(noti => {

      if(!noti){
        return
      }

      //BET_PARTIALLY_MATCHED

      //BET_EXPIRED
      
      if(noti.type == 'ACCOUNT_SUSPENDED' || noti.type == 0){
        this.error(noti.message);
      }
      
      else if(noti.type == 'BET_EXPIRED' ){
        debugger;
        this.error(noti.message);
        // this.error('New Bet Got Expired');

        console.log(noti)
      }
      
      else if(noti.type == 'BET_MATCHED'){ 
        this.info(noti.message);
        this.authService.updateCurrentBalance();
      }

      else if(noti.type == 'BET_VOIDED'){
        this.info(noti.message);
      }

      else if(noti.type == 'FORCE_LOGOUT'){
        this.info(noti.message);
        this.authService.logut();
      }

    })
  }

  private get authService(): AuthService {
    return this.injector.get(AuthService);
  }

  success(message: string, duration?: number) {
    if (duration == undefined) {
      duration = 2500;
    }
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.panelClass = ['snackSuccess'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'end';
    this.zone.run(() => {
      const snackBar = this._snackBar.open(message, 'Close', config);
      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      });
    });
  }

  info(message: string, duration?: number) {
    if (duration == undefined) {
      duration = 2500;
    }
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.panelClass = ['snackInfo'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'end';
    this.zone.run(() => {
      const snackBar = this._snackBar.open(message, 'Close', config);
      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      });
    });
  }

  error(message: string, duration?: number) {
    if (duration == undefined) {
      duration = 2500;
    }
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.panelClass = ['snackError'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'end';
    this.zone.run(() => {
      const snackBar = this._snackBar.open(message, 'Close', config);

      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      });
    });
  }
}
