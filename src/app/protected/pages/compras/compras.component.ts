import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiRequestService } from '../../services/api-request.service';

import { compra } from 'src/app/interfaces/interface';

/* SE IMPORTA EL DIALOG COMPRAS*/
import { DialogCompraComponent } from './dialog-compra/dialog-compra.component';
import { DialogEditarCompraComponent } from './dialog-editar-compra/dialog-editar-compra.component';
/**/

import { Observable } from 'rxjs';

/* LIBRERIAS DE MATERIAL ANGULAR*/
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';

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
    'importeTotal',
    'opciones'
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

 /* FUNCION PARA ABRIR DIALOG EDIT*/
edit(element: any): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true; /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
  dialogConfig.width = '650px'; // Asignar ancho al dialog
  dialogConfig.height = '650px'; // Asignar ancho al dialog
  const dialogRefEd = this.dialog.open(DialogEditarCompraComponent, dialogConfig);
}


}

/* ESTO ES SOLO PARA CAMBIAR IDIOMA DE PAGINADOR*/
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Registros por página:';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
  override getRangeLabel = function(page: number, pageSize: number, length: any) {
    const from = page * pageSize + 1;
    const to = (page + 1) * pageSize;
    return `${from} - ${to} de ${length}`;
  }
}