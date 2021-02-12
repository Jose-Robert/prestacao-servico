import { DialogLoaderComponent } from './component/dialog-loader/dialog-loader.component';
import { CEPPipe } from './pipe/cep.pipe';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrMaskerModule } from 'br-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CaptchaModule } from 'primeng/captcha';
import { ChipsModule } from 'primeng/chips';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { BreadcrumbModule } from 'primeng/components/breadcrumb/breadcrumb';
import { ButtonModule } from 'primeng/components/button/button';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CardModule } from 'primeng/components/card/card';
import { ChartModule } from 'primeng/components/chart/chart';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { DialogService } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { GrowlModule } from 'primeng/components/growl/growl';
import { InputSwitchModule } from 'primeng/components/inputswitch/inputswitch';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { KeyFilterModule } from 'primeng/components/keyfilter/keyfilter';
import { MenuModule } from 'primeng/components/menu/menu';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { PanelModule } from 'primeng/components/panel/panel';
import { PanelMenuModule } from 'primeng/components/panelmenu/panelmenu';
import { PasswordModule } from 'primeng/components/password/password';
import { SpinnerModule } from 'primeng/components/spinner/spinner';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { EditorModule } from 'primeng/editor';
import { PickListModule } from 'primeng/picklist';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { CheckboxComponent } from './component/form/checkbox/checkbox.component';
import { ChipsComponent } from './component/form/chips/chips.component';
import { DropdownComponent } from './component/form/dropdown/dropdown.component';
import { InputMoneyComponent } from './component/form/input-money/input-money.component';
import { InputSwitchComponent } from './component/form/input-switch/input-switch.component';
import { InputTextComponent } from './component/form/input-text/input-text.component';
import { MultiSelectComponent } from './component/form/multi-select/multi-select.component';
import { PasswordComponent } from './component/form/password/password.component';
import { SpinnerComponent } from './component/form/spinner/spinner.component';
import { PageFooterComponent } from './component/page-footer/page-footer.component';
import { PageHeaderComponent } from './component/page-header/page-header.component';
import { PanelLoaderComponent } from './component/panel-loader/panel-loader.component';
import { ValidationComponent } from './component/validation/validation.component';
import { AutoFocusDirective } from './directive/auto-focus.directive';
import { BlockCopyPasteDirective } from './directive/block-copy-paste.directive';
import { TagDirective } from './directive/tag.directive';
import { BrMoneyPipe } from './pipe/br-money.pipe';
import { BytePipe } from './pipe/byte.pipe';
import { CnpjCpfPipe } from './pipe/cnpj-cpf.pipe';
import { MomentFormatPipe } from './pipe/moment-format.pipe';
import { OrderPipe } from './pipe/order.pipe';
import { StatusPipe } from './pipe/status.pipe';
import { TimeDifferencePipe } from './pipe/time-difference.pipe';
import { BreadcrumbService } from './service/breadcrumb.service';
import { ClipboardService } from './service/clipboard.service';
import { EnumSerializer } from './service/enum.serializer';
import { StorageService } from './service/storage.service';
import { TitleService } from './service/title.service';
import { SimNaoPipe } from './pipe/sim-nao.pipe';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

// Modules
const angularModules: Array<Type<any> | any[]> = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule
];
const primeNgModules: Array<Type<any> | any[]> = [
  AutoCompleteModule,
  AccordionModule,
  BreadcrumbModule,
  ButtonModule,
  SplitButtonModule,
  CalendarModule,
  CardModule,
  ChartModule,
  CheckboxModule,
  ConfirmDialogModule,
  DropdownModule,
  DynamicDialogModule,
  DialogModule,
  GrowlModule,
  InputSwitchModule,
  InputTextModule,
  FieldsetModule,
  KeyFilterModule,
  MenuModule,
  MultiSelectModule,
  PanelModule,
  PanelMenuModule,
  PasswordModule,
  PickListModule,
  SpinnerModule,
  TableModule,
  ToastModule,
  TooltipModule,
  ChipsModule,
  EditorModule,
  CaptchaModule
];

// Bibliotecas
const libraryModules: Array<Type<any> | any[]> = [
  BrMaskerModule,
  CurrencyMaskModule,
  NgBrazil,
  TextMaskModule
];

// Components, Directives and Pipes
const sharedComponents: Array<Type<any> | any[]> = [
  BreadcrumbComponent,
  CheckboxComponent,
  DropdownComponent,
  InputSwitchComponent,
  InputTextComponent,
  InputMoneyComponent,
  MultiSelectComponent,
  PageHeaderComponent,
  PageFooterComponent,
  PasswordComponent,
  PanelLoaderComponent,
  SpinnerComponent,
  ValidationComponent,
  ChipsComponent,
  DialogLoaderComponent
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
  MomentFormatPipe,
  CnpjCpfPipe,
  BrMoneyPipe,
  OrderPipe,
  CEPPipe,
  SimNaoPipe
];

// Services
const angularProviders: Array<Type<any> | any[]> = [DecimalPipe];
const primeNgProviders: Array<Type<any> | any[]> = [DialogService];
const sharedProviders: Array<Type<any> | any[]> = [
  BreadcrumbService,
  StorageService,
  TitleService,
  EnumSerializer,
  ClipboardService
];

@NgModule({
  imports: [
    angularModules,
    primeNgModules,
    libraryModules,
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
    sharedPipes,
  ],
  providers: [
    angularProviders,
    primeNgProviders,
    sharedProviders
  ],
  entryComponents: []
})
export class SharedModule { }
