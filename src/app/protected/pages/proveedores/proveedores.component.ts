import { Component, OnInit,  ViewChild } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';

import { proveedores } from 'src/app/interfaces/interface';

import { Observable } from 'rxjs';

/* LIBRERIAS DE MATERIAL ANGULAR*/
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { DialogProveedoresComponent } from './dialog-proveedores/dialog-proveedores.component';
import { DialogBorrarProveedoresComponent } from './dialog-borrar-proveedores/dialog-borrar-proveedores.component';
import { DialogEditarProveedorComponent } from './dialog-editar-proveedor/dialog-editar-proveedor.component';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /* COLUMNAS QUE SE MOSTRARAN EN LA TABLA */
  displayedColumns: string[] = [
    'rfc',
    'nombreProveedor',
    'codigoP',
    'regimenFiscal',
    'correo',
    'telefono1',
    'telefono2',
    'nombreBanco',
    'claveInter',
    'cuentaBanc',
    'opciones'
  ];

    /* Variable que contiene los datos de usuarios */
    dataSource = new MatTableDataSource<proveedores>([]);

  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /* FUNCION PARA ABRIR DIALOG*/
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogProveedoresComponent, {
      disableClose: true, /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
    });
  }

  /* EVENTO QUE APLICA EL FILTRO */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

     /* FUNCION PARA ABRIR DIALOG EDIT*/
  edit(element: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '650px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogEditarProveedorComponent, dialogConfig);
  }

  delete(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '650px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogBorrarProveedoresComponent, dialogConfig);
  }
}
