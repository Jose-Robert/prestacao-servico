import { Component, Output, EventEmitter } from '@angular/core';

import { MenuItem } from 'primeng/components/common/menuitem';

import { applicationName } from '@app/shared/service/title.service';
import { Route } from '@app/shared/enum/route.enum';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {

  private _menuItemsUsuario: MenuItem[];

  @Output() readonly toggleMenu = new EventEmitter<void>();

  constructor() {
  }

  get menuItemsUsuario(): MenuItem[] {
    return this._menuItemsUsuario;
  }

  get applicationName(): string {
    return applicationName;
  }

  onToggleMenu(): void {
    this.toggleMenu.emit();
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
