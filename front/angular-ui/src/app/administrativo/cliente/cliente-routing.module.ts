import { ClienteListingComponent } from './cliente-listing/cliente-listing.component';
import { ClienteRegistrationComponent } from './cliente-registration/cliente-registration.component';
import { ClienteComponent } from './cliente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@app/shared/enum/route.enum';


const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      {
        path: '',
        component: ClienteListingComponent,
      },
      {
        path: Route.GENERICO_CADASTRAR,
        component: ClienteRegistrationComponent,
      },
      {
        path: Route.GENERICO_EDITAR,
        component: ClienteRegistrationComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
