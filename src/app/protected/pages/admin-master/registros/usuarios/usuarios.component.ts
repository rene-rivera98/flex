import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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


  // se crean las columnas de la tabla 
  displayedColumns: string[] = [
    'nombre',
    'paterno',
    'materno',
    'celular',
    'email',
    'departamento',
    'id_sucursal',
    'created_at',
    'updated_at',
    'opciones'
  ];
  
  // Variable que contiene los campos de interfaz productos

  dataSource: MatTableDataSource<usuario> = new MatTableDataSource<usuario>([]);
  
  //inyeccion de dependencias apiRequest y dialog 
  constructor(private apiRequest:ApiRequestService, public dialog: MatDialog, private http: HttpClient) { }

    //metodo para abrir el dialog crear usuario
    createDialog(): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '870px'; // Asignar ancho al dialog
      dialogConfig.height = '410px'; // Asignar ancho al dialog
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

    //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.getUsuarios();
    }

    getUsuarios() {
      this.apiRequest.getUsuarios().subscribe(
        (data: any[]) => {
          this.dataSource.data = data; // Asignar los datos al dataSource.data
        },
        error => {
          console.error('Error al obtener los usuarios:', error);
        }
      );
    }
 
}
