import { AfterViewInit, ChangeDetectorRef, Injectable, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Pageable } from '@app/shared/interface/pageable';
import { ResponseListModel } from '@app/shared/interface/response-list-model';
import { ResponseModel } from '@app/shared/interface/response-model';
import { ListFilter } from '@app/shared/model/list-filter.model';
import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { RdService } from '@app/shared/service/rd.service';
import { StorageService } from '@app/shared/service/storage.service';
import { TitleService } from '@app/shared/service/title.service';
import { ToastService } from '@app/shared/service/toast.service';
import { ConfirmationService, DialogService } from 'primeng/components/common/api';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { SelectItem } from 'primeng/components/common/selectitem';
import { SortMeta } from 'primeng/components/common/sortmeta';
import { Table } from 'primeng/components/table/table';
import { Subscription, timer } from 'rxjs';




@Injectable()
export abstract class CrudListing<U extends ResponseModel, L extends ResponseListModel>
  implements OnInit, AfterViewInit, OnDestroy {

  filter = new ListFilter();

  protected _autoUpdate = false;
  protected _listInitialized = false;
  protected _loading = false;
  protected _loadingDataTable = false;
  protected _registerList: L[];
  protected _rows = 0;
  protected _totalRecords = 0;
  protected autoUpdatePeriod = 10000;
  protected autoUpdateSubscripion: Subscription;

  @ViewChild('table', { static: false }) protected table: Table;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected confirmationService: ConfirmationService,
    protected service: RdService<U, L>,
    protected titleService: TitleService,
    protected toastService: ToastService,
    protected breadcrumbService: BreadcrumbService,
    protected storageService: StorageService,
    protected router: Router,
    protected dialogService: DialogService,
  ) { }

  async ngOnInit(): Promise<void> {
    this._loading = true;
    this.titleService.setTitle(this.title);
    this.initBreadcrumb();
    await this.loadAdditionalData();
    this._loading = false;
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.stopAutoUpdate();
  }

  async list(page = 0): Promise<void> {
    this._listInitialized = true;
    this._loadingDataTable = true;
    this.filter.page = page;

    this.service.list(this.filter).toPromise().then((pageable: Pageable<L>) => {
      if (pageable) {
        this._registerList = pageable.content;
        this._rows = pageable.size;
        this._totalRecords = pageable.totalElements;

        if (page === 0) {
          this.resetTable();
        }
      } else {
        this._registerList = [];
        this._rows = 0;
        this._totalRecords = 0;
      }

      this._loadingDataTable = false;
    }, () => (this._loadingDataTable = false));
  }

  update(): void {
    this.list(this.actualPage);
  }

  changePage(event: LazyLoadEvent): void {
    if (!this.table) {
      return;
    }

    const page = event.rows ? event.first / event.rows : 0;
    this.list(page);
  }

  changeSort(event: SortMeta[]): void {
    this.filter.sort = event.map(e => ({
      field: e.field,
      order: 1 === e.order ? 'asc' : 'desc'
    }));
  }

  resetTable(): void {
    this.table.first = 0;
  }

  openDialog(id?: number) {
    this.dialogService.open(this.dialogComponent, {
      data: {
        id
      },
    })
      .onClose.subscribe(() => {
        this.list(this.actualPage);
      });
  }

  resetFilter(): void {
    this.filter = new ListFilter();
  }

  confirmChangeStatus(model: ResponseListModel): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja ${model.ativo ? 'desativar' : 'ativar'} o registro?`,
      accept: () => this.changeStatus(model)
    });
  }

  confirmDelete(model: ResponseListModel): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o registro?`,
      accept: () => {
        this.delete(model);
      }
    });
  }

  delete(model: ResponseListModel): void {
    this.service.delete(model.id).toPromise().then(() => {
      this.table.first = 0;
      this.list();
      this.toastService.addSuccess('', `Registro excluído com sucesso.`);
    });
  }

  changeStatus(model: ResponseListModel): void {
    this._loading = true;
    this.service.changeStatus(model.id).subscribe(() => {
      this.service.find(model.id).toPromise().then(response => {
        this.updateRegisterByIndex(response);
        this.toastService.addSuccess('', `Registro ${model.ativo ? 'desativado' : 'ativado'} com sucesso.`);
        this._loading = false;
      });
    });
  }

  private updateRegisterByIndex(register: any): void {
    const index = this.registerList.map((registro) => registro.id ).indexOf(register.id);
    if(index === -1) {
      return;
    }

    this.registerList[index] = register;
  }

  get actualPage(): number {
    return this.table.first / this.table.rows;
  }

  get autoUpdate(): boolean {
    return this._autoUpdate;
  }

  set autoUpdate(value: boolean) {
    this._autoUpdate = value;
    this.configAutoUpdate();
  }

  get footer(): string {
    if (!this.table) {
      return null;
    }

    const rows = this.table.rows;
    const total = this.table.totalRecords;
    const first = this.table.first;
    const last = first + rows <= total ? first + rows : total;

    return `${first + 1} a ${last} de ${total} ${total > 1 ? 'registros' : 'registro'}`;
  }

  get listInitialized(): boolean {
    return this._listInitialized;
  }

  get loading(): boolean {
    return this._loading;
  }

  get loadingDataTable(): boolean {
    return this._loadingDataTable;
  }

  get registerList(): L[] {
    return this._registerList;
  }

  get sizeFilterOptions(): SelectItem[] {
    return [
      { label: 'Todos', value: 1000 },
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '30', value: 30 },
      { label: '50', value: 50 },
      { label: '100', value: 100 }
    ];
  }

  get statusFilterOptions(): SelectItem[] {
    return [
      { label: 'Todos', value: null },
      { label: 'Ativos', value: true },
      { label: 'Inativos', value: false }
    ];
  }

  get rows(): number {
    return this._rows;
  }

  get totalRecords(): number {
    return this._totalRecords;
  }

  protected configAutoUpdate(): void {
    this._autoUpdate ? this.startAutoUpdate() : this.stopAutoUpdate();
  }

  protected startAutoUpdate(): void {
    this.autoUpdateSubscripion = timer(3000, this.autoUpdatePeriod).subscribe(() => this.update());
  }

  protected stopAutoUpdate(): void {
    if (this.autoUpdateSubscripion) {
      this.autoUpdateSubscripion.unsubscribe();
    }
  }

  protected createEnumFilter(enumObject: object): SelectItem[] {
    const filter: SelectItem[] = [{ label: '--', value: '' }];
    Object.keys(enumObject).forEach(value => filter.push({ label: enumObject[value], value }));

    return filter;
  }

  abstract getEditarRouterLink(id: number): string | any[];

  abstract get title(): string;

  protected abstract get dialogComponent(): Type<any>;

  protected abstract loadAdditionalData(): Promise<void>;

  protected abstract initBreadcrumb(): void;

  protected abstract redirectToRegistration(): void;
}
