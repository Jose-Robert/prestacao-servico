import { Component } from '@angular/core';

import { CrudListing } from '@app/shared/component/crud/crud-listing/crud-listing';
import { Route } from '@app/shared/enum/route.enum';
import { GrupoListFilter } from '../shared/grupo-list-filter.model';
import { GrupoListResponse } from './../shared/grupo-list-response.model';
import { GrupoResponse } from './../shared/grupo-response.model';
import { GrupoService } from '../shared/grupo.service';
import { RdService } from '@app/shared/service/rd.service';

@Component({
  selector: 'app-grupo-listing',
  templateUrl: './grupo-listing.component.html',
  providers: [
    { provide: RdService, useClass: GrupoService }
  ]
})
export class GrupoListingComponent extends CrudListing<GrupoResponse, GrupoListResponse> {

  filter = new GrupoListFilter;

  resetFilter(): void {
    this.filter = new GrupoListFilter();
  }

  getEditarRouterLink(id: number): string | any[] {
    return [`/${Route.ADMINISTRATIVO_GRUPOS}/${Route.GENERICO_EDITAR}`.replace(':id', String(id))];
  }

  get title(): string {
    return 'Grupos';
  }

  protected loadAdditionalData(): Promise<void> {
    return Promise.resolve();
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Grupos', [`/${Route.ADMINISTRATIVO_GRUPOS}`]);
  }
}
