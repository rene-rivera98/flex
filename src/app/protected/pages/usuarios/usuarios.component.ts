import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiRequestService } from '../../services/api-request.service';

import { Ususario} from '../../../interfaces/interface';

/* SE IMPORTA EL DIALOG USUARIOS*/
import { DialogUsuarioComponent } from './dialog-usuario/dialog-usuario.component';

import { Observable } from 'rxjs';

/* LIBRERIAS DE MATERIAL ANGULAR*/
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { DialogBorrarUsuarioComponent } from './dialog-borrar-usuario/dialog-borrar-usuario.component';
import { DialogEditarUsuarioComponent } from './dialog-editar-usuario/dialog-editar-usuario.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /* COLUMNAS QUE SE MOSTRARAN EN LA TABLA */
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

  /* Variable que contiene los datos de usuarios */
  dataSource = new MatTableDataSource<Ususario>([]);

  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

  /*INICIALIZA ObtenerUsuarios()*/
  ngOnInit(): void {
   this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this._entriesService.getUsuarios().subscribe(
      response =>{
        console.log(response);
        if(response.estado == true){
          this.dataSource.data;
        }
      }
    );
  }

  /* FUNCION PARA ABRIR DIALOG*/
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
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
  const dialogRefEd = this.dialog.open(DialogEditarUsuarioComponent, dialogConfig);
}

delete(element: any) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true; /* BLOQUEAR DIALOG DE CLICKS FUERA DE ESTE*/
  dialogConfig.width = '650px'; // Asignar ancho al dialog
  dialogConfig.height = '650px'; // Asignar ancho al dialog
  const dialogRefEd = this.dialog.open(DialogBorrarUsuarioComponent, dialogConfig);
}
 
}
