import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-content',
  templateUrl: './event-content.component.html',
  styleUrls: ['./event-content.component.css'],
})
export class EventContentComponent implements OnInit {
  @Input() event?= null;

  tabItems: any[] = [
    {
      name: 'Popular',
      class: 'tab',
      active: true,
    },
    {
      name: 'Popular',
      class: 'tab',
      active: false,
    },
    {
      name: 'Popular',
      class: 'tab',
      active: false,
    },
    {
      name: 'More',
      class: 'tab-dropdown',
      active: false,
      children: [
        {
          name: 'Popular',
          active: false,
        },
        {
          name: 'Popular',
          active: false,
        },
        {
          name: 'Popular',
          active: false,
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {
  }

  handleTabClick(tab: any) {
    if (tab.children) {
      // this.setAllTabsToFalse(this.tabItems);
      tab.active = !tab.active;
    }
    if (!tab.active && !tab.children) {
      this.setAllTabsToFalse(this.tabItems);
      tab.active = true;
    }
  }

  handleChildClick(tab: any) {
    tab.active = false;
  }

  setAllTabsToFalse(arr: any[]) {
    for (let tab of arr) {
      if (tab.active) {
        tab.active = false;
      }
    }
  }
}
