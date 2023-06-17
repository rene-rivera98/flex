import { Component, ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { frontdesk } from 'src/app/interfaces/interface';

//importacion de dialog frontdesk
import { DialogFrontDeskComponent} from './dialog-frontdesk/dialog-frontdesk.component';
import { DialogEditarFrontDeskComponent } from './dialog-editar-frontdesk/dialog-editar-frontdesk.component';
import { DialogBorrarFrontDeskComponent } from './dialog-borrar-frontdesk/dialog-borrar-frontdesk.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-frontdesk',
  templateUrl: './frontdesk.component.html',
  styleUrls: ['./frontdesk.component.css']
})

export class FrontDeskComponent {

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // se crean las columnas de la tabla 
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

  // Variable que contiene los campos de interfaz productos
  dataSource = new MatTableDataSource<frontdesk>([]);

  //inyeccion de dependencias _entriesService y dialog 
  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

    //metodo para abrir el dialog crear paquete de frontdesk
    createDialog(): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '650px'; // Asignar ancho al dialog
      dialogConfig.height = '600px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogFrontDeskComponent, dialogConfig); //abre el dialog
    }

    //metodo para abrir el dialog editar paquete de frontdesk
    editDialog(element: any): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '650px'; // Asignar ancho al dialog
      dialogConfig.height = '600px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogEditarFrontDeskComponent, dialogConfig); //abre el dialog
    }

    //metodo para abrir el dialog eliminar de frontdesk 
    deleteDialog(element: any): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '650px'; // Asignar ancho al dialog
      dialogConfig.height = '180px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogBorrarFrontDeskComponent, dialogConfig); //abre el dialog
    }

    // evento para el buscador
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
