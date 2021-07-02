import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
  host: {
    class: 'main-content',
  },
})
export class MainContentComponent implements OnInit {
  @Input() viewType?: string;
  @Input() isLoading?: boolean;
  @Input() menuLoading?: boolean;

  constructor(
    public dataService: DataService,
    public sharedService: SharedFunctionsService
  ) {}

  ngOnInit(): void {}
}
