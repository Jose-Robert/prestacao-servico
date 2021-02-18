import { ListFilter, ListSortFilter } from '@app/shared/model/list-filter.model';

export class ServicoPrestadoListFilter extends ListFilter {

  constructor(
    public id = null,
    public descricao = '',
    public cliente = '',
    public dataServico = null,
    public ativo = true,
    public page = 0,
    public size = 10,
    public sort: ListSortFilter[] = [
      new ListSortFilter('id', 'asc')
    ]
  ) {
    super(page, size, sort);
  }
}
