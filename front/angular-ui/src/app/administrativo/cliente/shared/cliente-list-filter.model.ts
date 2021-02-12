import { ListFilter, ListSortFilter } from '@app/shared/model/list-filter.model';

export class ClienteListFilter extends ListFilter {

  constructor(
    public id = null,
    public nome = '',
    public cpf = '',
    public ativo = true,
    public page = 0,
    public size = 10,
    public sort: ListSortFilter[] = [
      new ListSortFilter('id,nome', 'asc')
    ]
  ) {
    super(page, size, sort);
  }
}
