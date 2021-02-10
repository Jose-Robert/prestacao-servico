import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { InputSwitchModule } from 'primeng/components/inputswitch/inputswitch';

import { ValidationComponent } from '../../validation/validation.component';
import { InputSwitchComponent } from './input-switch.component';

describe('Shared: Component: InputSwitchComponent', () => {
  let component: InputSwitchComponent;
  let fixture: ComponentFixture<InputSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        InputSwitchModule
      ],
      declarations: [
        InputSwitchComponent,
        ValidationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSwitchComponent);
    component = fixture.componentInstance;

    component.control = new FormControl(true);
    component.inputId = 'ativo';
    component.label = 'Status';

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
