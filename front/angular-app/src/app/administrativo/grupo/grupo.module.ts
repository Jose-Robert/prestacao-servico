import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { GrupoRegistrationComponent } from './grupo-registration/grupo-registration.component';
import { GrupoComponent } from './grupo.component';
import { GrupoRoutingModule } from './grupo-routing.module';
import { GrupoListingComponent } from './grupo-listing/grupo-listing.component';
import { GrupoService } from './shared/grupo.service';
import { PermissaoService } from './shared/permissao.service';

@NgModule({
  imports: [
    SharedModule,
    GrupoRoutingModule
  ],
  declarations: [
    GrupoComponent,
    GrupoListingComponent,
    GrupoRegistrationComponent
  ],
  providers: [
    GrupoService,
    PermissaoService
  ]
})
export class GrupoModule { }
