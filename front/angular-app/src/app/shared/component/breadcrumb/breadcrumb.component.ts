import { Component, Input } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {

  constructor(private breadcrumbService: BreadcrumbService) { }

  get home(): MenuItem {
    return {
      label: 'Dashboard',
      icon: 'fa fa-home',
      routerLink: ['/']
    };
  }

  get items(): MenuItem[] {
    return this.breadcrumbService.getItems();
  }
}
