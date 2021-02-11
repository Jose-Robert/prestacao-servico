import { ClienteListFilter } from './../shared/cliente-list-filter.model';
import { ClienteListResponse } from './../shared/cliente-list-response.model';
import { ClienteResponse } from './../shared/cliente-response.model';
import { ClienteService } from './../shared/cliente.service';
import { RdService } from '@app/shared/service/rd.service';
import { ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { CrudListing } from '@app/shared/component/crud/crud-listing/crud-listing';
import { Router } from '@angular/router';
import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { StorageService } from '@app/shared/service/storage.service';
import { TitleService } from '@app/shared/service/title.service';
import { ToastService } from '@app/shared/service/toast.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Route } from '@app/shared/enum/route.enum';
import { CnpjCpfPipe } from '@app/shared/pipe/cnpj-cpf.pipe';
import { DialogService } from 'primeng/components/dynamicdialog/dialogservice';

@Component({
  selector: 'app-cliente-listing',
  templateUrl: './cliente-listing.component.html',
  providers: [
    { provide: RdService, useClass: ClienteService }
  ]
})
export class ClienteListingComponent extends CrudListing<ClienteResponse, ClienteListResponse> {

  private cnpjCpfPipe = new CnpjCpfPipe();
  filter = new ClienteListFilter();

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected confirmationService: ConfirmationService,
    protected service: ClienteService,
    protected titleService: TitleService,
    protected toastService: ToastService,
    protected breadcrumbService: BreadcrumbService,
    protected router: Router,
    protected storageService: StorageService,
    protected dialogService: DialogService,
  ) {
    super(changeDetectorRef, confirmationService, service,
      titleService, toastService, breadcrumbService, storageService, router, dialogService);
   }

   protected async loadAdditionalData(): Promise<void> {
    await this.list();
    return Promise.resolve();
  }

  resetFilter(): void {
    this.filter = new ClienteListFilter();
  }

  getEditarRouterLink(id: number): string | any[] {
    return [`${Route.ADMINISTRATIVO_CLIENTES}/${Route.GENERICO_EDITAR}`.replace(':id', String(id))];
  }

  protected redirectToRegistration(): void {
    this.router.navigate([`/${Route.ADMINISTRATIVO_CLIENTES}/${Route.GENERICO_CADASTRAR}`]);
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Clientes', [`/${Route.ADMINISTRATIVO_CLIENTES}`]);
  }

  async list(page = 0) {
    this.updateFilter();
    await super.list(page);
  }

  private updateFilter(): void {
    if (this.filter.cpf) {
      this.filter.cpf = this.cnpjCpfPipe.transform(this.filter.cpf).trim();
    }
  }

  protected get dialogComponent(): Type<any> {
    throw new Error('Method not implemented.');
  }

  get title(): string {
    return 'Clientes';
  }

}
