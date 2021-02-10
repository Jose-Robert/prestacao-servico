import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { SharedModule } from '../shared.module';

@Component({
  template: `
    <input type="text" id="field1">
    <input  type="text" id="field2">
  `
})
class MockComponent { }

describe('Shared: Directive: BlockCopyPasteDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MockComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar um componente com a diretiva', () => {
    expect(component).toBeTruthy();
  });
});
