import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiRequestService } from '../../services/api-request.service';

import { cafeteria } from 'src/app/interfaces/interface';

import { DialogCafeteriaComponent } from './dialog-cafeteria/dialog-cafeteria.component';
import { DialogBorrarCafeteriaComponent } from './dialog-borrar-cafeteria/dialog-borrar-cafeteria.component';
import { DialogEditarCafeteriaComponent } from './dialog-editar-cafeteria/dialog-editar-cafeteria.component';

/* LIBRERIAS DE MATERIAL ANGULAR*/
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-cafeteria',
  templateUrl: './cafeteria.component.html',
  styleUrls: ['./cafeteria.component.css']
})
export class CafeteriaComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  /* COLUMNAS QUE SE MOSTRARAN EN LA TABLA */
  displayedColumns: string[] = [
    'codigoPC',
    'nombrePC',
    'descripcionPC',
    'createdAt',
    'updatedAt',
    'opciones'
  ];

  /* Variable que contiene los datos de compras */
  dataSource = new MatTableDataSource<cafeteria>([]);

  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

   /* EVENTO QUE APLICA EL FILTRO */
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(element: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '550px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogEditarCafeteriaComponent, dialogConfig);
  }

  delete(element: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '180px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogBorrarCafeteriaComponent, dialogConfig);
  }

  /* FUNCION PARA ABRIR DIALOG*/
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '550px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogCafeteriaComponent, dialogConfig);
  }
}
