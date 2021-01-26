import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { MultiSelectModule } from 'primeng/multiselect';

import { AutoFocusDirective } from '../../../directive/auto-focus.directive';
import { ValidationComponent } from '../../validation/validation.component';
import { MultiSelectComponent } from './multi-select.component';

describe('Shared: Component: MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MultiSelectModule
      ],
      declarations: [
        AutoFocusDirective,
        MultiSelectComponent,
        ValidationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;

    component.control = new FormControl([]);
    component.inputId = 'opcoes';
    component.label = 'Opções';

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
