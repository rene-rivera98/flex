import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiRequestService } from '../../services/api-request.service';

import { compra } from 'src/app/interfaces/interface';

/* SE IMPORTA EL DIALOG COMPRAS*/
import { DialogCompraComponent } from './dialog/dialog-compra/dialog-compra.component';
/**/

import { Observable } from 'rxjs';

/* LIBRERIAS DE MATERIAL ANGULAR*/
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})

export class ComprasComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   /* COLUMNAS QUE SE MOSTRARAN EN LA TABLA */
   displayedColumns: string[] = [
    'proveedor',
    'referencia',
    'fechaFactura',
    'complementoPago',
    'importeTotal'
  ];

  /* Variable que contiene los datos de compras */
  dataSource = new MatTableDataSource<compra>([]);

  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

/*INICIALIZA ObtenerCompras()*/
  ngOnInit(): void {
  this.obtenerCompras();
 }

 obtenerCompras(){
  this._entriesService.getCompras().subscribe(
    response =>{
      console.log(response);
        this.dataSource.data;
    }
  );
}

 /* FUNCION PARA ABRIR DIALOG*/
 openDialog(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true; /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
  dialogConfig.width = '950px'; // Asignar ancho al dialog
  dialogConfig.height = '600px'; // Asignar ancho al dialog
  const dialogRef = this.dialog.open(DialogCompraComponent, dialogConfig);
}
/* EVENTO QUE APLICA EL FILTRO */
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
