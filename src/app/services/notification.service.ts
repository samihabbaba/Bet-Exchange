import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar, private zone: NgZone) { }

  success(message: string) {
    this.zone.run(() => {
      const snackBar = this._snackBar.open(message, "Close", {
        duration: 2500,
        horizontalPosition: "end",
        verticalPosition: "bottom",
        panelClass: ["snackSuccess"],
      });

      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      });
    });
  }

  info(message: string, duration?: number) {
    if (duration == undefined) {
      duration = 2500;
    }
    this.zone.run(() => {
      const snackBar = this._snackBar.open(message, "Close", {
        duration: duration,
        horizontalPosition: "end",
        verticalPosition: "bottom",
        panelClass: ["snackInfo"],
      });

      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      });
    });
  }

  error(message: string) {
    this.zone.run(() => {
      const snackBar = this._snackBar.open(message, "Close", {
        duration: 2500,
        horizontalPosition: "end",
        verticalPosition: "bottom",
        panelClass: ["snackError"],
      });

      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      });
    });
  }
}
