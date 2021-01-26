import { TestBed } from '@angular/core/testing';

import { BreadcrumbService } from './breadcrumb.service';

describe('Shared: Service: BreadcrumbService', () => {
  let service: BreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreadcrumbService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BreadcrumbService);
  });

  it('deve criar e injetar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
