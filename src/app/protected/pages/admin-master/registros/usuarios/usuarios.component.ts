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
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent {

  //decorador y variable de paginador material
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  dataSource = new MatTableDataSource<any>([
    { 
      nombre: 'John', 
      apellidoPaterno: 'Doe', 
      apellidoMaterno: 'Smith', 
      username: 'jdoe', 
      celular: '1234567890',
      email: 'jdoe@example.com',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01'
    },
    { 
      nombre: 'Jane', 
      apellidoPaterno: 'Doe', 
      apellidoMaterno: 'Smith', 
      username: 'jane_doe', 
      celular: '9876543210',
      email: 'jane@example.com',
      createdAt: '2022-02-01',
      updatedAt: '2022-02-01'
    },
    { 
      nombre: 'Robert', 
      apellidoPaterno: 'Johnson', 
      apellidoMaterno: 'Brown', 
      username: 'rjohnson', 
      celular: '5555555555',
      email: 'rjohnson@example.com',
      createdAt: '2022-03-01',
      updatedAt: '2022-03-01'
    },
    { 
      nombre: 'Michael', 
      apellidoPaterno: 'Davis', 
      apellidoMaterno: 'Miller', 
      username: 'mdavis', 
      celular: '1111111111',
      email: 'mdavis@example.com',
      createdAt: '2022-04-01',
      updatedAt: '2022-04-01'
    },
    { 
      nombre: 'Sarah', 
      apellidoPaterno: 'Wilson', 
      apellidoMaterno: 'Anderson', 
      username: 'swilson', 
      celular: '9999999999',
      email: 'swilson@example.com',
      createdAt: '2022-05-01',
      updatedAt: '2022-05-01'
    },
    { 
      nombre: 'David', 
      apellidoPaterno: 'Thompson', 
      apellidoMaterno: 'Robinson', 
      username: 'drobinson', 
      celular: '7777777777',
      email: 'drobinson@example.com',
      createdAt: '2022-06-01',
      updatedAt: '2022-06-01'
    },
    { 
      nombre: 'Emily', 
      apellidoPaterno: 'White', 
      apellidoMaterno: 'Taylor', 
      username: 'ewhite', 
      celular: '2222222222',
      email: 'ewhite@example.com',
      createdAt: '2022-07-01',
      updatedAt: '2022-07-01'
    },
    { 
      nombre: 'Pedro', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    },
    { 
      nombre: 'Daniel', 
      apellidoPaterno: 'Brown', 
      apellidoMaterno: 'Wilson', 
      username: 'dbrown', 
      celular: '8888888888',
      email: 'dbrown@example.com',
      createdAt: '2022-08-01',
      updatedAt: '2022-08-01'
    }
    // Agrega más objetos con datos de prueba aquí
  ]);

  
  // Variable que contiene los campos de interfaz productos
    //dataSource = new MatTableDataSource<usuario>([]);
  
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
