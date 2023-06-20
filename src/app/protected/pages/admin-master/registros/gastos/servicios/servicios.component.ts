import { Component, ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { servicios } from 'src/app/interfaces/interface';

//importacion de dialog productos
import { DialogServiciosComponent } from './dialog-servicios/dialog-servicios.component';
import { DialogEditarServicioComponent } from './dialog-editar-servicio/dialog-editar-servicio.component';
import { DialogBorrarServicioComponent } from './dialog-borrar-servicio/dialog-borrar-servicio.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})

export class ServiciosComponent {

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // se crean las columnas de la tabla 
  displayedColumns: string[] = [
    'nombre_servicio',
    'tipo_egreso',
    'createdAt',
    'updatedAt',
    'opciones'
  ];

  // Variable que contiene los campos de interfaz servicios
  dataSource = new MatTableDataSource<servicios>([]);

  //inyeccion de dependencias _entriesService y dialog 
  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

  //metodo para abrir el dialog crear servicio
  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '550px'; // Asignar ancho al dialog
    dialogConfig.height = '570px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogServiciosComponent, dialogConfig); //abre el dialog
  }
 
  //metodo para abrir el dialog editar servicio
  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '550px'; // Asignar ancho al dialog
    dialogConfig.height = '500px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogEditarServicioComponent, dialogConfig); //abre el dialog
  }

  //metodo para abrir el dialog eliminar servicio
  deleteDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '180px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogBorrarServicioComponent, dialogConfig); //abre el dialog
  }

  // evento para el buscador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
