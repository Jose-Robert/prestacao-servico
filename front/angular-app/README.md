# AngularApp

Projeto Angular que serve como base para desenvolvimento de outros projetos.

## Módulos/Funcionalidades

* Login
  * Recuperação de Senha
* Home
* Administrativo
  * Grupo
    * Listagem
    * Cadastro, Edição e Alteração de Status
  * Usuário
    * Listagem
    * Cadastro, Edição e Alteração de Status
* Perfil
  * Edição de Informações Pessoais
  * Edição de Senha

## Desenvolvimento

### Servidor de Desenvolvimento

Execute `npm start` para o servidor de desenvolvimento. Acesse `http://localhost:4200/`. O app vai ser recarregado automaticamente se você alterar qualquer um dos arquivos-fonte.

### Gerador de Código

Execute `ng generate component component-name` para gerar um novo componente. Você pode também usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Execute `npm run build` para fazer o build do projeto. Os arquivos do build serão armazenados no diretório `dist/`. Use `npm run build:prod` para o build de produção.

### Executando Testes Unitários

Execute `npm test` para executar os testes de unidade via [Karma](https://karma-runner.github.io). Para executar os testes com o *watch* rode `npm run test:watch`.

### Executando Testes Comportamentais

Execute `npm run e2e` para executar os testes de comportamento via [Protractor](http://www.protractortest.org/).

### Ajuda do Angular CLI

Para obter ajuda no Angular CLI use `ng help` ou confira o [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Scripts NPM

* **start**: Executa o servidor de desenvolvimento com *watch* do Angular CLI;
* **start:aot**: Executa o servidor de desenvolvimento com *watch* e verificação AOT;
* **lint**: Verifica a conformidade do código do projeto com as regras do TSLint;
* **test**: Executa os testes de unidade;
* **test:watch**: Executa os testes de unidade com *watch* no ChromeHeadless;
* **test:watch:chrome**: Executa os testes de unidade com *watch* no Google Chrome;
* **e2e**: Executa os testes comportamentais;
* **build**: Executa o build de desenvolvimento;
* **build:watch**: Executa o build de desenvolvimento com *watch*;
* **build:aot**: Executa o build de desenvolvimento com verificação AOT;
* **build:aot:watch**: Executa o build de desenvolvimento com *watch* e verificação AOT;
* **build:prod**: Executa o build de produção;
* **pipeline**: Executa os códigos da pipeline (lint, testes de unidade e build de produção).
