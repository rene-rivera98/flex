import { Component, ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { gastos } from 'src/app/interfaces/interface';

//importacion de dialog gastos
import { DialogGastoComponent } from './dialog-gasto/dialog-gasto.component';
import { DialogEditarGastoComponent } from './dialog-editar-gasto/dialog-editar-gasto.component';
//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})

export class GastosComponent {

   //decorador y variable de paginador material 
   @ViewChild(MatPaginator) paginator!: MatPaginator;

   //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    // se crean las columnas de la tabla 
    displayedColumns: string[] = [
      'folio',
      'fecha_factura',
      'complemento_pago',
      'importe_total',
      'opciones',
    ];

    // Variable que contiene los campos de interfaz gasto 
    dataSource = new MatTableDataSource<gastos>([]);

    //inyeccion de dependencias _entriesService y dialog 
    constructor(private _entriesService: ApiRequestService,public dialog: MatDialog) {}

    //metodo para abrir el dialog registrar gasto
    createDialog(): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '950px'; // Asignar ancho al dialog
      dialogConfig.height = '600px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogGastoComponent, dialogConfig); //abre el dialog
    }
    
    //metodo para abrir el dialog editar gasto
    editDialog(element: any): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '650px'; // Asignar ancho al dialog
      dialogConfig.height = '650px'; // Asignar ancho al dialog
      const dialogRefEd = this.dialog.open(DialogEditarGastoComponent,dialogConfig); //abre el dialog
    }

    // evento para el buscador
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}