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
import { Validation } from '@app/shared/component/validation/validation.model';
import { SelectItem } from 'primeng/components/common/api';
import { MunicipioResponse } from '@app/administrativo/shared/municipio-response.model';

@Component({
  selector: 'app-cliente-registration',
  templateUrl: './cliente-registration.component.html',
  styleUrls: ['./cliente-registration.component.scss']
})
export class ClienteRegistrationComponent extends CrudRegistration<ClienteRequest, ClienteResponse, ClienteListResponse> {

  protected _form = new ClienteForm();
  private _tipoLogradouros: SelectItem[];
  private _municipios: SelectItem[];
  private _ufs: SelectItem[];
  private _paises: SelectItem[];
  private _municipioOptions: MunicipioResponse[];

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

  protected async loadAdditionalData(): Promise<void> {
    this.loadTiposLogradouros();
    this.loadMunicipios();
    this.loadUfs();
    this.loadPaises();
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Clientes', [`/${Route.ADMINISTRATIVO_CLIENTES}`]);
    this.isEditionMode()
      ? this.breadcrumbService.add('Edição de Cliente', [`/${Route.ADMINISTRATIVO_CLIENTES}`, this.model.id])
      : this.breadcrumbService.add('Cadastro de Cliente', [`/${Route.ADMINISTRATIVO_CLIENTES}/${Route.GENERICO_CADASTRAR}`]);
  }

  public redirectToListing(): void {
    this.router.navigate([`/${Route.ADMINISTRATIVO_CLIENTES}`]);
  }

  private async loadTiposLogradouros(): Promise<void> {
    return this.service.listarTiposLogradouros().toPromise().then(
      logradouros => {
        this._tipoLogradouros = [];
        logradouros.forEach(logradouro => {
          this._tipoLogradouros.push({
            label: logradouro.descricao,
            value: logradouro.id
          });
        });
      },
    );
  }

  private async loadMunicipios(): Promise<void> {
    return this.service.listarMunicipios().toPromise().then(
      municipios => {
        this._loading = true;
        this._municipios = [];
        municipios.forEach(municipio => {
          this._municipios.push({
            label: municipio.nome,
            value: municipio.id
          });
        });
        this._loading = false;
      },
    );
  }

  private async buscarMunicipios(){
    const uf:string = this.form.get('endereco').value.municipio;
    if(uf){
      await this.service.listarMunicipiosPorUf(uf).toPromise().then(response => {
        this._municipioOptions = response;
      });
    }
  }

  private async loadUfs(): Promise<void> {
    return this.service.listarUfs().toPromise().then(
      ufs => {
        this._ufs = [];
        ufs.forEach(uf => {
          this._ufs.push({
            label: uf.nome,
            value: uf.id
          });
        });
      },
    )
  }

  private async loadPaises(): Promise<void> {
    return this.service.listarPaises().toPromise().then(
      paises => {
        this._paises = [];
        paises.forEach(pais => {
          this._paises.push({
            label: pais.nomePt,
            value: pais.id
          });
        });
      },
    )
  }

  get registrationTitle(): string {
    return 'Cadastro de Cliente';
  }

  get editionTitle(): string {
    return 'Edição de Cliente';
  }

  get validationMessages(): Validation[] {
    return [
      { type: 'cpf', message: 'CPF inválido' }
    ];
  }

  get logradourosOptions(): SelectItem[] {
    return this._tipoLogradouros;
  }

  get municipiosOptions(): SelectItem[] {
    return this._municipios;
  }

  get ufsOptions(): SelectItem[] {
    return this._ufs;
  }

  get paisesOptions(): SelectItem[] {
    return this._paises;
  }

  get municipioOptions(): MunicipioResponse[] {
    return this._municipioOptions;
  }
}
