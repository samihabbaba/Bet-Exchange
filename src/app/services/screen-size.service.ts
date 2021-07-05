import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  currentScreenSize: Observable<BreakSize>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.currentScreenSize = this.getScreenSize();
  }

  getScreenSize(): Observable<any> {
    return this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        map((result): any => {
          if (result.breakpoints[Breakpoints.XSmall]) {
            return BreakSize.XS;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            return BreakSize.SM;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            return BreakSize.MD;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            return BreakSize.LG;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            return BreakSize.XL;
          }
        })
      );
  }
}

export enum BreakSize {
  'XS' = 'xs',
  'SM' = 'sm',
  'MD' = 'md',
  'LG' = 'lg',
  'XL' = 'xl',
}
