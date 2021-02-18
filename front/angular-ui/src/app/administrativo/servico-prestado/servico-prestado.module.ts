import { ServicoPrestadoService } from './shared/servico-prestado.service';
import { ServicoPrestadoRoutingModule } from './servico-prestado-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoPrestadoComponent } from './servico-prestado.component';
import { ServicoPrestadoRegistrationComponent } from './servico-prestado-registration/servico-prestado-registration.component';



@NgModule({
  declarations: [
    ServicoPrestadoComponent,
    ServicoPrestadoRegistrationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServicoPrestadoRoutingModule
  ],
  providers: [
    ServicoPrestadoService
  ]
})
export class ServicoPrestadoModule { }
