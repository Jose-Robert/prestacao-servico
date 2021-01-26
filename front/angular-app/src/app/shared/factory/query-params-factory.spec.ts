import { QueryParamsFactory } from './query-params-factory';

describe('Shared: Factory: QueryParamsFactory', () => {
  let factory: QueryParamsFactory;

  beforeEach(() => {
    factory = new QueryParamsFactory();
  });

  it('deve criar um objeto HttpParams', () => {
    const obj = {
      descricao: 'Lorem ipsum',
      tipo: '',
      aplicacao: null,
      status: 'SUCCESS',
      data: new Date('2017-12-30T13:00:00'),
      intervalo: [1, 10],
      page: 0,
      size: 10,
      sort: [
        { field: 'descricao', order: 'asc'},
        { field: 'data', order: 'desc'}
      ]
    };
    const params = factory.create(obj);

    expect(params.get('descricao')).toEqual('Lorem ipsum');
    expect(params.has('tipo')).toBeFalsy();
    expect(params.has('aplicacao')).toBeFalsy();
    expect(params.get('status')).toEqual('SUCCESS');
    expect(params.get('intervalo')).toEqual('1,10');
    expect(params.get('data')).toEqual('2017-12-30');
    expect(params.get('page')).toEqual('0');
    expect(params.get('size')).toEqual('10');
    expect(params.getAll('sort')[0]).toEqual('descricao,asc');
    expect(params.getAll('sort')[1]).toEqual('data,desc');
  });
});
