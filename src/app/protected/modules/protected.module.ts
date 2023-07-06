import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//librerias material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

//rutas
import { ProtectedRoutingModule } from './protected-routing.module';

//layouts

//componentes records
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
import { AlmacenesComponent } from '../pages/records/almacenes/almacenes.component';
import { EntradasComponent } from '../pages/records/inventario/entradas/entradas.component';
import { SalidasComponent } from '../pages/records/inventario/salidas/salidas.component';
import { InventarioComponent } from '../pages/records/inventario/inventario/inventario.component';
import { Admin_masterLayoutComponent } from '../components/admin_master-layout/admin_master-layout.component';

//dialog componentes records
import { DialogUsuarioComponent } from '../pages/records/usuarios/dialog-usuario/dialog-usuario.component';
import { DialogEditarUsuarioComponent } from '../pages/records/usuarios/dialog-editar-usuario/dialog-editar-usuario.component';
import { DialogBorrarUsuarioComponent } from '../pages/records/usuarios/dialog-borrar-usuario/dialog-borrar-usuario.component';
import { DialogCredUsuarioComponent } from '../pages/records/usuarios/dialog-cred-usuario/dialog-cred-usuario.component';

import { DialogCompraComponent } from '../pages/records/compras/dialog-compra/dialog-compra.component';
import { DialogEditarCompraComponent } from '../pages/records/compras/dialog-editar-compra/dialog-editar-compra.component';

import { DialogGastoComponent } from '../pages/records/gastos/dialog-gasto/dialog-gasto.component';
import { DialogEditarGastoComponent } from '../pages/records/gastos/dialog-editar-gasto/dialog-editar-gasto.component';

import { DialogProveedoresComponent } from '../pages/records/proveedores/dialog-proveedores/dialog-proveedores.component';
import { DialogEditarProveedorComponent } from '../pages/records/proveedores/dialog-editar-proveedor/dialog-editar-proveedor.component';
import { DialogBorrarProveedoresComponent } from '../pages/records/proveedores/dialog-borrar-proveedores/dialog-borrar-proveedores.component';

import { DialogServiciosComponent } from '../pages/records/servicios/dialog-servicios/dialog-servicios.component';
import { DialogEditarServicioComponent } from '../pages/records/servicios/dialog-editar-servicio/dialog-editar-servicio.component';
import { DialogBorrarServicioComponent } from '../pages/records/servicios/dialog-borrar-servicio/dialog-borrar-servicio.component';

import { DialogSucursalComponent } from '../pages/records/sucursales/dialog-sucursal/dialog-sucursal.component';
import { DialogEditarSucursalComponent } from '../pages/records/sucursales/dialog-editar-sucursal/dialog-editar-sucursal.component';
import { DialogBorrarSucursalComponent } from '../pages/records/sucursales/dialog-borrar-sucursal/dialog-borrar-sucursal.component';

import { DialogInsumoComponent } from '../pages/records/productos/insumo/dialog-insumo/dialog-insumo.component';
import { DialogEditarInsumoComponent } from '../pages/records/productos/insumo/dialog-editar-insumo/dialog-editar-insumo.component';
import { DialogBorrarInsumoComponent } from '../pages/records/productos/insumo/dialog-borrar-insumo/dialog-borrar-insumo.component';


import { DialogActivoComponent } from '../pages/records/productos/activo/dialog-activo/dialog-activo.component';
import { DialogEditarActivoComponent } from '../pages/records/productos/activo/dialog-editar-activo/dialog-editar-activo.component';
import { DialogBorrarActivoComponent } from '../pages/records/productos/activo/dialog-borrar-activo/dialog-borrar-activo.component';

import { DialogVentaComponent } from '../pages/records/productos/venta/dialog-venta/dialog-venta.component';
import { DialogEditarVentaComponent } from '../pages/records/productos/venta/dialog-editar-venta/dialog-editar-venta.component';
import { DialogBorrarVentaComponent } from '../pages/records/productos/venta/dialog-borrar-venta/dialog-borrar-venta.component';

import { DialogAlmacenesComponent } from '../pages/records/almacenes/dialog-almacenes/dialog-almacenes.component';

import { DialogEntradaComponent } from '../pages/records/inventario/entradas/dialog-entrada/dialog-entrada.component';

@NgModule({
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
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSortModule,
    HttpClientModule,
    RouterModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule
  ],
  declarations: [
    UsuariosComponent, DialogUsuarioComponent, DialogEditarUsuarioComponent, DialogCredUsuarioComponent, DialogBorrarUsuarioComponent,
    ProveedoresComponent, DialogProveedoresComponent, DialogEditarProveedorComponent, DialogBorrarProveedoresComponent,
    ComprasComponent, DialogCompraComponent, DialogEditarCompraComponent,
    GastosComponent, DialogGastoComponent, DialogEditarGastoComponent,
    ServiciosComponent, DialogServiciosComponent, DialogEditarServicioComponent, DialogBorrarServicioComponent,
    CafeteriaComponent,
    FrontdeskComponent,
    SucursalesComponent, DialogSucursalComponent, DialogEditarSucursalComponent,DialogBorrarSucursalComponent,
    InsumoComponent, DialogInsumoComponent, DialogEditarInsumoComponent, DialogBorrarInsumoComponent,
    VentaComponent, DialogVentaComponent, DialogEditarVentaComponent, DialogBorrarVentaComponent,
    ActivoComponent, DialogActivoComponent, DialogEditarActivoComponent, DialogBorrarActivoComponent,
    Admin_masterLayoutComponent,
    AlmacenesComponent, DialogAlmacenesComponent,
    EntradasComponent, DialogEntradaComponent,
    SalidasComponent,
    InventarioComponent
  ]
})
export class ProtectedModule { }
