import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '@app/shared/enum/route.enum';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { UsuarioListingComponent } from './usuario-listing/usuario-listing.component';
import { UsuarioComponent } from './usuario.component';
import { UsuarioRegistrationComponent } from './usuario-registration/usuario-registration.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path: '',
        component: UsuarioListingComponent,
      },
      {
        path: Route.PERFIL,
        component: UsuarioPerfilComponent,
      },
      {
        path: Route.GENERICO_CADASTRAR,
        component: UsuarioRegistrationComponent,
      },
      {
        path: Route.GENERICO_EDITAR,
        component: UsuarioRegistrationComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
