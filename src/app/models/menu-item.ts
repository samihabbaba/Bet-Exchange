export class MenuHeader {
  icon: string;
  id:number;
  name: string;
  active? = false;
  children?: MenuItem[] | null;

  constructor(
    icon: string,
    id:number,
    name: string,
    active = false,
    children: MenuItem[]
  ) {
    this.icon = icon;
    this.id = id;
    this.name = name;
    this.active = active;
    this.children = children;
  }
}

export class MenuItem {
  flag?: any;
  id: string;
  name: string;
  active? = false;
  children?: MenuItemChildren[] | null;

  constructor(
    flag: any,
    id:string,
    name: string,
    active = false,
    children: MenuItemChildren[]
  ) {
    this.flag = flag;
    this.id = id;
    this.name = name;
    this.active = active;
    this.children = children;
  }
}

export class MenuItemChildren {
  id:number;
  name: string;
  active? = false;

  constructor(id:number, name: string, active = false) {
    this.id = id;
    this.name = name;
    this.active = active;
  }
}
