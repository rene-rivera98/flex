import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'compras', component: ComprasComponent },
  { path: 'proveedores', component: ProveedoresComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
