import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { FormInput } from '../form-input';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent extends FormInput {

  @Input() autoFocus = false;
  @Input() blockCopyPaste = false;
  @Input() max: number;
  @Input() min: number;
  @Input() size: number;
  @Input() step = 1;

  @Output() blured: EventEmitter<any> = new EventEmitter();
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() focused: EventEmitter<any> = new EventEmitter();
}
