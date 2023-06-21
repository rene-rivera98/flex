import { Component, ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 

//importacion de dialog productos
import { DialogSucursalComponent } from './dialog-sucursal/dialog-sucursal.component';
import { DialogEditarSucursalComponent } from './dialog-editar-sucursal/dialog-editar-sucursal.component';
import { DialogBorrarSucursalComponent } from './dialog-borrar-sucursal/dialog-borrar-sucursal.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent {

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
    'direccion',
    'codigo_postal',
    'telefono',
    'created_at',
    'updated_at',
    'opciones'
  ];

  dataSource = new MatTableDataSource<any>([
    { 
      nombre: 'Nombre 1',
      direccion: 'Dirección 1',
      codigo_postal: '12345',
      telefono: '1234567890',
      created_at: '2023-06-19',
      updated_at: '2023-06-19'
    },
    { 
      nombre: 'Nombre 2',
      direccion: 'Dirección 2',
      codigo_postal: '54321',
      telefono: '0987654321',
      created_at: '2023-06-19',
      updated_at: '2023-06-19'
    },
    { 
      nombre: 'Nombre 3',
      direccion: 'Dirección 3',
      codigo_postal: '67890',
      telefono: '9876543210',
      created_at: '2023-06-19',
      updated_at: '2023-06-19'
    },
    { 
      nombre: 'Nombre 4',
      direccion: 'Dirección 4',
      codigo_postal: '13579',
      telefono: '0123456789',
      created_at: '2023-06-19',
      updated_at: '2023-06-19'
    },
    { 
      nombre: 'Nombre 5',
      direccion: 'Dirección 5',
      codigo_postal: '97531',
      telefono: '9876543210',
      created_at: '2023-06-19',
      updated_at: '2023-06-19'
    },
  ]);

    // Variable que contiene los campos de interfaz productos
    //dataSource = new MatTableDataSource<usuario>([]);
  
  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

  //metodo para abrir el dialog crear usuario
  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '550px'; // Asignar ancho al dialog
    dialogConfig.height = '570px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogSucursalComponent, dialogConfig); //abre el dialog
  }

  //metodo para abrir el dialog editar usuario
  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '650px'; // Asignar ancho al dialog
    const dialogRefEd = this.dialog.open(DialogEditarSucursalComponent, dialogConfig); //abre el dialog
  }

  //metodo para abrir el dialog eliminar usuario
  deleteDialog(element: any) {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '180px'; // Asignar ancho al dialog
    const dialogRefEd = this.dialog.open(DialogBorrarSucursalComponent, dialogConfig); //abre el dialog
  }

  // evento para el buscador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
