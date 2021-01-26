import { PermissaoGrupoResponse } from './permissao-grupo-response.model';
import { PermissaoOptionResponse } from './permissao-option-response.model';
import { PermissaoSerializer } from './permissao-serializer';

describe('Grupo: PermissaoSerializer', () => {
  let serializer: PermissaoSerializer;

  beforeEach(() => {
    serializer = new PermissaoSerializer();
  });

  it('deve converter um JSON para um ResponseOptionModel', () => {
    const json = {
      id: 1,
      descricao: 'Permissão 1'
    };
    const model = serializer.fromJsonToResponseOptionModel(json);

    expect(model instanceof PermissaoOptionResponse).toBeTruthy();
    expect(model.id).toBe(1);
    expect(model.label).toBe('Permissão 1');
  });

  it('deve converter um JSON para um ResponseGrupoModel', () => {
    const json = {
      id: 1,
      papel: 'Papel 1'
    };
    const model = serializer.fromJsonToResponseGrupoModel(json);

    expect(model instanceof PermissaoGrupoResponse).toBeTruthy();
    expect(model.id).toBe(1);
    expect(model.papel).toBe('Papel 1');
  });
});
