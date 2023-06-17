import { Component, ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { aperturaCaja } from 'src/app/interfaces/interface';

//importacion de dialog apertura de caja
import { DialogAperturaCajaComponent } from './dialog-apertura-caja/dialog-apertura-caja.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';

@Component({
  selector: 'app-apertura-caja',
  templateUrl: './apertura-caja.component.html',
  styleUrls: ['./apertura-caja.component.css']
})

export class AperturaCajaComponent {

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // se crean las columnas de la tabla 
  displayedColumns: string[] = [
    'area',
    'idcaja',
    'referencias',
    'createdAt',
    'updatedAt'
  ];

  // Variable que contiene los campos de interfaz apertura
  dataSource = new MatTableDataSource<aperturaCaja>([]);

  //inyeccion de dependencias _entriesService y dialog 
  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

    //metodo para abrir el dialog crear apertura de caja
    createDialog(): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '550px'; // Asignar ancho al dialog
      dialogConfig.height = '570px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogAperturaCajaComponent, dialogConfig); //abre el dialog
    }

    // evento para el buscador
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
