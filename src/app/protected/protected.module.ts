import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CafeteriaComponent } from './pages/cafeteria/cafeteria.component';
import { FrontdeskComponent } from './pages/frontdesk/frontdesk.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { CajaComponent } from './pages/caja/caja.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { RInsumosComponent } from './pages/r-insumos/r-insumos.component';
import { RMermaComponent } from './pages/r-merma/r-merma.component';
import { RVentasComponent } from './pages/r-ventas/r-ventas.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    AdminLayoutComponent,
    ProveedoresComponent,
    ProductosComponent,
    CafeteriaComponent,
    FrontdeskComponent,
    ComprasComponent,
    GastosComponent,
    CajaComponent,
    FacturasComponent,
    RInsumosComponent,
    RMermaComponent,
    RVentasComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
