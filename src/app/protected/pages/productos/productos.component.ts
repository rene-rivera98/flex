import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiRequestService } from '../../services/api-request.service';

import { productos } from 'src/app/interfaces/interface';

import { Observable } from 'rxjs';

/* SE IMPORTA EL DIALOG PRODUCTOS*/

/* LIBRERIAS DE MATERIAL ANGULAR*/
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { DialogProductosComponent } from './dialog-productos/dialog-productos.component';
import { DialogBorrarProductoComponent } from './dialog-borrar-producto/dialog-borrar-producto.component';
import { DialogEditarProductoComponent } from './dialog-editar-producto/dialog-editar-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent{
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  /* COLUMNAS QUE SE MOSTRARAN EN LA TABLA */
  displayedColumns: string[] = [
    'codigoP',
    'nombreProducto',
    'tamanioProducto',
    'tallaProducto',
    'stockProducto',
    'createdAt',
    'updatedAt',
    'opciones'
  ];

  /* Variable que contiene los datos de productos */
  dataSource = new MatTableDataSource<productos>([]);


  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

    /* EVENTO QUE APLICA EL FILTRO */
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    /* FUNCION PARA ABRIR DIALOG*/
    openDialog(): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true; /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
      dialogConfig.width = '550px'; // Asignar ancho al dialog
      dialogConfig.height = '500px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogProductosComponent, dialogConfig);
    }

    /* FUNCION PARA ABRIR DIALOG EDIT*/
    edit(element: any): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true; /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
      dialogConfig.width = '550px'; // Asignar ancho al dialog
      dialogConfig.height = '500px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogEditarProductoComponent, dialogConfig);
    }

    delete(element: any): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true; /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
      dialogConfig.width = '650px'; // Asignar ancho al dialog
      dialogConfig.height = '180px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogBorrarProductoComponent, dialogConfig);
    }

}
