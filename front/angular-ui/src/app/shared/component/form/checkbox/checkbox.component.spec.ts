import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxModule } from 'primeng/components/checkbox/checkbox';

import { ValidationComponent } from '../../validation/validation.component';
import { CheckboxComponent } from './checkbox.component';

describe('Shared: Component: CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CheckboxModule
      ],
      declarations: [
        CheckboxComponent,
        ValidationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;

    component.control = new FormControl(false);
    component.label = 'Concordo com os termos';
    component.inputId = 'termos-aceitos';

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
