import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { FrontDeskComponent } from './pages/frontdesk/frontdesk.component';
import { CafeteriaComponent } from './pages/cafeteria/cafeteria.component';
import { AperturaCajaComponent } from './pages/apertura-caja/apertura-caja.component';
import { CorteParcialComponent } from './pages/corte-parcial/corte-parcial.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'compras', component: ComprasComponent },
  { path: 'proveedores', component: ProveedoresComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'frontdesk', component: FrontDeskComponent},
  { path: 'cafeteria', component: CafeteriaComponent},
  { path: 'apertura-caja', component: AperturaCajaComponent},
  { path: 'corte-parcial', component: CorteParcialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
