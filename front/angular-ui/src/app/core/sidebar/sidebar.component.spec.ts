import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from '@app/security/shared/auth.service';
import { SharedModule } from '@app/shared/shared.module';
import { UsuarioModule } from '@app/administrativo/usuario/usuario.module';
import { SidebarComponent } from './sidebar.component';
import { MenuBuilder } from '../shared/menu-builder';

class MockAuthService {
  getUsername(): string {
    return 'admin';
  }

  getFuncionarioId(): string {
    return '1';
  }

  logout(): void {
  }

  hasAnyAuthority(authority: string): boolean {
    const authorities: string[] = ['ROLE_GRUPO_LISTAR', 'ROLE_GRUPO_CADASTRAR'];

    return authorities.some(value => authority === value);
  }
}

describe('Core: SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule,
        UsuarioModule
      ],
      declarations: [SidebarComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        MenuBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    authService = TestBed.get(AuthService);
  });

  beforeEach(() => {
    spyOn(authService, 'logout');
  });

  beforeEach(() => {
    spyOn(component.itemClick, 'emit');
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar o item de menu Grupo com um itens', () => {
    expect(component.menuItems[1].label).toEqual('Administrativo');
    expect(component.menuItems[1].items.length).toBe(1);
  });

  it('deve chamar o logout no comando do item de menu Logout', () => {
    component.menuItems[component.menuItems.length - 1].command();

    expect(authService.logout).toHaveBeenCalled();
  });
});
