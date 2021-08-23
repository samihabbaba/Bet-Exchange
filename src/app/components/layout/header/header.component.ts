import { ASTWithName } from '@angular/compiler';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';
import { AccountDetailsComponent } from 'src/app/software-holder/account-details/account-details.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() viewType?: string;
  @Input() isLoading?: boolean;
  @ViewChild('languageToDisplay') languageBtn?: ElementRef;

  constructor(
    private router: Router,
    private layoutService: LayoutService,
    private dataService: DataService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  goToLoginPage() {
    // this.router.navigateByUrl('login');
    this.router.navigate(['login'])
    .then(() => {
      window.location.reload();
    });
  }

  displayPreGames() {
    // this.layoutService.displayPreGames();
    this.dataService.loadPreGamesFromHeader(
      this.layoutService.getCurrentSport()?.id
    );
  }

  displayLiveGames() {
    // this.layoutService.displayLiveGames();
    this.dataService.loadLiveGames();
  }

  displayProfile(){
    this.layoutService.displayOther();
    // this.router.navigate(['/profile']);
  }


  displayProfile2() {
    const dialogRef = this.dialog.open(AccountDetailsComponent,{
      height: '400px',
      width: '1200px',
      data:{
        roleToCreate:'SuperAdmin',
        createrRole:'SoftwareHolder'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      // this.loadUsers();
    });
  }

  handleFlagClick(event: any) {
    if (event.target.classList.contains('english')) {
      this.removeClassFromLanguagesButton();
      this.languageBtn?.nativeElement.classList.add('english');
    } else if (event.target.classList.contains('turkish')) {
      this.removeClassFromLanguagesButton();
      this.languageBtn?.nativeElement.classList.add('turkish');
    } else {
      this.removeClassFromLanguagesButton();
      event.target.firstChild.classList.contains('english')
        ? this.languageBtn?.nativeElement.classList.add('english')
        : this.languageBtn?.nativeElement.classList.add('turkish');
    }
  }

  removeClassFromLanguagesButton() {
    this.languageBtn?.nativeElement.classList.contains('english')
      ? this.languageBtn?.nativeElement.classList.remove('english')
      : this.languageBtn?.nativeElement.classList.remove('turkish');
  }

}
