import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Route } from '@app/shared/enum/route.enum';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Subscription } from 'rxjs';
import { MenuBuilder } from '../shared/menu-builder';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [MenuBuilder]
})
export class SidebarComponent implements OnInit, OnDestroy {

  private _menuItems: MenuItem[];
  private currentUrl = '';
  private routerEventsSubscription: Subscription;

  @Input() active = false;
  @Output() readonly itemClick: EventEmitter<void> = new EventEmitter();

  constructor(
    private menuBuilder: MenuBuilder,
    private router: Router) {
  }

  async ngOnInit() {
    this.initMenuItems();
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.currentUrl = event.urlAfterRedirects;
        this.menuBuilder.clear();
        this.initMenuItems();
        this.routerEventsSubscription.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.logout();
  }

  initMenuItems(): void {
    // Home
    this.addMenuHome();
    // Administrativo
    this.addAdminMenu();

    this._menuItems = this.menuBuilder.getMenuItems();
    this.initMenuUsuario();
  }

  onItemClick(): void {
    window.scrollTo(0, 0);
    this.itemClick.emit();
  }

  addMenuHome(): void {
    this.addMenu(this.menu('Home', 'fa fa-home', 'menu-dashboard', ['/home']), 0);
  }

  addAdminMenu(): MenuBuilder {
    this.addMenu(this.expandedMenu('Administrativo', 'menu-administrativo', this.isExpandedMenu(`/${Route.ADMINISTRATIVO}`)));
      this.addMenu(this.expandedMenu('Cliente', 'submenu-cliente', this.isExpandedMenu(`/${Route.ADMINISTRATIVO_CLIENTES}`)), 1)
        this.addMenu(this.listingMenu([`/${Route.ADMINISTRATIVO_CLIENTES}`]), 2)
        this.addMenu(this.registrationMenu([`/${Route.ADMINISTRATIVO_CLIENTES}/${Route.GENERICO_CADASTRAR}`]), 2)
    return this.menuBuilder;
  }

  addMenu(menu: MenuItem, level?: number): MenuBuilder {
    this.menuBuilder.addMenu(menu, level);
    return this.menuBuilder;
  }

  isExpandedMenu(route: string): boolean {
    return this.currentUrl.startsWith(route);
  }

  get menuItems(): MenuItem[] {
    return this._menuItems;
  }

  private menu(label: string, icon: string, styleClass: string, routerLink: any): MenuItem {
    return {
      label,
      icon,
      styleClass,
      routerLink,
      routerLinkActiveOptions: { exact: true },
      command: () => this.onItemClick()
    };
  }

  private expandedMenu(label: string, styleClass: string, expanded: boolean): MenuItem {
    return {
      label,
      styleClass,
      expanded
    };
  }

  private listingMenu(routerLink: any): MenuItem {
    return {
      label: 'Listagem',
      icon: 'fa fa-table',
      styleClass: 'submenu-listagem',
      routerLink,
      routerLinkActiveOptions: { exact: true },
      command: () => this.onItemClick()
    };
  }

  private registrationMenu(routerLink: any, label = 'Cadastro'): MenuItem {
    return {
      label,
      icon: 'fa fa-plus',
      styleClass: 'submenu-cadastro',
      routerLink,
      routerLinkActiveOptions: { exact: true },
      command: () => this.onItemClick()
    };
  }

  private initMenuUsuario(): void {
    this._menuItems.push({
      label: 'Logout',
      icon: 'fa fa-sign-out',
      command: () => this.logout()
    });
  }

  logout(): void {
    this.logout();
  }

}
