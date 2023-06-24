import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

/*importacion de librerias de material */
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
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';

/*importacion de rutas */
import { ProtectedRoutingModule } from './protected-routing.module';

/*importacion de layout de administrador */
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';

/*importaciones de modulos de administrador maestro*/
import { UsuariosComponent } from './pages/admin-master/registros/usuarios/usuarios.component';
import { ProveedoresComponent } from './pages/admin-master/registros/compras/proveedores/proveedores.component';
import { ProductosComponent } from './pages/admin-master/registros/compras/productos/productos.component';
import { ComprasComponent } from './pages/admin-master/registros/compras/compras/compras.component';
import { FrontDeskComponent } from './pages/admin-master/registros/paquetes/frontdesk/frontdesk.component';
import { CafeteriaComponent } from './pages/admin-master/registros/paquetes/cafeteria/cafeteria.component';
import { AperturaCajaComponent } from './pages/admin-master/transacciones/caja/apertura-caja/apertura-caja.component';
import { CorteParcialComponent } from './pages/admin-master/transacciones/caja/corte-parcial/corte-parcial.component';

/*importaciones dialog de modulos administrador maestro*/
import { DialogUsuarioComponent } from './pages/admin-master/registros/usuarios/dialog-usuario/dialog-usuario.component';
import { DialogEditarUsuarioComponent } from './pages/admin-master/registros/usuarios/dialog-editar-usuario/dialog-editar-usuario.component';
import { DialogBorrarUsuarioComponent } from './pages/admin-master/registros/usuarios/dialog-borrar-usuario/dialog-borrar-usuario.component';

import { DialogCompraComponent } from './pages/admin-master/registros/compras/compras/dialog-compra/dialog-compra.component';
import { DialogEditarCompraComponent } from './pages/admin-master/registros/compras/compras/dialog-editar-compra/dialog-editar-compra.component';

import { DialogProveedoresComponent } from './pages/admin-master/registros/compras/proveedores/dialog-proveedores/dialog-proveedores.component';
import { DialogEditarProveedorComponent } from './pages/admin-master/registros/compras/proveedores/dialog-editar-proveedor/dialog-editar-proveedor.component';
import { DialogBorrarProveedoresComponent } from './pages/admin-master/registros/compras/proveedores/dialog-borrar-proveedores/dialog-borrar-proveedores.component';

import { DialogProductosComponent } from './pages/admin-master/registros/compras/productos/dialog-productos/dialog-productos.component';
import { DialogEditarProductoComponent } from './pages/admin-master/registros/compras/productos/dialog-editar-producto/dialog-editar-producto.component';
import { DialogBorrarProductoComponent } from './pages/admin-master/registros/compras/productos/dialog-borrar-producto/dialog-borrar-producto.component';

import { DialogFrontDeskComponent } from './pages/admin-master/registros/paquetes/frontdesk/dialog-frontdesk/dialog-frontdesk.component';
import { DialogEditarFrontDeskComponent } from './pages/admin-master/registros/paquetes/frontdesk/dialog-editar-frontdesk/dialog-editar-frontdesk.component';
import { DialogBorrarFrontDeskComponent } from './pages/admin-master/registros/paquetes/frontdesk/dialog-borrar-frontdesk/dialog-borrar-frontdesk.component';

import { DialogCafeteriaComponent } from './pages/admin-master/registros/paquetes/cafeteria/dialog-cafeteria/dialog-cafeteria.component';
import { DialogEditarCafeteriaComponent } from './pages/admin-master/registros/paquetes/cafeteria/dialog-editar-cafeteria/dialog-editar-cafeteria.component';
import { DialogBorrarCafeteriaComponent } from './pages/admin-master/registros/paquetes/cafeteria/dialog-borrar-cafeteria/dialog-borrar-cafeteria.component';

import { DialogAperturaCajaComponent } from './pages/admin-master/transacciones/caja/apertura-caja/dialog-apertura-caja/dialog-apertura-caja.component';
import { DialogCorteParcialComponent } from './pages/admin-master/transacciones/caja/corte-parcial/dialog-corte-parcial/dialog-corte-parcial.component';
import { GastosComponent } from './pages/admin-master/registros/gastos/gastos/gastos.component';
import { ServiciosComponent } from './pages/admin-master/registros/gastos/servicios/servicios.component';
import { DialogGastoComponent } from './pages/admin-master/registros/gastos/gastos/dialog-gasto/dialog-gasto.component';
import { DialogEditarGastoComponent } from './pages/admin-master/registros/gastos/gastos/dialog-editar-gasto/dialog-editar-gasto.component';
import { DialogServiciosComponent } from './pages/admin-master/registros/gastos/servicios/dialog-servicios/dialog-servicios.component';
import { DialogEditarServicioComponent } from './pages/admin-master/registros/gastos/servicios/dialog-editar-servicio/dialog-editar-servicio.component';
import { DialogBorrarServicioComponent } from './pages/admin-master/registros/gastos/servicios/dialog-borrar-servicio/dialog-borrar-servicio.component';
import { SucursalesComponent } from './pages/admin-master/registros/sucursales/sucursales.component';
import { DialogSucursalComponent } from './pages/admin-master/registros/sucursales/dialog-sucursal/dialog-sucursal.component';
import { DialogEditarSucursalComponent } from './pages/admin-master/registros/sucursales/dialog-editar-sucursal/dialog-editar-sucursal.component';
import { DialogBorrarSucursalComponent } from './pages/admin-master/registros/sucursales/dialog-borrar-sucursal/dialog-borrar-sucursal.component';

@NgModule({
  declarations: [
   AdminLayoutComponent,
   UsuariosComponent,
   ProveedoresComponent,
   ProductosComponent,
   ComprasComponent,
   GastosComponent,
   ServiciosComponent, 
   FrontDeskComponent,
   CafeteriaComponent,
   AperturaCajaComponent,
   CorteParcialComponent,
   DialogUsuarioComponent, DialogEditarUsuarioComponent, DialogBorrarUsuarioComponent,
   DialogCompraComponent, DialogEditarCompraComponent,
   DialogProveedoresComponent, DialogEditarProveedorComponent, DialogBorrarProveedoresComponent,
   DialogProductosComponent, DialogEditarProductoComponent, DialogBorrarProductoComponent,
   DialogFrontDeskComponent, DialogEditarFrontDeskComponent, DialogBorrarFrontDeskComponent,
   DialogCafeteriaComponent, DialogEditarCafeteriaComponent, DialogBorrarCafeteriaComponent,
   DialogAperturaCajaComponent, DialogCorteParcialComponent,
   DialogGastoComponent,  DialogEditarGastoComponent, 
   DialogServiciosComponent, DialogEditarServicioComponent, DialogBorrarServicioComponent, SucursalesComponent, DialogSucursalComponent, DialogEditarSucursalComponent, DialogBorrarSucursalComponent
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
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSortModule,
    HttpClientModule,
    RouterModule
  ]
})
export class ProtectedModule { }
