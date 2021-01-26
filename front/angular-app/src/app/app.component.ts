import { Component, OnInit, HostListener } from '@angular/core';

import * as moment from 'moment';

import { MediaQueryService } from './shared/service/media-query.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MediaQueryService]
})
export class AppComponent implements OnInit {

  private _showButtonScrollTop = false;
  private _toggled = false;

  constructor(
    private mediaQueryService: MediaQueryService
  ) { }

  ngOnInit(): void {
    this.mediaQueryService.setMediaQuery('(min-width: 768px)');
    this._toggled = this.matchesMediaQuery;
    moment.locale('pt-br');
  }

  get displayMask(): boolean {
    return this._toggled && !this.mediaQueryService.matches;
  }

  get toggled(): boolean {
    return this._toggled;
  }

  get matchesMediaQuery(): boolean {
    return this.mediaQueryService.matches;
  }

  get showButtonScrollTop(): boolean {
    return this._showButtonScrollTop;
  }

  toggleMenu(): void {
    this._toggled = !this._toggled;
  }

  hideMenu(): void {
    if (!this.matchesMediaQuery) {
      this._toggled = false;
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this._showButtonScrollTop = window.scrollY > 100;
  }

  @HostListener('document:keydown.escape', ['$event'])
  keyDownEscape(event: KeyboardEvent): void {
    this.hideMenu();
  }
}
