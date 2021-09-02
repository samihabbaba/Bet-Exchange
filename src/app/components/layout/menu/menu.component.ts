import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { fadeMenuDropdown } from 'src/app/animations/animation';
import {
  MenuHeader,
  MenuItem,
  MenuItemChildren,
} from 'src/app/models/menu-item';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [fadeMenuDropdown()],
})
export class MenuComponent implements OnInit {
  @Input() isLoading?: boolean;
  @Input() menuLoading?: boolean;
  menuSubscriber?: Subscription;

  menu: MenuHeader[] = [
    {
      icon: 'fas fa-futbol',
      name: 'Football',
      id: 4,
      active: false,
      children: [

      ],
    },
  ];

  constructor(
    private dataService: DataService,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {

    this.menu =[];
    this.dataService.getSports(true).subscribe(resp => {
      
      resp.body.forEach((element:any) => {
        this.menu.push({
          icon:'fas fa-futbol',
          name:element.name,
          id:element.id,
          active:false,
          children:[]
        })
      });
    }, error =>{

    })

    this.layoutService.closeMenuChild.subscribe((value) => {
      if (value == 'close') {
        this.closeAllLeagues();
      }
    });
  }
  ngOnDestroy(): void {
    this.menuSubscriber?.unsubscribe();
  }

  handleMenuHeaderClick(item: MenuHeader) {
    // sport clicked ( load regions )
    
    if (item.active) {
      item.active = !item.active;
      item.children = [];
    } else {
      if (this.layoutService.isMenuLoading()) {
        return;
      } else {
        this.layoutService.startMenuLoading();
        this.layoutService.currentSport.next(item);
      }
      this.dataService
        .getAllRegions(item.id, false)
        .pipe(finalize(() => this.layoutService.stopMenuLoading()))
        .subscribe(
          (resp) => {
            
            item.children?.push({
              id:'',
              sportId:item.id,
              name:'Upcoming',
              active:false,
              children:null
            })

            
            item.children?.push({
              id:'',
              sportId:item.id,
              name:'All Leagues',
              active:false,
              children:[]
            })

            for (let i = 0; i < resp.body.length; i++) {
              item.children?.push({
                id: resp.body[i].countryCode,
                sportId: item.id,
                name: resp.body[i].name,
                active: false,
                children: [],
              });
            }
            item.active = !item.active;
          },
          (error) => {}
        );
    }
  }

  handleMenuItemClick(item: MenuItem) {
    //region clicked (load leagues)

    if(item.name == 'Upcoming'){
      this.dataService.loadPreGames('', '', item.sportId,true);
    }
    else{
      if (item.active) {
        item.active = !item.active;
        item.children = [];
      } else {
        if (this.layoutService.isMenuLoading()) {
          return;
        } else {
          this.layoutService.startMenuLoading();
          this.layoutService.currentRegion.next(item);
        }
        // item.id = 'International';
  
        this.dataService
          .getAllLeagues(item.sportId, item.id,false,true)
          .pipe(finalize(() => this.layoutService.stopMenuLoading()))
          .subscribe(
            (resp) => {

              item.children=[];
              for (let i = 0; i < resp.body.length; i++) {
                item.children?.push({
                  id: resp.body[i].id,
                  regionId: resp.body[i].regionId,
                  sportId: item.sportId,
                  name: resp.body[i].name,
                  active: false,
                });
              }
              item.active = !item.active;
            },
            (error) => {
              // 
            }
          );
      }
    }

    
  }

  handleGrandChildClick(child: MenuItem, grandchild: MenuItemChildren) {
    // league clicked (load events)

    if (!grandchild.active) {
      this.setAllChildsToFalse(child);
      grandchild.active = true;
    }
    this.layoutService.currentLeague.next(grandchild);
    this.dataService.loadPreGames(grandchild.id, grandchild.regionId, grandchild.sportId);
  }

  setAllChildsToFalse(currentChild: MenuItem) {
    for (let item of this.menu) {
      if (item.children) {
        for (let child of item.children) {
          if (child !== currentChild) {
            child.active = false;
          }
          if (child.children) {
            for (let granchild of child.children) {
              granchild.active = false;
            }
          }
        }
      }
    }
  }

  closeAllLeagues() {
    for (let item of this.menu) {
      if (item.active && item.children) {
        for (let child of item.children) {
          if (child.active) {
            child.active = false;
            if (child.children) {
              for (let grandchild of child.children) {
                grandchild.active = false;
              }
            }
          }
        }
      }
    }
  }
}
