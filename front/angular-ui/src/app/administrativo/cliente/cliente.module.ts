import { ClienteService } from './shared/cliente.service';
import { SharedModule } from './../../shared/shared.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { ClienteRegistrationComponent } from './cliente-registration/cliente-registration.component';
import { ClienteListingComponent } from './cliente-listing/cliente-listing.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';



@NgModule({
  entryComponents:[ClienteDetailComponent],
  declarations: [
    ClienteComponent,
    ClienteRegistrationComponent,
    ClienteListingComponent,
    ClienteDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClienteRoutingModule
  ],
  providers: [
    ClienteService
  ]
})
export class ClienteModule { }
