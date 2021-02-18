import { ServicoPrestadoRoutingModule } from './servico-prestado-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoPrestadoComponent } from './servico-prestado.component';



@NgModule({
  declarations: [
    ServicoPrestadoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServicoPrestadoRoutingModule
  ]
})
export class ServicoPrestadoModule { }
