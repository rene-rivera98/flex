import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ComprasComponent } from './pages/compras/compras.component';

const routes: Routes = [
  {
    path: '',
    component: ComprasComponent,
    children: [
      { path: 'registro', component: DashboardComponent },
      { path: '**', redirectTo: '/compras' }
      // { path: 'auth', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
