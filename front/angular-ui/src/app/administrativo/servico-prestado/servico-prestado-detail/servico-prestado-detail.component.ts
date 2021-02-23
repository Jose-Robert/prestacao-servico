import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/components/dynamicdialog/dynamicdialog-config';
import { ServicoPrestadoResponse } from '../shared/servico-prestado-response';
import { ServicoPrestadoService } from '../shared/servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-detail',
  templateUrl: './servico-prestado-detail.component.html',
  styleUrls: ['./servico-prestado-detail.component.scss'],
  providers: [
    { provide: ServicoPrestadoService, useClass: ServicoPrestadoService }
  ]
})
export class ServicoPrestadoDetailComponent implements OnInit {

  public register: ServicoPrestadoResponse;
  private _loading: boolean;

  constructor(public config: DynamicDialogConfig, public service: ServicoPrestadoService) { }

  ngOnInit() {
    this.loadRegister();
  }

  public async loadRegister() {
    this._loading = true;
    this.register = await this.service.find(this.config.data.id).toPromise();
    this.config.header = `Serviço Nº ${this.register.id}`;
    this._loading = false;
  }

  public get loading() {
    return this._loading;
  }
}
