import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductoService } from 'src/app/protected/services/producto.service';
import { producto_venta } from 'src/app/protected/interfaces/interfaces';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DialogVentaComponent } from './dialog-venta/dialog-venta.component';
import { DialogEditarVentaComponent } from './dialog-editar-venta/dialog-editar-venta.component';
import { DialogBorrarVentaComponent } from './dialog-borrar-venta/dialog-borrar-venta.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'codigo',
    'area',
    'nombre',
    'talla',
    'unidad_medida',
    'precio',
    'perecedero',
    'tipo_egreso',
    'created_at',
    'updated_at',    
    'opciones'
  ];

  dataSource: MatTableDataSource<producto_venta> = new MatTableDataSource<producto_venta>([]);

  ventaCreatedSubscription!: Subscription;
  ventaUpdatedSubscription!: Subscription;
  ventaDeletedSubscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    private productoService : ProductoService
  ) { }

  createDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '870px';
    dialogConfig.height = '720px';
    const dialogRef = this.dialog.open(DialogVentaComponent, dialogConfig);
  }

  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    const dialogRefEd = this.dialog.open(DialogEditarVentaComponent, {
      data: element,
      disableClose: true,
      width: '870px',
      height: '720px'
    });
  }

  openDeleteConfirmationDialog(element: any): void {
    if (element.id_producto) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.width = '650px';
      dialogConfig.height = '180px';
      dialogConfig.data = { venta: { id_producto: element.id_producto } };
      const dialogRefEd = this.dialog.open(DialogBorrarVentaComponent, dialogConfig);
    } else {
      console.error('La fila seleccionada no tiene un ID de producto válido.');
    }
  }

  deleteDialog(element: any): void {
    this.openDeleteConfirmationDialog(element);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getVentas();

    this.ventaCreatedSubscription = this.productoService.ventaCreated$.subscribe((venta) => {
      if (venta) {
        this.getVentas();
      }
    });

    this.ventaUpdatedSubscription = this.productoService.ventaUpdated$.subscribe((venta) => {
      if (venta) {
        this.getVentas();
      }
    });

    this.ventaDeletedSubscription = this.productoService.ventaDeleted$.subscribe((venta) => {
      if (venta) {
        this.getVentas();
      }
    });
  }

  getVentas() {
    this.productoService.getVentas().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener las productos:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.ventaCreatedSubscription.unsubscribe();
    this.ventaUpdatedSubscription.unsubscribe();
    this.ventaDeletedSubscription.unsubscribe();
  }

}
