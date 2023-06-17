import { Component, ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { cafeteria } from 'src/app/interfaces/interface';

//importacion de dialog cafeteria
import { DialogCafeteriaComponent } from './dialog-cafeteria/dialog-cafeteria.component';
import { DialogEditarCafeteriaComponent } from './dialog-editar-cafeteria/dialog-editar-cafeteria.component';
import { DialogBorrarCafeteriaComponent } from './dialog-borrar-cafeteria/dialog-borrar-cafeteria.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-cafeteria',
  templateUrl: './cafeteria.component.html',
  styleUrls: ['./cafeteria.component.css']
})

export class CafeteriaComponent {

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  // se crean las columnas de la tabla 
  displayedColumns: string[] = [
    'codigoPC',
    'nombrePC',
    'descripcionPC',
    'createdAt',
    'updatedAt',
    'opciones'
  ];

  // Variable que contiene los campos de interfaz cafeteria
  dataSource = new MatTableDataSource<cafeteria>([]);

  //inyeccion de dependencias _entriesService y dialog
  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

  //metodo para abrir el dialog crear paquete de cafeteria
  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '550px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogCafeteriaComponent, dialogConfig); //abre el dialog
  }

  //metodo para abrir el dialog editar paquete de cafeteria
  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '550px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogEditarCafeteriaComponent, dialogConfig); //abre el dialog
  }

  //metodo para abrir el dialog eliminar paquete de cafeteria
  deleteDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '180px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogBorrarCafeteriaComponent, dialogConfig); //abre el dialog
  }

  // evento para el buscador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
