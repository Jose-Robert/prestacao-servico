import { Type } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudListing } from '@app/shared/component/crud/crud-listing/crud-listing';
import { Route } from '@app/shared/enum/route.enum';
import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { RdService } from '@app/shared/service/rd.service';
import { StorageService } from '@app/shared/service/storage.service';
import { TitleService } from '@app/shared/service/title.service';
import { ToastService } from '@app/shared/service/toast.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { DialogService } from 'primeng/components/dynamicdialog/dialogservice';
import { ServicoPrestadoListFilter } from '../shared/servico-prestado-list-filter.model';
import { ServicoPrestadoListResponse } from '../shared/servico-prestado-list-response.model';
import { ServicoPrestadoResponse } from '../shared/servico-prestado-response';
import { ServicoPrestadoService } from '../shared/servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-listing',
  templateUrl: './servico-prestado-listing.component.html',
  styleUrls: ['./servico-prestado-listing.component.scss'],
  providers: [
    { provide: RdService, useClass: ServicoPrestadoService }
  ]
})
export class ServicoPrestadoListingComponent extends CrudListing<ServicoPrestadoResponse, ServicoPrestadoListResponse> {

  filter = new ServicoPrestadoListFilter();

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected confirmationService: ConfirmationService,
    protected service: ServicoPrestadoService,
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
    return Promise.resolve();
  }

  resetFilter(): void {
    this.filter = new ServicoPrestadoListFilter();
  }

  getEditarRouterLink(id: number): string | any[] {
    return [`${Route.GENERICO_EDITAR}`.replace(':id', String(id))];
  }

  protected redirectToRegistration(): void {
    this.router.navigate([`/${Route.ADMINISTRATIVO_SERVICOS_PRESTADOS}/${Route.GENERICO_CADASTRAR}`]);
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Serviço', [`/${Route.ADMINISTRATIVO_SERVICOS_PRESTADOS}`]);
  }

  get dialogComponent(): Type<any> {
    return null;
  }

  get title(): string {
    return 'Serviços';
  }

}
