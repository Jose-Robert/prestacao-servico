import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BreadcrumbModule } from 'primeng/breadcrumb';

import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { BreadcrumbComponent } from './breadcrumb.component';

describe('Shared: Component: BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BreadcrumbModule,
        RouterTestingModule
      ],
      declarations: [BreadcrumbComponent],
      providers: [BreadcrumbService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
