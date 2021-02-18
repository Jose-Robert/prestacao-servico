import { ServicoPrestadoComponent } from './servico-prestado.component';
import { ServicoPrestadoRegistrationComponent } from './servico-prestado-registration/servico-prestado-registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@app/shared/enum/route.enum';

const routes: Routes = [
  {
    path: '',
    component: ServicoPrestadoComponent,
    children: [
      {
        path: Route.GENERICO_CADASTRAR,
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
