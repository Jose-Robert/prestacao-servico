import { Input } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUpperCase]',
})
export class UpperCaseDirective {

  @Input() appUpperCase: boolean;

  constructor(public ref: ElementRef,  private form: Renderer2) {
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const evento = event as KeyboardEvent;

    if(this.appUpperCase) {
      if (!evento) {
        return;
      }

      if(evento && event.target.value.length < 0) {
        evento.preventDefault();
      }
    }
  }

  @HostListener('input', ['$event']) onInput(event) {
    const resEventValue = event.target.value.toUpperCase();
    const nome = this.ref.nativeElement.value = resEventValue;
    this.form.setValue(this.ref.nativeElement, nome);
  }

}
