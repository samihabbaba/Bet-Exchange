import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar, private zone: NgZone) {}

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
