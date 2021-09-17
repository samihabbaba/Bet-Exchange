import { ThrowStmt } from '@angular/compiler';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeMenuAndSlip } from 'src/app/animations/animation';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';
import {
  BreakSize,
  ScreenSizeService,
} from 'src/app/services/screen-size.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';
import {Location} from '@angular/common'; 

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

  // @Input() viewType?: string;
  // @Input() isLoading?: boolean;
  // @Input() menuLoading?: boolean;

  
   viewType?: string;
   isLoading?: boolean;
   menuLoading?: boolean;
   subscriptions: Subscription[] = []
  

  screenObserver$?: Subscription;
  isSmall?: boolean;
  displayMenu?: boolean = false;
  displayBetSlip?: boolean = false;
  @ViewChild('appMenu') appMenu?: any;

  constructor(
    public dataService: DataService,
    public sharedService: SharedFunctionsService,
    private screenSizeService: ScreenSizeService,
    private layoutService: LayoutService,
    private authService:AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.initializeSubscriptions();
    // let redirect = this.authService.redirectToPage();
    // if(redirect.re){
    //   this.router.navigate([redirect.page]);
    // }
  }

  
  

  ngOnInit(): void {
    this.checkIfEventRoute();
    this.screenObserver$ = this.screenSizeService.currentScreenSize.subscribe(
      this.isScreenSmall.bind(this)
    );

    this.dataService.loadPreGamesFromHeader(
      this.layoutService.getCurrentSport()?.id
      );

  }

  ngOnDestroy() {
    this.screenObserver$?.unsubscribe();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  initializeSubscriptions() {

    let sub1 = this.layoutService.mainContentDisplayType.subscribe((value) => {
      this.viewType = value;
    });

    let sub2 = this.layoutService.MainLoading.subscribe((value) => {
      this.isLoading = value;
    });

    let sub3 = this.layoutService.menuLoading.subscribe((value) => {
      this.menuLoading = value;
    });

    this.subscriptions.push(sub1);
    this.subscriptions.push(sub2);
    this.subscriptions.push(sub3);
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
      this.displayMenu = false;
      this.displayBetSlip = false;
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

  closeMenu() {
    this.displayMenu = false;
  }

  closeSlip() {
    this.displayBetSlip = false;
  }


  private sub: any;

  checkIfEventRoute(){

    this.sub = this.route.params.subscribe(params => {

     let type = params['type']; 
     let event = params['eventId']; // (+) converts string 'id' to a number
	 

     if(type == 'live'){
      this.dataService.loadMarketsForGameLive(event);
    }
    else if(type == 'pre'){
      this.dataService.loadMarketsForGamePre(event);
    }

    this.location.replaceState("/home");


   })
  }

}
