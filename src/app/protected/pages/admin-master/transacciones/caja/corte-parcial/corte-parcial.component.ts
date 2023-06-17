import { Component, ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { corteParcial } from 'src/app/interfaces/interface';

//importacion de dialog productos
import { DialogCorteParcialComponent } from './dialog-corte-parcial/dialog-corte-parcial.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';

@Component({
  selector: 'app-corte-parcial',
  templateUrl: './corte-parcial.component.html',
  styleUrls: ['./corte-parcial.component.css']
})

export class CorteParcialComponent {

  //decorador y variable de paginador material
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // se crean las columnas de la tabla
  displayedColumns: string[] = [
    'codigo',
    'cajero',
    'total',
    'fechaCorte',
    'createdAt',
    'updatedAt'
  ];

  // Variable que contiene los campos de interfaz corte parcial
  dataSource = new MatTableDataSource<corteParcial>([]);

  //inyeccion de dependencias _entriesService y dialog
  constructor(private _entriesService:ApiRequestService, public dialog: MatDialog) { }

    //metodo para abrir el dialog crear producto
    createDialog(): void {
        const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
        dialogConfig.disableClose = true; //bloquea el dialog
        dialogConfig.width = '900px'; // Asignar ancho al dialog
        dialogConfig.height = '500px'; // Asignar ancho al dialog
        const dialogRef = this.dialog.open(DialogCorteParcialComponent, dialogConfig); //abre el dialog
    }

    // evento para el buscador
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
