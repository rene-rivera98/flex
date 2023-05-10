import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiRequestService } from '../../services/api-request.service';

import { frontdesk } from 'src/app/interfaces/interface';

/* SE IMPORTA EL DIALOG FRONTDESK*/
import { DialogFrontDeskComponent} from './dialog-frontdesk/dialog-frontdesk.component';
/**/

/* LIBRERIAS DE MATERIAL ANGULAR*/
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogEditarFrontDeskComponent } from './dialog-editar-frontdesk/dialog-editar-frontdesk.component';
import { DialogBorrarFrontDeskComponent } from './dialog-borrar-frontdesk/dialog-borrar-frontdesk.component';

@Component({
  selector: 'app-frontdesk',
  templateUrl: './frontdesk.component.html',
  styleUrls: ['./frontdesk.component.css']
})
export class FrontDeskComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

     /* COLUMNAS QUE SE MOSTRARAN EN LA TABLA */
     displayedColumns: string[] = [
      'codigoPF',
      'nombrePF',
      'categoriaPF',
      'minimoPersonas',
      'maximoPersonas',
      'descripcionPF',
      'createdAt',
      'updatedAt',
      'opciones'
    ];

      /* Variable que contiene los datos de compras */
      dataSource = new MatTableDataSource<frontdesk>([]);

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
    dialogConfig.height = '600px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogEditarFrontDeskComponent, dialogConfig);
  }

  delete(element: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '180px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogBorrarFrontDeskComponent, dialogConfig);
  }

  /* FUNCION PARA ABRIR DIALOG*/
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '600px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogFrontDeskComponent, dialogConfig);
  }

}
