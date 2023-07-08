import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes Records
import { UsuariosComponent } from '../pages/records/usuarios/usuarios.component';
import { ProveedoresComponent } from '../pages/records/proveedores/proveedores.component';
import { ComprasComponent } from '../pages/records/compras/compras.component';
import { ServiciosComponent } from '../pages/records/servicios/servicios.component';
import { SucursalesComponent } from '../pages/records/sucursales/sucursales.component';
import { CafeteriaComponent } from '../pages/records/paquetes/cafeteria/cafeteria.component';
import { FrontdeskComponent } from '../pages/records/paquetes/frontdesk/frontdesk.component';
import { InsumoComponent } from '../pages/records/productos/insumo/insumo.component';
import { VentaComponent } from '../pages/records/productos/venta/venta.component';
import { ActivoComponent } from '../pages/records/productos/activo/activo.component';
import { GastosComponent } from '../pages/records/gastos/gastos.component';
import { Admin_masterLayoutComponent } from '../components/admin_master-layout/admin_master-layout.component';
import { AlmacenesComponent } from '../pages/records/almacenes/almacenes.component';
import { EntradasComponent } from '../pages/records/inventario/entradas/entradas.component';
import { SalidasComponent } from '../pages/records/inventario/salidas/salidas.component';
import { InventarioComponent } from '../pages/records/inventario/inventario/inventario.component';
import { UserInfoComponent } from '../shared/user-info/user-info.component';

const routes: Routes = [
  { path: 'administrador', component: Admin_masterLayoutComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'compras', component: ComprasComponent},
  { path: 'proveedores', component: ProveedoresComponent},
  { path: 'gastos', component: GastosComponent},
  { path: 'servicios', component: ServiciosComponent},
  { path: 'sucursales', component: SucursalesComponent},
  { path: 'productos-insumo', component: InsumoComponent},
  { path: 'productos-venta', component: VentaComponent},
  { path: 'productos-activo', component: ActivoComponent},
  { path: 'cafeteria', component: CafeteriaComponent},
  { path: 'frontdesk', component: FrontdeskComponent},
  { path: 'almacenes', component: AlmacenesComponent},
  { path: 'entradas', component: EntradasComponent},
  { path: 'salidas', component: SalidasComponent},
  { path: 'inventario', component: InventarioComponent},
  { path: 'perfil', component: UserInfoComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
