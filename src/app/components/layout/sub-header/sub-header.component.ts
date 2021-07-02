import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css'],
})
export class SubHeaderComponent implements OnInit {
  @Input() viewType?: string;
  @Input() isLoading?: boolean;

  constructor() {}

  ngOnInit(): void {}
}
