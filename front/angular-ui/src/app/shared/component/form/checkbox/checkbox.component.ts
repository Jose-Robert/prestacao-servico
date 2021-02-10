import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormInput } from '../form-input';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent extends FormInput {

  @Input() binary = true;
  @Input() verticalDivClass = 'ui-sm-12 ui-md-4 ui-lg-3';

  @Output() changed: EventEmitter<any> = new EventEmitter();
}
