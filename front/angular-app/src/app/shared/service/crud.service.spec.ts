import { TestBed, } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { RequestModel } from '../interface/request-model';
import { ResponseListModel } from '../interface/response-list-model';
import { ResponseModel } from '../interface/response-model';
import { Serializer } from '../interface/serializer';
import { CrudService } from './crud.service';

class MockModelRequest implements RequestModel { }

class MockModelResponse implements ResponseModel {
  id: number;
}

class MockModelListResponse implements ResponseListModel {
  id: number;
}

class MockSerializer implements Serializer<MockModelRequest, MockModelResponse, MockModelListResponse> {

  fromJsonToResponseModel(json: any): MockModelResponse {
    throw new Error('Method not implemented.');
  }

  fromJsonToResponseListModel(json: any): MockModelListResponse {
    throw new Error('Method not implemented.');
  }

  fromResponseModelToForm(model: ResponseModel): FormGroup {
    throw new Error('Method not implemented.');
  }

  fromFormToRequestModel(form: FormGroup): MockModelRequest {
    throw new Error('Method not implemented.');
  }
}

@Injectable()
class MockCrudService extends CrudService<MockModelRequest, MockModelResponse, MockModelListResponse> {

  constructor(
    protected httpClient: HttpClient,
    protected _serializer: MockSerializer
  ) {
    super(httpClient, 'http://api.test', '/endpoint', _serializer);
  }
}

describe('Shared: Service: CrudClientService', () => {
  const endpoint = 'http://api.test/endpoint';

  let service: CrudService<MockModelRequest, MockModelResponse, MockModelListResponse>;
  let mockController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CrudService, useClass: MockCrudService },
        MockSerializer
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CrudService);
    mockController = TestBed.inject(HttpTestingController);
  });

  it('deve criar e injetar o serviço', () => {
    expect(service).toBeTruthy();
  });

});
