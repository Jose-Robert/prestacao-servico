import { Injectable } from '@angular/core';

import { isNullOrUndefined } from 'util';

import { MenuItem } from 'primeng/components/common/menuitem';


@Injectable()
export class MenuBuilder {

  private _menuItems: MenuItem[] = [];

  constructor() { }

  /**
   * Adiciona um novo MenuItem ao conjunto de menus.
   *
   * @param menuItem MenuItem a ser adicionado.
   * @param level Usado para submenus, indica o nível de profundidade em que o menu será adicionado.
   * Se não for informado, adota o padrão zero, posição dos menus principais.
   * Se informado, atrela o submenu ao último menu de nível anterior adicionado (se nível 1, atrela ao último nível 0 adicionado).
   *
   * @returns a instância de MenuBuilder
   *
   * @example
   * // Adiciona um menu principal
   * menuBuilder.addMenu({ label: 'Menu 0' })
   * // Adiciona um submenu ao último menu principal
   * menuBuilder.addMenu({ label: 'Submenu 0.0' }, 1)
   * // Adiciona um submenu ao último submenu de nível 1
   * menuBuilder.addMenu({ label: 'Submenu 0.0.0' }, 2)
   * // Menu gerado
   * - Menu 0
   * -- Submenu 0.0
   * --- Submenu 0.0.0
   */
  addMenu(menu: MenuItem, level?: number): this {
    if (isNullOrUndefined(level) || 0 === level) {
      this._menuItems.push(menu);
    } else {
      this.addSubmenu(menu, level);
    }

    return this;
  }

  /**
   * Adiciona um novo MenuItem ao conjunto de menus.
   *
   * @param menu MenuItem a ser adicionado.
   * @param authorities Permissão(ões) necessárias para acessar o menu.
   * @param indexes Usado para submenus, indica o nível de profundidade em que o menu será adicionado.
   * Se não for informado, adota o padrão zero, posição dos menus principais.
   * Se informado, atrela o submenu ao último menu de nível anterior adicionado (se nível 1, atrela ao último nível 0 adicionado).
   *
   * @see addMenu
   */
  addMenuIfHasAnyAuthority(menu: MenuItem, authorities: string | string[], level?: number): this {
    return this.addMenu(menu, level);
  }

  clear(): void {
    this._menuItems = [];
  }

  getMenuItems(): MenuItem[] {
    return this._menuItems.filter(menuItem => (menuItem.items && menuItem.items.length) || menuItem.routerLink);
  }

  private addSubmenu(menu: MenuItem, level: number): void {
    let targetMenu: MenuItem;
    let lastIndex: number;

    lastIndex = this._menuItems.length - 1;
    targetMenu = this._menuItems[lastIndex];

    for (let i = 1; i <= level; i++) {
      if (isNullOrUndefined(targetMenu.items)) {
        targetMenu.items = [];
      }

      if (i === level) {
        (targetMenu.items as MenuItem[]).push(menu);
        return;
      }

      lastIndex = targetMenu.items.length - 1;
      targetMenu = targetMenu.items[lastIndex] as MenuItem;
    }
  }
}
