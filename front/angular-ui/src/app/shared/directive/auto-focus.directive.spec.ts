import { TestBed, async } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoFocusDirective } from './auto-focus.directive';

class MockElementRef extends ElementRef {
  nativeElement = {};
}

describe('Shared: Directive: AutoFocusDirective', () => {
  let directive: AutoFocusDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [{ provide: ElementRef, useValue: MockElementRef }]
    }).compileComponents();
  }));

  beforeEach(() => {
    const element = TestBed.get(ElementRef);
    directive = new AutoFocusDirective(element);
  });

  it('deve criar a diretiva', () => {
    expect(directive).toBeTruthy();
  });
});
