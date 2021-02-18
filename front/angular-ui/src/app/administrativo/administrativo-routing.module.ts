import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@app/shared/enum/route.enum';

import { AdministrativoComponent } from './administrativo.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoComponent,
    children: [
      {
        path: Route.CLIENTES,
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: Route.SERVICOS_PRESTADOS,
        loadChildren: () => import('./servico-prestado/servico-prestado.module').then(m => m.ServicoPrestadoModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
