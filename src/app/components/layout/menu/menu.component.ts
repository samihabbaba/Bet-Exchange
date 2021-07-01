import { Component, OnInit } from '@angular/core';
import { fadeMenuDropdown } from 'src/app/animations/animation';
import {
  MenuHeader,
  MenuItem,
  MenuItemChildren,
} from 'src/app/models/menu-item';
import { DataService } from 'src/app/services/data.service';

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
      id: 4,
      active: false,
      children: [
        {
          flag: '',
          id:'EN',
          name: 'England',
          active: false,
          children: [
            {id:1, name: 'Premier League', active: false },
            {id:1, name: 'ChampionShip', active: false },
          ],
        },

        {
          flag: '',
          id:'SP',
          name: 'Spain',
          active: false,
          children: [
            { id:1, name: 'La Liga', active: false },
            { id:1, name: 'ChampionShip', active: false },
          ],
        },
      ],
    },
  ];

  constructor(private dataService:DataService) {}

  ngOnInit(): void {}

  handleMenuHeaderClick(item: MenuHeader) { // sport clicked ( load regions )
    if(item.active){
      item.active = !item.active;
      item.children =[];
    } else{
      this.dataService.getAllRegions(item.id).subscribe(resp => {
    debugger
        
        for(let i = 0; i<resp.body.length; i++){
          item.children?.push({
            id:resp.body[i].regionCode,
            name:resp.body[i].regionName,
            active: false,
            children : []
          })
        }
        item.active = !item.active;

      }, error =>{
        debugger
      })
    }


  }

  handleMenuItemClick(item: MenuItem) {
    item.active = !item.active;
  }

  handleGrandChildClick(item: MenuItemChildren) {}





}
