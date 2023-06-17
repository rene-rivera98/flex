import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './pages/admin-master/registros/usuarios/usuarios.component';
import { ComprasComponent } from './pages/admin-master/registros/compras/compras/compras.component';
import { ProveedoresComponent } from './pages/admin-master/registros/compras/proveedores/proveedores.component';
import { ProductosComponent } from './pages/admin-master/registros/compras/productos/productos.component';
import { FrontDeskComponent } from './pages/admin-master/registros/paquetes/frontdesk/frontdesk.component';
import { CafeteriaComponent } from './pages/admin-master/registros/paquetes/cafeteria/cafeteria.component';
import { AperturaCajaComponent } from './pages/admin-master/transacciones/caja/apertura-caja/apertura-caja.component';
import { CorteParcialComponent } from './pages/admin-master/transacciones/caja/corte-parcial/corte-parcial.component';

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
