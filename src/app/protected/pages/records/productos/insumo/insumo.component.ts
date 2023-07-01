import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductoService } from 'src/app/protected/services/producto.service';
import { producto_insumo } from 'src/app/protected/interfaces/interfaces';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import { DialogInsumoComponent } from './dialog-insumo/dialog-insumo.component';
import { DialogEditarInsumoComponent } from './dialog-editar-insumo/dialog-editar-insumo.component';
import { DialogBorrarInsumoComponent } from './dialog-borrar-insumo/dialog-borrar-insumo.component';

@Component({
  selector: 'app-producto-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.css']
})
export class InsumoComponent implements AfterViewInit, OnDestroy{

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
    public dialog: MatDialog,
    private productoService : ProductoService
  ) { }

  createDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '670px';
    dialogConfig.height = '420px';
    const dialogRef = this.dialog.open(DialogInsumoComponent, dialogConfig);
  }

  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '670px'; // Asignar ancho al dialog
    dialogConfig.height = '420px'; // Asignar ancho al dialog
    const dialogRefEd = this.dialog.open(DialogEditarInsumoComponent, {
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

    this.getInsumos();

    this.insumoCreatedSubscription = this.productoService.insumoCreated$.subscribe((insumo) => {
      if (insumo) {
        this.getInsumos();
      }
    });

    this.insumoUpdatedSubscription = this.productoService.insumoUpdated$.subscribe((insumo) => {
      if (insumo) {
        this.getInsumos();
      }
    });
  }

  getInsumos() {
    this.productoService.getInsumos().subscribe(
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

