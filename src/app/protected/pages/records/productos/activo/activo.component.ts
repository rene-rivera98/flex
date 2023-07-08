import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductoService } from 'src/app/protected/services/producto.service';
import { productos_activo } from 'src/app/protected/interfaces/interfaces';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import { DialogActivoComponent } from './dialog-activo/dialog-activo.component';
import { DialogEditarActivoComponent } from './dialog-editar-activo/dialog-editar-activo.component';
import { DialogBorrarActivoComponent } from './dialog-borrar-activo/dialog-borrar-activo.component';

@Component({
  selector: 'app-activo',
  templateUrl: './activo.component.html',
  styleUrls: ['./activo.component.css']
})
export class ActivoComponent implements AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'tipo_egreso',
    'created_at',
    'updated_at',    
    'opciones'
  ];

  dataSource: MatTableDataSource<productos_activo> = new MatTableDataSource<productos_activo>([]);

  activoCreatedSubscription!: Subscription;
  activoUpdatedSubscription!: Subscription;
  activoDeletedSubscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    private productoService : ProductoService
  ) { }

  createDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '670px';
    dialogConfig.height = '380px';
    const dialogRef = this.dialog.open(DialogActivoComponent, dialogConfig);
  }

  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    const dialogRefEd = this.dialog.open(DialogEditarActivoComponent, {
      data: element,
      width: '670px',
      height: '380px',
      disableClose: true
    });
  }

  openDeleteConfirmationDialog(element: any): void {
    if (element.id_producto) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.width = '650px';
      dialogConfig.height = '180px';
      dialogConfig.data = { insumo: { id_producto: element.id_producto } };
      const dialogRefEd = this.dialog.open(DialogBorrarActivoComponent, dialogConfig);
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
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getActivos();

    this.activoCreatedSubscription = this.productoService.activoCreated$.subscribe((activo) => {
      if (activo) {
        this.getActivos();
      }
    });

    this.activoUpdatedSubscription = this.productoService.activoUpdated$.subscribe((activo) => {
      if (activo) {
        this.getActivos();
      }
    });

    this.activoDeletedSubscription = this.productoService.activoDeleted$.subscribe((activo) => {
      if (activo) {
        this.getActivos();
      }
    });
  }

  getActivos() {
    this.productoService.getActivos_().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener las productos:', error);
      }
    );
  }

  ngOnDestroy(): void {
    
  }
}
