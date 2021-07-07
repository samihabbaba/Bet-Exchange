import { ThrowStmt } from '@angular/compiler';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeMenuAndSlip } from 'src/app/animations/animation';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';
import {
  BreakSize,
  ScreenSizeService,
} from 'src/app/services/screen-size.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  host: {
    class: 'main-content',
  },
  animations: [fadeMenuAndSlip()],
})
export class MainContentComponent implements OnInit {
  @Input() viewType?: string;
  @Input() isLoading?: boolean;
  @Input() menuLoading?: boolean;
  screenObserver$?: Subscription;
  isSmall?: boolean;
  displayMenu?: boolean = false;
  displayBetSlip?: boolean = false;
  @ViewChild('appMenu') appMenu?: any;

  constructor(
    public dataService: DataService,
    public sharedService: SharedFunctionsService,
    private screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.screenObserver$ = this.screenSizeService.currentScreenSize.subscribe(
      this.isScreenSmall.bind(this)
    );
  }

  ngOnDestroy() {
    this.screenObserver$?.unsubscribe();
  }

  isScreenSmall(size: BreakSize): void {
    if (
      size === BreakSize.XS ||
      size === BreakSize.SM ||
      size === BreakSize.MD
    ) {
      console.log(size);
      this.isSmall = true;
    }
    if (size === BreakSize.LG || size === BreakSize.XL) {
      console.log(size);
      this.isSmall = false;
    }
  }

  toggleMenu() {
    this.displayMenu = !this.displayMenu;
  }

  toggleBetSlip() {
    this.displayBetSlip = !this.displayBetSlip;
  }

 
}
