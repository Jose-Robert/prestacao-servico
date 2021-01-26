import { Component, OnInit } from '@angular/core';

import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { Route } from '@app/shared/enum/route.enum';
import { TitleService } from '@app/shared/service/title.service';
import { ToastService } from '@app/shared/service/toast.service';
import { UsuarioListResponse } from '../shared/usuario-list-response.model';
import { UsuarioPerfilInformacoesPessoaisForm, UsuarioPerfilSenhaForm } from '../shared/usuario.form';
import { UsuarioSerializer } from '../shared/usuario-serializer';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html'
})
export class UsuarioPerfilComponent implements OnInit {

  private _formInformacoesPessoais = new UsuarioPerfilInformacoesPessoaisForm();
  private _formInformacoesPessoaisSubmitted = false;
  private _formSenha = new UsuarioPerfilSenhaForm();
  private _formSenhaSubmitted = false;
  private _loading = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private service: UsuarioService,
    private titleService: TitleService,
    private toastService: ToastService
  ) { }

  async ngOnInit(): Promise<void> {
    this._loading = true;
    this.titleService.setTitle(this.title);
    this.initBreadcrumb();
    await this.loadModel();
    this._loading = false;
  }

  async loadModel(): Promise<void> {
    await this.service.findPerfil().toPromise().then(
      model => this._formInformacoesPessoais = (this.service.serializer as UsuarioSerializer)
        .fromResponseListModelToPerfilInformacoesPessoaisForm(model)
    );
  }

  saveInformacoesPessoais(): void {
    this._formInformacoesPessoaisSubmitted = true;

    if (this._formInformacoesPessoais.invalid) {
      return;
    }

    this._loading = true;

    const model = (this.service.serializer as UsuarioSerializer)
      .fromPerfilInformacoesPessoaisFormToRequestModel(this._formInformacoesPessoais);

    this.service.updatePerfilInformacoesPessoais(model).subscribe(
      (modelUsuario: UsuarioListResponse) => {
        this._formInformacoesPessoais = (this.service.serializer as UsuarioSerializer)
          .fromResponseListModelToPerfilInformacoesPessoaisForm(modelUsuario);
        this._formInformacoesPessoaisSubmitted = false;
        this.toastService.addSuccess('', 'Informações pessoais atualizadas com sucesso');
        this._loading = false;
      },
      () => this._loading = false
    );
  }

  saveSenha(): void {
    this._formSenhaSubmitted = true;

    if (this._formSenha.invalid) {
      return;
    }

    const model = (this.service.serializer as UsuarioSerializer).fromPerfilSenhaFormToRequestModel(this._formSenha);

    this._loading = true;
    this.service.updatePerfilSenha(model).subscribe(
      (modelUsuario) => {
        this._formSenha.reset();
        this._formSenhaSubmitted = false;
        this.toastService.addSuccess('', 'Senha atualizada com sucesso');
        this._loading = false;
      },
      () => this._loading = false
    );
  }

  get formInformacoesPessoais(): UsuarioPerfilInformacoesPessoaisForm {
    return this._formInformacoesPessoais;
  }

  get formInformacoesPessoaisSubmitted(): boolean {
    return this._formInformacoesPessoaisSubmitted;
  }

  get formSenha(): UsuarioPerfilSenhaForm {
    return this._formSenha;
  }

  get formSenhaSubmitted(): boolean {
    return this._formSenhaSubmitted;
  }

  get loading(): boolean {
    return this._loading;
  }

  get title(): string {
    return 'Perfil de Usuário';
  }

  private initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Perfil de Usuário', [`/${Route.ADMINISTRATIVO_USUARIOS_PERFIL}`]);
  }
}
