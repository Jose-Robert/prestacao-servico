import { Component } from '@angular/core';

import { CrudListing } from '@app/shared/component/crud/crud-listing/crud-listing';
import { CrudService } from '@app/shared/service/crud.service';
import { Route } from '@app/shared/enum/route.enum';
import { UsuarioListFilter } from '../shared/usuario-list-filter.model';
import { UsuarioListResponse } from '../shared/usuario-list-response.model';
import { UsuarioRequest } from '../shared/usuario-request.model';
import { UsuarioResponse } from '../shared/usuario-response.model';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-usuario-listing',
  templateUrl: './usuario-listing.component.html',
  providers: [
    { provide: CrudService, useClass: UsuarioService }
  ]
})
export class UsuarioListingComponent extends CrudListing<UsuarioRequest, UsuarioResponse, UsuarioListResponse> {

  filter = new UsuarioListFilter();

  resetFilter(): void {
    this.filter = new UsuarioListFilter();
  }

  getEditarRouterLink(id: number): string | any[] {
    return [`/${Route.ADMINISTRATIVO_USUARIOS}/${Route.GENERICO_EDITAR}`.replace(':id', String(id))];
  }

  get title(): string {
    return 'Usuários';
  }

  protected loadAdditionalData(): Promise<void> {
    return Promise.resolve();
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Usuários', [`/${Route.ADMINISTRATIVO_USUARIOS}`]);
  }
}
