import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BreadcrumbModule } from 'primeng/components/breadcrumb/breadcrumb';

import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { PageHeaderComponent } from './page-header.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

describe('Shared: Component: PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BreadcrumbModule
      ],
      declarations: [
        PageHeaderComponent,
        BreadcrumbComponent
      ],
      providers: [BreadcrumbService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
