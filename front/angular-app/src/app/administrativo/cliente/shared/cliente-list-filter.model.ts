import { ListFilter, ListSortFilter } from '@app/shared/models/list-filter.model';

export class ClienteListFilter extends ListFilter {

  constructor(
    public nome = '',
    public cpf = '',
    public ativo = true,
    public page = 0,
    public size = 10,
    public sort: ListSortFilter[] = [
      new ListSortFilter('nome', 'asc')
    ]
  ) {
    super(page, size, sort);
  }
}
