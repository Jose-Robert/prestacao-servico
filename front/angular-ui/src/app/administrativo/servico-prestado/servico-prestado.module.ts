import { ServicoPrestadoService } from './shared/servico-prestado.service';
import { ServicoPrestadoRoutingModule } from './servico-prestado-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoPrestadoComponent } from './servico-prestado.component';
import { ServicoPrestadoRegistrationComponent } from './servico-prestado-registration/servico-prestado-registration.component';
import { ServicoPrestadoListingComponent } from './servico-prestado-listing/servico-prestado-listing.component';
import { ServicoPrestadoDetailComponent } from './servico-prestado-detail/servico-prestado-detail.component';



@NgModule({
  entryComponents:[ServicoPrestadoDetailComponent],
  declarations: [
    ServicoPrestadoComponent,
    ServicoPrestadoRegistrationComponent,
    ServicoPrestadoListingComponent,
    ServicoPrestadoDetailComponent
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
