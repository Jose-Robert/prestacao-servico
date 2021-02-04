import { ClienteService } from './shared/cliente.service';
import { ClienteComponent } from './cliente.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ClienteRegistrationComponent } from './cliente-registration/cliente-registration.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListingComponent } from './cliente-listing/cliente-listing.component';



@NgModule({
  imports: [
    SharedModule,
    ClienteRoutingModule,
  ],
  declarations: [
    ClienteComponent,
    ClienteRegistrationComponent,
    ClienteListingComponent
  ],
  providers: [
    ClienteService
  ]
})
export class ClienteModule { }
