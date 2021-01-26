import { NgModule } from '@angular/core';

import { UsuarioService } from '@app/administrativo/usuario/shared/usuario.service';
import { SharedModule } from '@app/shared/shared.module';
import { ErrorHandlerService } from './shared/error-handler.service';
import { PageException401Component } from './page-exception-401/page-exception-401.component';
import { PageException404Component } from './page-exception-404/page-exception-404.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CoreRoutingModule
  ],
  declarations: [
    PageException401Component,
    PageException404Component,
    SidebarComponent,
    TopbarComponent
  ],
  exports: [
    SidebarComponent,
    TopbarComponent
  ],
  providers: [
    ErrorHandlerService,
    UsuarioService
  ]
})
export class CoreModule { }
