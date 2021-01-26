import { TestBed } from '@angular/core/testing';

import { MessageService } from 'primeng/api';

import { ToastService } from './toast.service';

describe('Shared: Service: ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToastService,
        MessageService
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ToastService);
  });

  it('deve criar e injetar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
