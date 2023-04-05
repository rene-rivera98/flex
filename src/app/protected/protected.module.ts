import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

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
import { DialogUsuarioComponent } from './pages/usuarios/dialog/dialog-usuario/dialog-usuario.component';

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
    RVentasComponent,
    DialogUsuarioComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule
  ]
})
export class ProtectedModule { }
