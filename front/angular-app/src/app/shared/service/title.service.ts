import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

export const applicationName = 'Angular App';

@Injectable()
export class TitleService {

  constructor(private title: Title) {
    this.title.setTitle(applicationName);
  }

  getTitle(): string {
    return this.title.getTitle();
  }

  setTitle(newTitle: string, suffixAppName: boolean = true): void {
    if (suffixAppName) {
      this.title.setTitle(`${newTitle} :: ${applicationName}`);
      return;
    }

    this.title.setTitle(newTitle);
  }
}
