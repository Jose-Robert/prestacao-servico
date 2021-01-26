import { NgModule } from '@angular/core';

import { GrupoModule } from '@app/administrativo/grupo/grupo.module';
import { SharedModule } from '@app/shared/shared.module';
import { UsuarioRegistrationComponent } from './usuario-registration/usuario-registration.component';
import { UsuarioComponent } from './usuario.component';
import { UsuarioListingComponent } from './usuario-listing/usuario-listing.component';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioService } from './shared/usuario.service';

@NgModule({
  imports: [
    SharedModule,
    UsuarioRoutingModule,
    GrupoModule
  ],
  declarations: [
    UsuarioRegistrationComponent,
    UsuarioComponent,
    UsuarioListingComponent,
    UsuarioPerfilComponent
  ],
  providers: [UsuarioService]
})
export class UsuarioModule { }
