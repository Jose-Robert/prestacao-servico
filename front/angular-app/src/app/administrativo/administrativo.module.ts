import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { AdministrativoComponent } from './administrativo.component';
import { AdministrativoRoutingModule } from './administrativo-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AdministrativoRoutingModule
  ],
  declarations: [AdministrativoComponent]
})
export class AdministrativoModule { }
