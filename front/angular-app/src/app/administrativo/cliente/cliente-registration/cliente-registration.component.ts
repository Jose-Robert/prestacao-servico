import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudRegistration } from '@app/shared/component/crud/crud-registration/crud-registration';
import { Route } from '@app/shared/enum/route.enum';
import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { TitleService } from '@app/shared/service/title.service';
import { ToastService } from '@app/shared/service/toast.service';
import { ClienteForm } from '../shared/cliente-form';
import { ClienteRequest } from '../shared/cliente-resquest.model';
import { ClienteResponse } from '../shared/cliente.response.model';
import { ClienteService } from '../shared/cliente.service';

@Component({
  selector: 'app-cliente-registration',
  templateUrl: './cliente-registration.component.html',
  styleUrls: ['./cliente-registration.component.scss'],
  providers: [ClienteService]
})
export class ClienteRegistrationComponent extends CrudRegistration<ClienteRequest, ClienteResponse, any> {

  protected _form = new ClienteForm();

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

  protected redirectToListing(): void {
    this.router.navigate([`/${Route.ADMINISTRATIVO_CLIENTES}`]);
  }

  get editionTitle(): string {
    return 'Edição de Cliente';
  }

  get registrationTitle(): string {
    return 'Cadastro de Cliente';
  }

}
