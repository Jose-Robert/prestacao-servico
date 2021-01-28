import { ClienteService } from './shared/cliente.service';
import { ClienteComponent } from './cliente.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ClienteRegistrationComponent } from './cliente-registration/cliente-registration.component';
import { ClienteRoutingModule } from './cliente-routing.module';



@NgModule({
  imports: [
    SharedModule,
    ClienteRoutingModule,
    CommonModule
  ],
  declarations: [
    ClienteComponent,
    ClienteRegistrationComponent
  ],
  providers: [
    ClienteService
  ]
})
export class ClienteModule { }
