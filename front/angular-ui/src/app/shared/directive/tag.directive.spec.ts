import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TagDirective } from './tag.directive';

@Component({
  template: `
    <span appTag [tagValue]="status" tagSuccess="Success" tagDanger="Error" tagWarning="Warning" tagInfo="Running">{{ status }}</span>
  `
})
class MockTagComponent {
  status = 'Running';
}

describe('Shared: Directive: TagDirective', () => {
  let component: MockTagComponent;
  let fixture: ComponentFixture<MockTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [
        MockTagComponent,
        TagDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar um componente com a diretiva', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir a tag com as cores de success', () => {
    component.status = 'Success';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.app-tag-success'))).toBeTruthy();
  });

  it('deve exibir a tag com as cores de warning', () => {
    component.status = 'Warning';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.app-tag-warning'))).toBeTruthy();
  });

  it('deve exibir a tag com as cores de error', () => {
    component.status = 'Error';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.app-tag-danger'))).toBeTruthy();
  });

  it('deve exibir a tag com as cores de info', () => {
    component.status = 'Running';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.app-tag-info'))).toBeTruthy();
  });
});
