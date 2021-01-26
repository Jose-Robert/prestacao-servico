import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { CoreModule } from '@app/core/core.module';
import { SecurityModule } from '@app/security/security.module';
import { Serializer } from '@app/shared/interface/serializer';
import { CrudService } from '@app/shared/service/crud.service';
import { ToastService } from '@app/shared/service/toast.service';
import { SharedModule } from '@app/shared/shared.module';
import { CrudListing } from './crud-listing';

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
class MockCrudListingComponent extends CrudListing<any, any, any> {

  hasActions(): boolean {
    return true;
  }

  getEditarRouterLink(id: number): string | any[] {
    return '';
  }

  get title(): string {
    return 'MockCrudListagem';
  }

  protected loadAdditionalData(): Promise<void> {
    return Promise.resolve();
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Mock', ['/mock']);
  }
}

describe('Shared: Component: CrudListing', () => {
  let component: MockCrudListingComponent;
  let fixture: ComponentFixture<MockCrudListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        SecurityModule,
        SharedModule
      ],
      declarations: [MockCrudListingComponent],
      providers: [
        { provide: CrudService, useClass: MockCrudService },
        ConfirmationService,
        MessageService,
        ToastService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockCrudListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
