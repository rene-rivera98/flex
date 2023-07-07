import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import { CompraService } from 'src/app/protected/services/compra.service';
import { compra, sucursal, proveedores } from 'src/app/protected/interfaces/interfaces';
import { DialogCompraComponent } from './dialog-compra/dialog-compra.component';
import { DialogEditarCompraComponent } from './dialog-editar-compra/dialog-editar-compra.component';
import { DialogPagosComprasComponent } from './dialog-pagos-compras/dialog-pagos-compras.component';
import { SucursalService } from 'src/app/protected/services/sucursal.service';
import { ProveedorService } from 'src/app/protected/services/proveedor.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})

export class ComprasComponent implements AfterViewInit, OnDestroy{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'folio_compra',
    'nombreProveedor',
    'metodo_pago',
    'monto_total',
    'fecha_factura',
    'nombreSucursal',
    'estado_pago',
    'created_at',
    'updated_at',
    'opciones',
  ];

  dataSource: MatTableDataSource<compra> = new MatTableDataSource<compra>([]);

  compraCreatedSubscription!: Subscription;
  compraUpdatedSubscription!: Subscription;
  pagoCreatedSubscription!: Subscription;

  constructor(
    private compraService: CompraService,
    private sucursalService: SucursalService,
    private proveedorService : ProveedorService,
    public dialog: MatDialog) {}

  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '780px'; // Asignar ancho al dialog
    dialogConfig.height = '700px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogCompraComponent, dialogConfig); //abre el dialog
  }

  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    const dialogRefEd = this.dialog.open(DialogEditarCompraComponent, {
      data: element,
      disableClose: true,
      width: '780px',
      height: '700px'
    });
  }

  pagoDialog(element: any) {
    if (element.id_compra || element.monto_total) {
      console.log('ID de compra:', element.id_compra, element.monto_total);
  
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.width = '750px';
      dialogConfig.height = '720px';
      dialogConfig.data = { compra: { id_compra: element.id_compra, monto_total: element.monto_total } };
      const dialogRefEd = this.dialog.open(DialogPagosComprasComponent, dialogConfig);
    } else {
      // Manejar el caso cuando no se tiene el ID de la sucursal
      console.error('La fila seleccionada no tiene un ID de compra válido.');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.compraCreatedSubscription = this.compraService.compraCreated$.subscribe(() => {
      this.getCompras();
    });

    this.compraUpdatedSubscription = this.compraService.compraUpdated$.subscribe(() => {
      this.getCompras();
    });

    this.pagoCreatedSubscription = this.compraService.pagoCreated$.subscribe(() => {
      this.getCompras();
    });
  }

  getCompras() {
    this.sucursalService.getSucursales_().subscribe(
      (sucursales: sucursal[]) => {
        const sucursalesMap = new Map<string, string>(sucursales.map(sucursal => [sucursal.id_sucursal, sucursal.nombre]));
  
        this.proveedorService.getProveedores_().subscribe(
          (proveedores: proveedores[]) => {
            const proveedoresMap = new Map<string, string>(proveedores.map(proveedor => [proveedor.id_proveedor, proveedor.nombre]));
  
            this.compraService.getCompras().subscribe(
              (compras: compra[]) => {
                this.dataSource.data = compras.map(compra => ({
                  ...compra,
                  nombreSucursal: sucursalesMap.get(compra.id_sucursal) || '',
                  nombreProveedor: proveedoresMap.get(compra.id_proveedor) || ''
                }));
              },
              error => {
                console.error('Error al obtener las compras:', error);
              }
            );
          },
          error => {
            console.error('Error al obtener los proveedores:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener las sucursales:', error);
      }
    );
  }
  

  ngOnDestroy(): void {
    
  }

}

