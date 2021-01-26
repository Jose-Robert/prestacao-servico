import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectItem } from 'primeng/api';

import { CrudRegistration } from '@app/shared/component/crud/crud-registration/crud-registration';
import { TitleService } from '@app/shared/service/title.service';
import { ToastService } from '@app/shared/service/toast.service';
import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { PermissaoService } from '../shared/permissao.service';
import { GrupoListResponse } from './../shared/grupo-list-response.model';
import { GrupoForm } from './../shared/grupo.form';
import { GrupoResponse } from './../shared/grupo-response.model';
import { GrupoRequest } from './../shared/grupo-request.model';
import { GrupoService } from '../shared/grupo.service';
import { Route } from '@app/shared/enum/route.enum';

@Component({
  selector: 'app-grupo-registration',
  templateUrl: './grupo-registration.component.html'
})
export class GrupoRegistrationComponent extends CrudRegistration<GrupoRequest, GrupoResponse, GrupoListResponse> {

  protected _form = new GrupoForm();

  private _permissaoOptions: SelectItem[];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router,
    protected service: GrupoService,
    protected titleService: TitleService,
    protected toastService: ToastService,
    protected breadcrumbService: BreadcrumbService,
    private permissaoService: PermissaoService
  ) {
    super(activatedRoute, changeDetectorRef, router, service, titleService, toastService, breadcrumbService);
  }

  get editionTitle(): string {
    return 'Edição de Grupo';
  }

  get permissaoOptions(): SelectItem[] {
    return this._permissaoOptions;
  }

  get registrationTitle(): string {
    return 'Cadastro de Grupo';
  }

  protected async loadAdditionalData(): Promise<void> {
    await this.loadPermissaoOptions();
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Grupos', [`/${Route.ADMINISTRATIVO_GRUPOS}`]);
    this.isEditionMode()
      ? this.breadcrumbService.add('Edição de Grupo', [`/${Route.ADMINISTRATIVO_GRUPOS}`, this.model.id])
      : this.breadcrumbService.add('Cadastro de Grupo', [`/${Route.ADMINISTRATIVO_GRUPOS}/${Route.GENERICO_CADASTRAR}`]);
  }

  protected redirectToListing(): void {
    this.router.navigate([`/${Route.ADMINISTRATIVO_GRUPOS}`]);
  }

  private async loadPermissaoOptions(): Promise<void> {
    return this.permissaoService.findOptions().toPromise().then(
      permissoes => {
        this._permissaoOptions = [];
        permissoes.forEach(permissao => {
          this._permissaoOptions.push({
            label: permissao.label,
            value: permissao.id
          });
        });
      }
    );
  }
}
