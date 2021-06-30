export class MenuHeader {
  icon: string;
  name: string;
  active? = false;
  children?: MenuItem[] | null;

  constructor(
    icon: string,
    name: string,
    active = false,
    children: MenuItem[]
  ) {
    this.icon = icon;
    this.name = name;
    this.active = active;
    this.children = children;
  }
}

export class MenuItem {
  flag?: any;
  name: string;
  active? = false;
  children?: MenuItemChildren[] | null;

  constructor(
    flag: any,
    name: string,
    active = false,
    children: MenuItemChildren[]
  ) {
    this.flag = flag;
    this.name = name;
    this.active = active;
    this.children = children;
  }
}

export class MenuItemChildren {
  name: string;
  active? = false;

  constructor(name: string, active = false) {
    this.name = name;
    this.active = active;
  }
}
