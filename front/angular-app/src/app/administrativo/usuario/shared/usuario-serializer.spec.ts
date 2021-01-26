import { inject, TestBed } from '@angular/core/testing';

import { GrupoOptionResponse } from '@app/administrativo/grupo/shared/grupo-option-response.model';
import { GrupoModule } from '@app/administrativo/grupo/grupo.module';
import { UsuarioListResponse } from './usuario-list-response.model';
import { UsuarioPerfilInformacoesPessoaisRequest, UsuarioPerfilSenhaRequest } from './usuario-perfil-request.model';
import {
  UsuarioPerfilInformacoesPessoaisForm,
  UsuarioPerfilSenhaForm,
  UsuarioForm
} from './usuario.form';
import { UsuarioRequest } from './usuario-request.model';
import { UsuarioResponse } from './usuario-response.model';
import { UsuarioSerializer } from './usuario-serializer';

describe('Usuario: UsuarioSerializer', () => {
  let serializer: UsuarioSerializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GrupoModule],
      providers: [UsuarioSerializer]
    });
  });

  beforeEach(inject([UsuarioSerializer], (usuarioSerializer: UsuarioSerializer) => {
    serializer = usuarioSerializer;
  }));

  it('deve converter um JSON para um ResponseModel', () => {
    const json = {
      id: 1,
      nome: 'Nome 1',
      email: 'email',
      login: 'user',
      grupos: [
        {
          id: 1,
          nome: 'Grupo 1'
        }
      ],
      ativo: true
    };
    const model = serializer.fromJsonToResponseModel(json);

    expect(model instanceof UsuarioResponse).toBeTruthy();
    expect(model.id).toBe(1);
    expect(model.nome).toBe('Nome 1');
    expect(model.email).toBe('email');
    expect(model.login).toBe('user');
    expect(model.grupos[0] instanceof GrupoOptionResponse).toBeTruthy();
    expect(model.grupos[0].id).toBe(1);
    expect(model.grupos[0].nome).toBe('Grupo 1');
    expect(model.ativo).toBeTruthy();
  });

  it('deve converter um JSON para um ResponseListModel', () => {
    const json = {
      id: 1,
      nome: 'Nome 1',
      email: 'email',
      login: 'user',
      grupos: ['Grupo 1'],
      ativo: true
    };
    const model = serializer.fromJsonToResponseListModel(json);

    expect(model instanceof UsuarioListResponse).toBeTruthy();
    expect(model.id).toBe(1);
    expect(model.nome).toBe('Nome 1');
    expect(model.email).toBe('email');
    expect(model.login).toBe('user');
    expect(model.grupos[0]).toBe('Grupo 1');
    expect(model.ativo).toBeTruthy();
  });

  it('deve converter um ResponseModel para um Form', () => {
    const model = new UsuarioResponse(
      1,
      'Nome 1',
      'email',
      'user',
      [new GrupoOptionResponse(1, 'Grupo 1')],
      true,
      false,
      false
    );
    const form = serializer.fromResponseModelToForm(model);

    expect(form.get('nome').value).toBe('Nome 1');
    expect(form.get('email').value).toBe('email');
    expect(form.get('confirmacaoEmail').value).toBeNull();
    expect(form.get('login').value).toBe('user');
    expect(form.get('grupos').value[0]).toBe(1);
    expect(form.get('ativo').value).toBeTruthy();
  });

  it('deve converter um form para um RequestModel', () => {
    const form = new UsuarioForm();
    form.patchValue({
      nome: 'Nome 1',
      email: 'email',
      confirmacaoEmail: 'email',
      login: 'user',
      grupos: [1],
      ativo: true
    });
    const model = serializer.fromFormToRequestModel(form);

    expect(model instanceof UsuarioRequest).toBeTruthy();
    expect(model.nome).toBe('Nome 1');
    expect(model.email).toBe('email');
    expect(model.login).toBe('user');
    expect(model.grupos[0]).toBe(1);
    expect(model.ativo).toBeTruthy();
  });

  it('deve converter um ResponseListModel para um PerfilInformacoesPessoaisForm', () => {
    const model = new UsuarioListResponse(1, 'Nome 1', 'email', 'user', ['Grupo 1'], true);
    const form = serializer.fromResponseListModelToPerfilInformacoesPessoaisForm(model);

    expect(form.get('nome').value).toBe('Nome 1');
    expect(form.get('email').value).toBe('email');
    expect(form.get('confirmacaoEmail').value).toBe(null);
    expect(form.get('login').value).toBe('user');
  });

  it('deve converter um PerfilInformacoesPessoaisForm para um PerfilInformacoesPessoaisRequestModel', () => {
    const form = new UsuarioPerfilInformacoesPessoaisForm();
    form.patchValue({
      nome: 'Nome 1',
      email: 'email',
      confirmacaoEmail: 'email',
      login: 'user'
    });
    const model = serializer.fromPerfilInformacoesPessoaisFormToRequestModel(form);

    expect(model instanceof UsuarioPerfilInformacoesPessoaisRequest).toBeTruthy();
    expect(model.nome).toBe('Nome 1');
    expect(model.email).toBe('email');
    expect(model.login).toBe('user');
  });

  it('deve converter um PerfilSenhaForm para um PerfilSenhaRequestModel', () => {
    const form = new UsuarioPerfilSenhaForm();
    form.patchValue({
      senhaAtual: 'senhaAtual',
      senha: 'senhaNova',
      confirmacaoSenha: 'senhaNova'
    });
    const model = serializer.fromPerfilSenhaFormToRequestModel(form);

    expect(model instanceof UsuarioPerfilSenhaRequest).toBeTruthy();
    expect(model.senhaAtual).toBe('senhaAtual');
    expect(model.senhaNova).toBe('senhaNova');
  });
});
