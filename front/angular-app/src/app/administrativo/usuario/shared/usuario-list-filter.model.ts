import { ListFilter, ListSortFilter } from "@app/shared/models/list-filter.model";

export class UsuarioListFilter extends ListFilter {

  constructor(
    public nome = '',
    public email = '',
    public login = '',
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
