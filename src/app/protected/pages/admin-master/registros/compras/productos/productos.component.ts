import { Component, ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { productos } from 'src/app/interfaces/interface';

//importacion de dialog productos
import { DialogProductosComponent } from './dialog-productos/dialog-productos.component';
import { DialogEditarProductoComponent } from './dialog-editar-producto/dialog-editar-producto.component';
import { DialogBorrarProductoComponent } from './dialog-borrar-producto/dialog-borrar-producto.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent{

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // se crean las columnas de la tabla 
  displayedColumns: string[] = [
    'codigoP',
    'nombreProducto',
    'medidaProducto',
    'tallaProducto',
    'stockProducto',
    'createdAt',
    'updatedAt',
    'opciones'
  ];

  // Variable que contiene los campos de interfaz productos
  dataSource = new MatTableDataSource<productos>([]);

  //inyeccion de dependencias _entriesService y dialog 
  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

    //metodo para abrir el dialog crear producto
    createDialog(): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '970px'; // Asignar ancho al dialog
      dialogConfig.height = '720px'; // Asignar largo al dialog
      const dialogRef = this.dialog.open(DialogProductosComponent, dialogConfig); //abre el dialog
    }

    //metodo para abrir el dialog editar producto 
    editDialog(element: any): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '550px'; // Asignar ancho al dialog
      dialogConfig.height = '500px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogEditarProductoComponent, dialogConfig); //abre el dialog
    }

    //metodo para abrir el dialog eliminar producto 
    deleteDialog(element: any): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '650px'; // Asignar ancho al dialog
      dialogConfig.height = '180px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogBorrarProductoComponent, dialogConfig); //abre el dialog
    }

    // evento para el buscador
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
