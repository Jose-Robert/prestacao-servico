import { TestBed, inject } from '@angular/core/testing';

import { GrupoListResponse } from './grupo-list-response.model';
import { GrupoOptionResponse } from './grupo-option-response.model';
import { GrupoForm } from './grupo.form';
import { GrupoRequest } from './grupo-request.model';
import { GrupoResponse } from './grupo-response.model';
import { GrupoSerializer } from './grupo-serializer';
import { PermissaoGrupoResponse } from './permissao-grupo-response.model';
import { PermissaoSerializer } from './permissao-serializer';

describe('Grupo: GrupoSerializer', () => {
  let serializer: GrupoSerializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GrupoSerializer,
        PermissaoSerializer
      ]
    });
  });

  beforeEach(inject([GrupoSerializer], (grupoSerializer: GrupoSerializer) => {
    serializer = grupoSerializer;
  }));

  it('deve converter um JSON para um ResponseModel', () => {
    const json = {
      id: 1,
      nome: 'Nome 1',
      ativo: true,
      permissoes: [{
        id: 1,
        papel: 'Papel 1'
      }]
    };
    const model = serializer.fromJsonToResponseModel(json);

    expect(model instanceof GrupoResponse).toBeTruthy();
    expect(model.id).toBe(1);
    expect(model.nome).toBe('Nome 1');
    expect(model.ativo).toBeTruthy();
    expect(model.permissoes[0] instanceof PermissaoGrupoResponse).toBeTruthy();
    expect(model.permissoes[0].id).toBe(1);
    expect(model.permissoes[0].papel).toBe('Papel 1');
  });

  it('deve converter um JSON para um ResponseListModel', () => {
    const json = {
      id: 1,
      nome: 'Nome 1',
      ativo: true
    };
    const model = serializer.fromJsonToResponseListModel(json);

    expect(model instanceof GrupoListResponse).toBeTruthy();
    expect(model.id).toBe(1);
    expect(model.nome).toBe('Nome 1');
    expect(model.ativo).toBeTruthy();
  });

  it('deve converter um ResponseModel para um Form', () => {
    const model = new GrupoResponse(
      1,
      'Nome 1',
      [new PermissaoGrupoResponse(1, 'PAPEL1', 'Papel 1')],
      true
    );
    const form = serializer.fromResponseModelToForm(model);

    expect(form.get('nome').value).toBe('Nome 1');
    expect(form.get('permissoes').value[0]).toBe(1);
    expect(form.get('ativo').value).toBeTruthy();
  });

  it('deve converter um form para um RequestModel', () => {
    const form = new GrupoForm();
    form.patchValue({
      nome: 'Nome 1',
      permissoes: [1],
      ativo: true
    });
    const model = serializer.fromFormToRequestModel(form);

    expect(model instanceof GrupoRequest).toBeTruthy();
    expect(model.nome).toBe('Nome 1');
    expect(model.permissoes[0]).toBe(1);
    expect(model.ativo).toBeTruthy();
  });

  it('deve converter um JSON para um ResponseOptionModel', () => {
    const json = {
      id: 1,
      nome: 'Nome 1'
    };
    const model = serializer.fromJsonToResponseOptionModel(json);

    expect(model instanceof GrupoOptionResponse).toBeTruthy();
    expect(model.id).toBe(1);
    expect(model.nome).toBe('Nome 1');
  });
});
