import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from './shared/enum/route.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: Route.HOME,
    pathMatch: 'full'
  },
  {
    path: Route.HOME,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: Route.ADMINISTRATIVO,
    loadChildren: () => import('./administrativo/administrativo.module').then(m => m.AdministrativoModule),
  },
  {
    path: '**',
    redirectTo: Route.ERRO_404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
