import { ClienteService } from './../shared/cliente.service';
import { ClienteForm } from './../shared/cliente.form';
import { ClienteListResponse } from './../shared/cliente-list-response.model';
import { ClienteResponse } from './../shared/cliente-response.model';
import { ClienteRequest } from './../shared/cliente-request.model';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CrudRegistration } from '@app/shared/component/crud/crud-registration/crud-registration';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { TitleService } from '@app/shared/service/title.service';
import { ToastService } from '@app/shared/service/toast.service';
import { Route } from '@app/shared/enum/route.enum';
import { MASKS } from 'ng-brazil';

@Component({
  selector: 'app-cliente-registration',
  templateUrl: './cliente-registration.component.html',
  styleUrls: ['./cliente-registration.component.scss']
})
export class ClienteRegistrationComponent extends CrudRegistration<ClienteRequest, ClienteResponse, ClienteListResponse> {

  protected _form = new ClienteForm();

  public MASKS = MASKS;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router,
    protected service: ClienteService,
    protected titleService: TitleService,
    protected toastService: ToastService,
    protected breadcrumbService: BreadcrumbService,
  ) {
    super(activatedRoute, changeDetectorRef, router, service, titleService, toastService, breadcrumbService);
  }

  protected async loadAdditionalData(): Promise<void> {}

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Clientes', [`/${Route.ADMINISTRATIVO_CLIENTES}`]);
    this.isEditionMode()
      ? this.breadcrumbService.add('Edição de Cliente', [`/${Route.ADMINISTRATIVO_CLIENTES}`, this.model.id])
      : this.breadcrumbService.add('Cadastro de Cliente', [`/${Route.ADMINISTRATIVO_CLIENTES}/${Route.GENERICO_CADASTRAR}`]);
  }

  public redirectToListing(): void {
    this.router.navigate([`/${Route.ADMINISTRATIVO_CLIENTES}`]);
  }

  get registrationTitle(): string {
    return 'Cadastro de Cliente';
  }

  get editionTitle(): string {
    return 'Edição de Cliente';
  }
}
