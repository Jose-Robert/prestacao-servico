import { TestBed } from '@angular/core/testing';

import { TitleService } from './title.service';

describe('Shared: Service: TitleService', () => {
  let service: TitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitleService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(TitleService);
  });

  it('deve criar e injetar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
