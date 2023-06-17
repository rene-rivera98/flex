
import { Component, ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { compra } from 'src/app/interfaces/interface';

//importacion de dialog compras
import { DialogCompraComponent } from './dialog-compra/dialog-compra.component';
import { DialogEditarCompraComponent } from './dialog-editar-compra/dialog-editar-compra.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})

export class ComprasComponent {

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // se crean las columnas de la tabla 
  displayedColumns: string[] = [
    'proveedor',
    'referencia',
    'fechaFactura',
    'complementoPago',
    'importeTotal',
    'opciones',
  ];

  // Variable que contiene los campos de interfaz compra 
  dataSource = new MatTableDataSource<compra>([]);

  //inyeccion de dependencias _entriesService y dialog 
  constructor(private _entriesService: ApiRequestService,public dialog: MatDialog) {}

  //metodo para abrir el dialog registrar compra
  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '950px'; // Asignar ancho al dialog
    dialogConfig.height = '600px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogCompraComponent, dialogConfig); //abre el dialog
  }

  //metodo para abrir el dialog editar compra 
  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '650px'; // Asignar ancho al dialog
    const dialogRefEd = this.dialog.open(DialogEditarCompraComponent,dialogConfig); //abre el dialog
  }

  // evento para el buscador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
