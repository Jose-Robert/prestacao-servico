import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@app/shared/enum/route.enum';
import { GrupoListingComponent } from './grupo-listing/grupo-listing.component';
import { GrupoRegistrationComponent } from './grupo-registration/grupo-registration.component';
import { GrupoComponent } from './grupo.component';


const routes: Routes = [
  {
    path: '',
    component: GrupoComponent,
    children: [
      {
        path: '',
        component: GrupoListingComponent,
      },
      {
        path: Route.GENERICO_CADASTRAR,
        component: GrupoRegistrationComponent,
      },
      {
        path: Route.GENERICO_EDITAR,
        component: GrupoRegistrationComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoRoutingModule { }
