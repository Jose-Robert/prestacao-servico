import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('Shared: Service: StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(StorageService);
  });

  afterEach(() => {
    service.clear();
  });

  it('deve criar e injetar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve adicionar um item', () => {
    service.setItem('nome', 'Meu item');

    expect(service.getItem('nome')).toEqual('Meu item');
  });

  it('deve remover um item', () => {
    service.setItem('nome', 'Meu item');
    service.removeItem('nome');

    expect(service.getItem('nome')).toBeFalsy();
  });

  it('deve adicionar uma lista', () => {
    service.setArray('minhalista', ['1', '2', '3']);

    expect(service.getArray('minhalista')).toEqual(jasmine.objectContaining(['1', '2', '3']));
  });

  it('deve adicionar um objeto', () => {
    service.setObject('meuobjeto', { nome: 'Meu objeto' });

    expect(service.getObject('meuobjeto')).toEqual(jasmine.objectContaining({ nome: 'Meu objeto' }));
  });

  it('deve retornar a quantidade de dados armazenados', () => {
    service.setItem('minhastring', 'Minha string');
    service.setArray('meuarray', ['1', '2', '3']);
    service.setObject('meuobjeto', { nome: 'Objeto' });

    expect(service.length).toBe(3);
  });

  it('deve limpar os dados', () => {
    service.setItem('nome', 'Meu item');
    service.clear();

    expect(service.getItem('nome')).toBeFalsy();
  });
});
