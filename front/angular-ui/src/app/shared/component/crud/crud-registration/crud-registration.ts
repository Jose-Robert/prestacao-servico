import { AfterViewInit, ChangeDetectorRef, Injectable, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Route } from '@app/shared/enum/route.enum';
import { HttpStatus } from '@app/shared/enum/http-status.enum';
import { RequestModel } from '@app/shared/interface/request-model';
import { ResponseListModel } from '@app/shared/interface/response-list-model';
import { ResponseModel } from '@app/shared/interface/response-model';
import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { CrudService } from '@app/shared/service/crud.service';
import { TitleService } from '@app/shared/service/title.service';
import { ToastService } from '@app/shared/service/toast.service';

@Injectable()
export abstract class CrudRegistration<T extends RequestModel, U extends ResponseModel, L extends ResponseListModel>
  implements OnInit, AfterViewInit {

  protected _formSubmitted = false;
  protected _loading = false;
  protected model: U;

  protected abstract _form: FormGroup;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router,
    protected service: CrudService<T, U, L>,
    protected titleService: TitleService,
    protected toastService: ToastService,
    protected breadcrumbService: BreadcrumbService
  ) { }

  async ngOnInit(): Promise<void> {
    this._loading = true;
    this.titleService.setTitle(this.registrationTitle);

    const id = this.activatedRoute.snapshot.params.id;

    if (id) {
      await this.loadModel(id);
    }

    await this.loadAdditionalData();

    this.initBreadcrumb();
    this._loading = false;
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  async loadModel(id: number): Promise<void> {
    return this.service.find(id).toPromise().then(
      (model: U) => {
        this.model = model;
        this._form = this.service.serializer.fromResponseModelToForm(model);
        this.changeTitleToEdition();
      },
      (error: HttpErrorResponse) => this.errorRedirect(error.status)
    );
  }

  isEditionMode(): boolean {
    return this.activatedRoute.snapshot.params.id;
  }

  save(): void {
    this._formSubmitted = true;

    if (this._form.invalid) {
      return;
    }

    this._loading = true;

    const saveModel = !this.isEditionMode() ? this.addModel(this._form) : this.updateModel(this._form);

    saveModel.subscribe(
      (model: U) => {
        this._loading = false;
        this.toastService.addSuccess('', `Registro ${ this.isEditionMode() ? 'atualizado' : 'adicionado' } com sucesso.`);
      },
      () => this._loading = false,
      () => this.redirectToListing()
    );
  }

  get form(): FormGroup {
    return this._form;
  }

  get formSubmitted(): boolean {
    return this._formSubmitted;
  }

  get loading(): boolean {
    return this._loading;
  }

  get title(): string {
    return this.isEditionMode() ? this.editionTitle : this.registrationTitle;
  }

  protected addModel(form: FormGroup): Observable<U> {
    return this.service.save(this.service.serializer.fromFormToRequestModel(this._form));
  }

  protected updateModel(form: FormGroup): Observable<U> {
    return this.service.update(this.service.serializer.fromFormToRequestModel(this._form), this.model.id);
  }

  protected changeTitleToEdition(): void {
    this.titleService.setTitle(this.editionTitle);
  }

  private errorRedirect(status: HttpStatus): void {
    switch (status) {
      case HttpStatus.UNAUTHORIZED:
        this.router.navigate([`/${Route.ERRO_401}`]);
        break;
      case HttpStatus.NOT_FOUND:
        this.router.navigate([`/${Route.ERRO_404}`]);
    }
  }

  protected abstract loadAdditionalData(): Promise<void>;

  abstract get registrationTitle(): string;

  abstract get editionTitle(): string;

  protected abstract initBreadcrumb(): void;

  protected abstract redirectToListing(): void;
}
