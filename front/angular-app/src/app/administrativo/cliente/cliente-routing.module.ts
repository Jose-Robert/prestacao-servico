import { ClienteRegistrationComponent } from './cliente-registration/cliente-registration.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Route } from "@app/shared/enum/route.enum";
import { ClienteComponent } from "./cliente.component";

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      {
        path: Route.GENERICO_CADASTRAR,
        component: ClienteRegistrationComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
