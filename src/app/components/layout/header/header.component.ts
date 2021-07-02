import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() viewType?: string;
  @Input() isLoading?: boolean;

  constructor(private router: Router, private layoutService: LayoutService, private dataService:DataService) {}

  ngOnInit(): void {}

  goToLoginPage() {
    this.router.navigateByUrl('(auth:login)');
  }

  displayPreGames() {
    // this.layoutService.displayPreGames();
    this.dataService.loadPreGamesFromHeader();
  }

  displayLiveGames() {
    // this.layoutService.displayLiveGames();
    this.dataService.loadLiveGames();
  }
}
