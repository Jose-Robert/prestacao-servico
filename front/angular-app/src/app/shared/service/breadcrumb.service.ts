import { Injectable } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Injectable()
export class BreadcrumbService {

  private items: MenuItem[] = [];

  getItems(): MenuItem[] {
    return this.items;
  }

  setItems(value: MenuItem[]): void {
    this.items = value;
  }

  add(label: string, routerLink?: any): void {
    this.items.push({ label, routerLink, routerLinkActiveOptions: { exact: true } });
  }

  clear(): void {
    this.items = [];
  }

  clearAndAdd(label: string, routerLink?: any): void {
    this.clear();
    this.add(label, routerLink);
  }
}
