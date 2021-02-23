import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/components/dynamicdialog/dynamicdialog-config';
import { ClienteResponse } from '../shared/cliente-response.model';
import { ClienteService } from '../shared/cliente.service';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss'],
  providers: [
    { provide: ClienteService, useClass: ClienteService }
  ]
})
export class ClienteDetailComponent implements OnInit {

  public register: ClienteResponse;
  private _loading: boolean;

  constructor(public config: DynamicDialogConfig, public service: ClienteService) { }

  ngOnInit() {
    this.loadRegister();
  }

  public async loadRegister() {
    this._loading = true;
    this.register = await this.service.find(this.config.data.id).toPromise();
    this.config.header = `Cliente Nº ${this.register.id}`;
    this._loading = false;
  }

  public get loading() {
    return this._loading;
  }

}
