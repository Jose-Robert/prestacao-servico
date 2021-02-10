import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { AdministrativoRoutingModule } from './administrativo-routing.module';
import { AdministrativoComponent } from './administrativo.component';


@NgModule({
  imports: [
    SharedModule,
    AdministrativoRoutingModule
  ],
  declarations: [AdministrativoComponent]
})
export class AdministrativoModule { }
