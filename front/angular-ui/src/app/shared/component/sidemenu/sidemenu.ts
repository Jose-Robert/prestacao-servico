import { Injectable, EventEmitter } from '@angular/core';
import { MenuBuilder } from '@app/core/shared/menu-builder';
import { MenuItem } from 'primeng/components/common/api';

@Injectable()
export abstract class SideMenu {

  private currentUrl = '';

  constructor(
    protected menuBuilder: MenuBuilder,
    protected itemClick: EventEmitter<void>
  ) { }



  protected listingMenu(routerLink: any): MenuItem {
    return {
      label: 'Listagem',
      icon: 'fa fa-table',
      styleClass: 'submenu-listagem',
      routerLink,
      routerLinkActiveOptions: { exact: true },
      command: () => this.onItemClick()
    };
  }

  protected registrationMenu(routerLink: any, label = 'Cadastro'): MenuItem {
    return {
      label,
      icon: 'fa fa-plus',
      styleClass: 'submenu-cadastro',
      routerLink,
      routerLinkActiveOptions: { exact: true },
      command: () => this.onItemClick()
    };
  }

  onItemClick(): void {
    window.scrollTo(0, 0);
    this.itemClick.emit();
  }

  addMenu(menu: MenuItem, level?: number): MenuBuilder {
    this.menuBuilder.addMenu(menu, level);
    return this.menuBuilder;
  }

  isExpandedMenu(route: string): boolean {
    return this.currentUrl.startsWith(route);
  }

  protected expandedMenu(label: string, styleClass: string, expanded: boolean): MenuItem {
    return {
      label,
      styleClass,
      expanded
    };
  }

}
