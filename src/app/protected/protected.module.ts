import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ProtectedRoutingModule } from './protected-routing.module';

import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { RInsumosComponent } from './pages/r-insumos/r-insumos.component';
import { RMermaComponent } from './pages/r-merma/r-merma.component';
import { RVentasComponent } from './pages/r-ventas/r-ventas.component';
import { DialogUsuarioComponent } from './pages/usuarios/dialog-usuario/dialog-usuario.component';
import { DialogCompraComponent } from './pages/compras/dialog-compra/dialog-compra.component';
import { DialogEditarCompraComponent } from './pages/compras/dialog-editar-compra/dialog-editar-compra.component';
import { DialogEditarUsuarioComponent } from './pages/usuarios/dialog-editar-usuario/dialog-editar-usuario.component';
import { DialogProveedoresComponent } from './pages/proveedores/dialog-proveedores/dialog-proveedores.component';
import { DialogEditarProveedorComponent } from './pages/proveedores/dialog-editar-proveedor/dialog-editar-proveedor.component';
import { DialogBorrarUsuarioComponent } from './pages/usuarios/dialog-borrar-usuario/dialog-borrar-usuario.component';
import { DialogBorrarProveedoresComponent } from './pages/proveedores/dialog-borrar-proveedores/dialog-borrar-proveedores.component';
import { DialogProductosComponent } from './pages/productos/dialog-productos/dialog-productos.component';
import { DialogBorrarProductoComponent } from './pages/productos/dialog-borrar-producto/dialog-borrar-producto.component';
import { DialogEditarProductoComponent } from './pages/productos/dialog-editar-producto/dialog-editar-producto.component';
import { FrontDeskComponent } from './pages/frontdesk/frontdesk.component';
import { DialogFrontDeskComponent } from './pages/frontdesk/dialog-frontdesk/dialog-frontdesk.component';
import { DialogEditarFrontDeskComponent } from './pages/frontdesk/dialog-editar-frontdesk/dialog-editar-frontdesk.component';
import { DialogBorrarFrontDeskComponent } from './pages/frontdesk/dialog-borrar-frontdesk/dialog-borrar-frontdesk.component';
import { CafeteriaComponent } from './pages/cafeteria/cafeteria.component';
import { DialogCafeteriaComponent } from './pages/cafeteria/dialog-cafeteria/dialog-cafeteria.component';
import { DialogEditarCafeteriaComponent } from './pages/cafeteria/dialog-editar-cafeteria/dialog-editar-cafeteria.component';
import { DialogBorrarCafeteriaComponent } from './pages/cafeteria/dialog-borrar-cafeteria/dialog-borrar-cafeteria.component';
import { AperturaCajaComponent } from './pages/apertura-caja/apertura-caja.component';
import { CorteParcialComponent } from './pages/corte-parcial/corte-parcial.component';
import { DialogAperturaCajaComponent } from './pages/apertura-caja/dialog-apertura-caja/dialog-apertura-caja.component';
import { DialogCorteParcialComponent } from './pages/corte-parcial/dialog-corte-parcial/dialog-corte-parcial.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    AdminLayoutComponent,
    ProveedoresComponent,
    ProductosComponent,
    ComprasComponent,
    FacturasComponent,
    RInsumosComponent,
    RMermaComponent,
    RVentasComponent,
    DialogUsuarioComponent,
    DialogCompraComponent,
    DialogEditarCompraComponent,
    DialogEditarUsuarioComponent,
    DialogProveedoresComponent,
    DialogEditarProveedorComponent,
    DialogBorrarUsuarioComponent,
    DialogBorrarProveedoresComponent,
    DialogProductosComponent,
    DialogBorrarProductoComponent,
    DialogEditarProductoComponent,
    DialogFrontDeskComponent,
    FrontDeskComponent,
    DialogEditarFrontDeskComponent,
    DialogBorrarFrontDeskComponent,
    CafeteriaComponent,
    DialogCafeteriaComponent,
    DialogEditarCafeteriaComponent,
    DialogBorrarCafeteriaComponent,
    AperturaCajaComponent,
    CorteParcialComponent,
    DialogAperturaCajaComponent,
    DialogCorteParcialComponent
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
    MatCheckboxModule
  ]
})
export class ProtectedModule { }
