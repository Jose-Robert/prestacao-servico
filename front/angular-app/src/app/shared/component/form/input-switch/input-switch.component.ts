import { Component, Input, EventEmitter, Output } from '@angular/core';

import { FormInput } from '../form-input';

@Component({
  selector: 'app-input-switch',
  templateUrl: './input-switch.component.html'
})
export class InputSwitchComponent extends FormInput {

  @Input() off: string;
  @Input() on: string;

  @Output() changed: EventEmitter<any> = new EventEmitter();
}
