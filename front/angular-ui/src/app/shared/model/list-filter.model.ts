export class ListSortFilter {
  constructor(
    public field: string,
    public order: string
  ) { }
}

export class ListFilter {
  constructor(
    public page = 0,
    public size = 10,
    public sort: ListSortFilter[] = []
  ) { }
}
