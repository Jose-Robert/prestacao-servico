import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MessageService } from 'primeng/api';

import { Serializer } from '@app/shared/interface/serializer';
import { CrudService } from '@app/shared/service/crud.service';
import { ToastService } from '@app/shared/service/toast.service';
import { SharedModule } from '@app/shared/shared.module';
import { CrudRegistration } from './crud-registration';

class MockSerializer implements Serializer<any, any, any> {

  fromFormToRequestModel(json: any): any {
    throw new Error('Method not implemented.');
  }

  fromJsonToResponseModel(json: any): any {
    throw new Error('Method not implemented.');
  }

  fromJsonToResponseListModel(json: any): any {
    throw new Error('Method not implemented.');
  }

  fromResponseModelToForm(json: any): FormGroup {
    throw new Error('Method not implemented.');
  }
}

@Injectable()
class MockCrudService extends CrudService<any, any, any> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, '', '', new MockSerializer());
  }
}

@Component({
  template: ''
})
class MockCrudRegistrationComponent extends CrudRegistration<any, any, any> {
  protected _form = new FormGroup({});

  get registrationTitle(): string {
    return 'Cadastro de Mock';
  }

  get editionTitle(): string {
    return 'Edição de Mock';
  }

  protected loadAdditionalData(): Promise<void> {
    return Promise.resolve();
  }

  protected redirectToListing(): void {
    this.router.navigate(['/mock']);
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Mock', ['/mock']);
  }
}

describe('Shared: Component: CrudRegistration', () => {
  let component: MockCrudRegistrationComponent;
  let fixture: ComponentFixture<MockCrudRegistrationComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          SharedModule
        ],
        declarations: [MockCrudRegistrationComponent],
        providers: [
          { provide: CrudService, useClass: MockCrudService },
          MessageService,
          ToastService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MockCrudRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
