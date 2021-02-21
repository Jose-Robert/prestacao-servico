import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { FormInput } from '../form-input';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
})
export class CalendarComponent extends FormInput {

  @Output() blured: EventEmitter<any> = new EventEmitter();
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() focused: EventEmitter<any> = new EventEmitter();
}
