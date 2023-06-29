import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiRequestService } from 'src/app/protected/services/api-request.service';
import { ProductosService } from 'src/app/protected/services/productos.service';
import { producto_insumo } from 'src/app/interfaces/interface';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DialogProductoInsumoComponent } from './dialog-producto-insumo/dialog-producto-insumo.component';
import { DialogEditarProductoInsumoComponent } from './dialog-editar-producto-insumo/dialog-editar-producto-insumo.component';
@Component({
  selector: 'app-producto-insumo',
  templateUrl: './producto-insumo.component.html',
  styleUrls: ['./producto-insumo.component.css']
})
export class ProductoInsumoComponent implements AfterViewInit, OnDestroy{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'cantidad',
    'unidad_medida',
    'perecedero',
    'tipo_egreso',
    'created_at',
    'updated_at',    
    'opciones'
  ];

  dataSource: MatTableDataSource<producto_insumo> = new MatTableDataSource<producto_insumo>([]);

  insumoCreatedSubscription!: Subscription;
  insumoUpdatedSubscription!: Subscription;
  insumoDeletedSubscription!: Subscription;

  constructor(
    private apiRequest: ApiRequestService,
    public dialog: MatDialog,
    private productoService : ProductosService
  ) { }

  createDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '670px';
    dialogConfig.height = '420px';
    const dialogRef = this.dialog.open(DialogProductoInsumoComponent, dialogConfig);
  }

  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '670px'; // Asignar ancho al dialog
    dialogConfig.height = '420px'; // Asignar ancho al dialog
    const dialogRefEd = this.dialog.open(DialogEditarProductoInsumoComponent, {
      data: element
    });
  }
  deleteDialog(element: any) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getProductos();

    this.insumoCreatedSubscription = this.productoService.insumoCreated$.subscribe((insumo) => {
      if (insumo) {
        this.getProductos();
      }
    });

    this.insumoUpdatedSubscription = this.productoService.insumoUpdated$.subscribe((insumo) => {
      if (insumo) {
        this.getProductos();
      }
    });
  }

  getProductos() {
    this.apiRequest.getProductos().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener las productos:', error);
      }
    );
  }

  ngOnDestroy(): void {}
}
