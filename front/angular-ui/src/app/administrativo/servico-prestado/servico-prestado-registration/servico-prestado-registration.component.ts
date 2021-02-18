import { ServicoPrestadoForm } from './../shared/servico-prestado.form';
import { ServicoPrestadoService } from './../shared/servico-prestado.service';
import { ServicoPrestadoListResponse } from './../shared/servico-prestado-list-response.model';
import { ServicoPrestadoResponse } from './../shared/servico-prestado-response';
import { ServicoPrestadoRequest } from './../shared/servico-prestado-request';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CrudRegistration } from '@app/shared/component/crud/crud-registration/crud-registration';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { TitleService } from '@app/shared/service/title.service';
import { ToastService } from '@app/shared/service/toast.service';
import { Route } from '@app/shared/enum/route.enum';

@Component({
  selector: 'app-servico-prestado-registration',
  templateUrl: './servico-prestado-registration.component.html',
  styleUrls: ['./servico-prestado-registration.component.scss']
})
export class ServicoPrestadoRegistrationComponent extends CrudRegistration<ServicoPrestadoRequest,
   ServicoPrestadoResponse, ServicoPrestadoListResponse> {

  protected _form = new ServicoPrestadoForm();

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router,
    protected service: ServicoPrestadoService,
    protected titleService: TitleService,
    protected toastService: ToastService,
    protected breadcrumbService: BreadcrumbService,
  ) {
    super(activatedRoute, changeDetectorRef, router, service, titleService, toastService, breadcrumbService);
  }

  protected async loadAdditionalData(): Promise<void> {}

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Serviços Prestados', [`/${Route.ADMINISTRATIVO_SERVICOS_PRESTADOS}`]);
    this.isEditionMode()
      ? this.breadcrumbService.add('Edição de Serviço Prestado', [`/${Route.ADMINISTRATIVO_SERVICOS_PRESTADOS}`, this.model.id])
      : this.breadcrumbService.add('Cadastro de Serviço Prestado', [`/${Route.ADMINISTRATIVO_SERVICOS_PRESTADOS}/${Route.GENERICO_CADASTRAR}`]);
  }

  public redirectToListing(): void {
    this.router.navigate([`/${Route.ADMINISTRATIVO_SERVICOS_PRESTADOS}`]);
  }

  get registrationTitle(): string {
    return 'Cadastro de Serviço Prestado';
  }

  get editionTitle(): string {
    return 'Edição de Serviço Prestado';
  }

}
