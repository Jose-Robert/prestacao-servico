import { MomentFormatPipe } from './pipe/moment-format.pipe';
import { CnpjCpfPipe } from './pipe/cnpj-cpf.pipe';
import { BrMoneyPipe } from './pipe/br-money.pipe';
import { NgModule, Type } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { SpinnerModule } from 'primeng/spinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { CheckboxComponent } from './component/form/checkbox/checkbox.component';
import { DropdownComponent } from './component/form/dropdown/dropdown.component';
import { InputSwitchComponent } from './component/form/input-switch/input-switch.component';
import { InputTextComponent } from './component/form/input-text/input-text.component';
import { MultiSelectComponent } from './component/form/multi-select/multi-select.component';
import { PageFooterComponent } from './component/page-footer/page-footer.component';
import { PageHeaderComponent } from './component/page-header/page-header.component';
import { PanelLoaderComponent } from './component/panel-loader/panel-loader.component';
import { PasswordComponent } from './component/form/password/password.component';
import { SpinnerComponent } from './component/form/spinner/spinner.component';
import { ValidationComponent } from './component/validation/validation.component';
import { AutoFocusDirective } from './directive/auto-focus.directive';
import { BlockCopyPasteDirective } from './directive/block-copy-paste.directive';
import { TagDirective } from './directive/tag.directive';
import { BytePipe } from './pipe/byte.pipe';
import { StatusPipe } from './pipe/status.pipe';
import { TimeDifferencePipe } from './pipe/time-difference.pipe';
import { BreadcrumbService } from './service/breadcrumb.service';
import { StorageService } from './service/storage.service';
import { TitleService } from './service/title.service';
import { CEPPipe } from './pipe/cep.pipe';
import { OrderPipe } from './pipe/order.pipe';
import { BrMaskerModule } from 'br-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';

// Modules
const angularModules: Array<Type<any> | any[]> = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule
];
const primeNgModules: Array<Type<any> | any[]> = [
  AccordionModule,
  BreadcrumbModule,
  ButtonModule,
  CalendarModule,
  CardModule,
  ChartModule,
  CheckboxModule,
  ConfirmDialogModule,
  DropdownModule,
  DialogModule,
  InputSwitchModule,
  InputTextModule,
  FieldsetModule,
  KeyFilterModule,
  MenuModule,
  MultiSelectModule,
  PanelModule,
  PanelMenuModule,
  PasswordModule,
  SpinnerModule,
  TableModule,
  ToastModule,
  TooltipModule
];

// Bibliotecas
const libraryModules: Array<Type<any> | any[]> = [
  BrMaskerModule,
  CurrencyMaskModule
];

// Components, Directives and Pipes
const sharedComponents: Array<Type<any> | any[]> = [
  BreadcrumbComponent,
  CheckboxComponent,
  DropdownComponent,
  InputSwitchComponent,
  InputTextComponent,
  MultiSelectComponent,
  PageHeaderComponent,
  PageFooterComponent,
  PasswordComponent,
  PanelLoaderComponent,
  SpinnerComponent,
  ValidationComponent
];
const sharedDirectives: Array<Type<any> | any[]> = [
  AutoFocusDirective,
  BlockCopyPasteDirective,
  TagDirective
];
const sharedPipes: Array<Type<any> | any[]> = [
  BytePipe,
  StatusPipe,
  TimeDifferencePipe,
  BrMoneyPipe,
  CEPPipe,
  CnpjCpfPipe,
  MomentFormatPipe,
  OrderPipe

];

// Services
const angularProviders: Array<Type<any> | any[]> = [DecimalPipe];
const primeNgProviders: Array<Type<any> | any[]> = [];
const sharedProviders: Array<Type<any> | any[]> = [
  BreadcrumbService,
  StorageService,
  TitleService
];

@NgModule({
  imports: [
    angularModules,
    primeNgModules,
    libraryModules
  ],
  exports: [
    angularModules,
    primeNgModules,
    sharedComponents,
    sharedDirectives,
    sharedPipes,
    libraryModules
  ],
  declarations: [
    sharedComponents,
    sharedDirectives,
    sharedPipes
  ],
  providers: [
    angularProviders,
    primeNgProviders,
    sharedProviders
  ]
})
export class SharedModule { }
