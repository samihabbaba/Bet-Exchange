import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { contentInOut } from 'src/app/animations/animation';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
  animations: [contentInOut()]
})
export class AccountDetailsComponent implements OnInit {
  @ViewChild('profile') profile?: any;
  periodSelect: any[] = [
    'All',
    'Today',
    'From Yesterday',
    'Last Week',
    'Last Month',
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  // Change Password Section
  changePasswordForm?: any;

  // Forecast Section
  displayedColumnsForecast: string[] = [
    'market',
    'startDate',
    'liability',
    'profit',
  ];
  forecastData = new MatTableDataSource<any>(FORECAST);

  // PL Section
  displayedColumnsPL: string[] = [
    'user',
    'pl',
    'mpl',
    'pt',
    'commission',
    'currentCommission',
    'total',
    'mTotal',
  ];
  pLData = new MatTableDataSource<any>(PL);

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      newPasswordConfirm: new FormControl(null, Validators.required),
    });
  }
}

const FORECAST: any[] = [
  { market: 1, startDate: '28/07/2021', liability: 1.0079, profit: 500 },
];

const PL: any[] = [
  {
    user: 'Amro',
    pl: 20.5,
    mpl: 1.0079,
    pt: 50,
    commission: 0.5,
    currentCommission: 4,
    total: 18.5,
    mTotal: 19,
  },
];

