import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormInput } from '../form-input';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent extends FormInput {

  showPassword = false;

  @Input() autoFocus = false;
  @Input() blockCopyPaste = false;
  @Input() feedback = true;
  @Input() promptLabel: string;
  @Input() showViewButton = false;

  @Output() blured: EventEmitter<any> = new EventEmitter();
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() focused: EventEmitter<any> = new EventEmitter();
}
