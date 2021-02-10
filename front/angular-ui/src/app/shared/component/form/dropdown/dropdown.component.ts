import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SelectItem } from 'primeng/components/common/selectitem';

import { FormInput } from '../form-input';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent extends FormInput {

  @Input() autoFocus = false;
  @Input() options: SelectItem[];
  @Input() verticalDivClass = 'ui-sm-12 ui-md-4 ui-lg-3';

  @Output() blured: EventEmitter<any> = new EventEmitter();
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() focused: EventEmitter<any> = new EventEmitter();
}
