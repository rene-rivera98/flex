import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './pages/admin-master/registros/usuarios/usuarios.component';
import { ComprasComponent } from './pages/admin-master/registros/compras/compras/compras.component';
import { ProveedoresComponent } from './pages/admin-master/registros/compras/proveedores/proveedores.component';
import { FrontDeskComponent } from './pages/admin-master/registros/paquetes/frontdesk/frontdesk.component';
import { CafeteriaComponent } from './pages/admin-master/registros/paquetes/cafeteria/cafeteria.component';
import { AperturaCajaComponent } from './pages/admin-master/transacciones/caja/apertura-caja/apertura-caja.component';
import { CorteParcialComponent } from './pages/admin-master/transacciones/caja/corte-parcial/corte-parcial.component';
import { GastosComponent } from './pages/admin-master/registros/gastos/gastos/gastos.component';
import { ServiciosComponent } from './pages/admin-master/registros/gastos/servicios/servicios.component';
import { SucursalesComponent } from './pages/admin-master/registros/sucursales/sucursales.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { ProductoActivoComponent } from './pages/admin-master/registros/productos/producto-activo/producto-activo.component'; 
import { ProductoInsumoComponent } from './pages/admin-master/registros/productos/producto-insumo/producto-insumo.component';
import { ProductoVentaComponent } from './pages/admin-master/registros/productos/producto-venta/producto-venta.component';

const routes: Routes = [
  { path: 'administrador', component: AdminLayoutComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'compras', component: ComprasComponent },
  { path: 'proveedores', component: ProveedoresComponent},
  { path: 'frontdesk', component: FrontDeskComponent},
  { path: 'cafeteria', component: CafeteriaComponent},
  { path: 'apertura-caja', component: AperturaCajaComponent},
  { path: 'corte-parcial', component: CorteParcialComponent},
  { path: 'gastos', component: GastosComponent},
  { path: 'servicios', component: ServiciosComponent},
  { path: 'sucursales', component: SucursalesComponent},
  { path: 'productos-activo', component: ProductoActivoComponent},
  { path: 'productos-venta', component: ProductoVentaComponent},
  { path: 'productos-insumo', component: ProductoInsumoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
