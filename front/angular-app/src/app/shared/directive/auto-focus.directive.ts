import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  @Input() appAutoFocus = true;

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    if (this.appAutoFocus !== false) {
      this.element.nativeElement.focus();
    }
  }
}
