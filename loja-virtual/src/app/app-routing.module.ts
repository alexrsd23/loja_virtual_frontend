import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/v1/login/components/login.component';
import { LoginModule } from './features/v1/login/login.module';
import { AutenticacaoGuard } from './core/guards/autenticacao.guard';
import { HomeComponent } from './features/v1/home/components/home.component';
import { ForbidenComponent } from './features/v1/forbiden/components/forbiden.component';
import { CustomReuseStrategy } from './shared/CustomReuseStrategy';
import { RegistroComponent } from './features/v1/registro/components/registro.component';
import { RegistroEmpresaComponent } from './features/v1/registroEmpresa/components/registroEmpresa.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
  },
  { path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'forbidden',
    component: ForbidenComponent,
  },
  {
    path: 'registrar',
    component: RegistroComponent,
  },
  {
    path: 'registrarempresa',
    component: RegistroEmpresaComponent,
    canActivate: [AutenticacaoGuard],
    data: { roles: ['ROLE_ADMIN'] },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    LoginModule],
    providers: [
      {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
    ],
    exports: [RouterModule],
  })
export class AppRoutingModule { }
