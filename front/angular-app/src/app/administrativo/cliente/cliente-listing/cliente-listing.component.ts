import { Component } from '@angular/core';
import { CrudListing } from '@app/shared/component/crud/crud-listing/crud-listing';
import { Route } from '@app/shared/enum/route.enum';
import { CrudService } from '@app/shared/service/crud.service';
import { RdService } from '@app/shared/service/rd.service';
import { ClienteListFilter } from '../shared/cliente-list-filter.model';
import { ClienteListResponse } from '../shared/cliente-list-response.model';
import { ClienteRequest } from '../shared/cliente-resquest.model';
import { ClienteResponse } from '../shared/cliente.response.model';
import { ClienteService } from '../shared/cliente.service';

@Component({
  selector: 'app-cliente-listing',
  templateUrl: './cliente-listing.component.html',
  styleUrls: ['./cliente-listing.component.scss'],
  providers: [
    { provide: RdService, useClass: ClienteService }
  ]
})
export class ClienteListingComponent extends CrudListing<ClienteResponse, ClienteListResponse> {

  filter = new ClienteListFilter();

  resetFilter(): void {
    this.filter = new ClienteListFilter();
  }

  getEditarRouterLink(id: number): string | any[] {
    return [`/${Route.ADMINISTRATIVO_CLIENTES}/${Route.GENERICO_EDITAR}`.replace(':id', String(id))];
  }

  get title(): string {
    return 'Clientes';
  }

  protected async loadAdditionalData(): Promise<void> {
    await this.list();
    return Promise.resolve();
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Clientes', [`/${Route.ADMINISTRATIVO_CLIENTES}`]);
  }

}
