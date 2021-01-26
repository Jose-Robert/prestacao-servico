import { TestBed } from '@angular/core/testing';

import { MediaQueryService } from './media-query.service';

describe('Shared: Service: MediaQueryService', () => {
  let service: MediaQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaQueryService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(MediaQueryService);
  });

  it('deve criar e injetar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
