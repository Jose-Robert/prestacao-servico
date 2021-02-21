import { ServicoPrestadoService } from './shared/servico-prestado.service';
import { ServicoPrestadoRoutingModule } from './servico-prestado-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoPrestadoComponent } from './servico-prestado.component';
import { ServicoPrestadoRegistrationComponent } from './servico-prestado-registration/servico-prestado-registration.component';
import { ClienteService } from '../cliente/shared/cliente.service';
import { ServicoPrestadoListingComponent } from './servico-prestado-listing/servico-prestado-listing.component';



@NgModule({
  declarations: [
    ServicoPrestadoComponent,
    ServicoPrestadoRegistrationComponent,
    ServicoPrestadoListingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServicoPrestadoRoutingModule
  ],
  providers: [
    ServicoPrestadoService,
  ]
})
export class ServicoPrestadoModule { }
