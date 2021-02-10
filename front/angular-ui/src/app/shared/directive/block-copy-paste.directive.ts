import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBlockCopyPaste]'
})
export class BlockCopyPasteDirective {

  @Input() appBlockCopyPaste = true;

  @HostListener('copy', ['$event'])
  @HostListener('paste', ['$event'])
  @HostListener('cut', ['$event'])
  preventDefault(event: KeyboardEvent) {
    if (this.appBlockCopyPaste !== false) {
      event.preventDefault();
    }
  }
}
