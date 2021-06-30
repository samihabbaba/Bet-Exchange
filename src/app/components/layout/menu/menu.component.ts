import { Component, OnInit } from '@angular/core';
import { fadeMenuDropdown } from 'src/app/animations/animation';
import {
  MenuHeader,
  MenuItem,
  MenuItemChildren,
} from 'src/app/models/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [fadeMenuDropdown()]
})
export class MenuComponent implements OnInit {
  menu: MenuHeader[] = [
    {
      icon: 'fas fa-futbol',
      name: 'Football',
      active: false,
      children: [
        {
          flag: '',
          name: 'England',
          active: false,
          children: [
            { name: 'Premier League', active: false },
            { name: 'ChampionShip', active: false },
          ],
        },

        {
          flag: '',
          name: 'Spain',
          active: false,
          children: [
            { name: 'La Liga', active: false },
            { name: 'ChampionShip', active: false },
          ],
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  handleMenuHeaderClick(item: MenuHeader) {
    item.active = !item.active;
  }

  handleMenuItemClick(item: MenuItem) {
    item.active = !item.active;
  }

  handleGrandChildClick(item: MenuItemChildren) {}
}
