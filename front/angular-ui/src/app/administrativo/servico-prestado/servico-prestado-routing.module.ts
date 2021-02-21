import { ServicoPrestadoComponent } from './servico-prestado.component';
import { ServicoPrestadoRegistrationComponent } from './servico-prestado-registration/servico-prestado-registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@app/shared/enum/route.enum';
import { ServicoPrestadoListingComponent } from './servico-prestado-listing/servico-prestado-listing.component';

const routes: Routes = [
  {
    path: '',
    component: ServicoPrestadoComponent,
    children: [
      {
        path: '',
        component: ServicoPrestadoListingComponent,
      },
      {
        path: Route.GENERICO_CADASTRAR,
        component: ServicoPrestadoRegistrationComponent,
      },
      {
        path: Route.GENERICO_EDITAR,
        component: ServicoPrestadoRegistrationComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoPrestadoRoutingModule { }
