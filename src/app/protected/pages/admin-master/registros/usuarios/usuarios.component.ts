import { Component, ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { usuario } from 'src/app/interfaces/interface';

//importacion de dialog productos
import { DialogUsuarioComponent } from './dialog-usuario/dialog-usuario.component';
import { DialogEditarUsuarioComponent } from './dialog-editar-usuario/dialog-editar-usuario.component';
import { DialogBorrarUsuarioComponent } from './dialog-borrar-usuario/dialog-borrar-usuario.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent {

  //decorador y variable de paginador material
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // se crean las columnas de la tabla 
  displayedColumns: string[] = [
    'nombre',
    'apellidoPaterno',
    'apellidoMaterno',
    'username',
    'celular',
    'email',
    'createdAt',
    'updatedAt',
    'opciones'
  ];

  // Variable que contiene los campos de interfaz productos
  dataSource = new MatTableDataSource<usuario>([]);
  
  //inyeccion de dependencias _entriesService y dialog 
  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

    //metodo para abrir el dialog crear usuario
    createDialog(): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '550px'; // Asignar ancho al dialog
      dialogConfig.height = '570px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogUsuarioComponent, dialogConfig); //abre el dialog
    }

    //metodo para abrir el dialog editar usuario
    editDialog(element: any): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '650px'; // Asignar ancho al dialog
      dialogConfig.height = '650px'; // Asignar ancho al dialog
      const dialogRefEd = this.dialog.open(DialogEditarUsuarioComponent, dialogConfig); //abre el dialog
    }

    //metodo para abrir el dialog eliminar usuario
    deleteDialog(element: any) {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '650px'; // Asignar ancho al dialog
      dialogConfig.height = '180px'; // Asignar ancho al dialog
      const dialogRefEd = this.dialog.open(DialogBorrarUsuarioComponent, dialogConfig); //abre el dialog
    }

    // evento para el buscador
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
 
}
