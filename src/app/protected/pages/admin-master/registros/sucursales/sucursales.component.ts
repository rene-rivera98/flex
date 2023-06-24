import { Component, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';
import { SucursalesService } from 'src/app/protected/services/sucursales.service';

//importacion de interfaz 
import { sucursal } from 'src/app/interfaces/interface';

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

  dataSource: MatTableDataSource<sucursal> = new MatTableDataSource<sucursal>([]);

  sucursalCreatedSubscription!: Subscription ;

  constructor(private apiRequest:ApiRequestService, 
              public dialog: MatDialog, 
              private http: HttpClient,
              private sucursalService: SucursalesService) { }

  //metodo para abrir el dialog crear usuario
  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '550px'; // Asignar ancho al dialog
    dialogConfig.height = '460px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogSucursalComponent, dialogConfig); //abre el dialog
  }

  //metodo para abrir el dialog editar usuario
  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '550px'; // Asignar ancho al dialog
    dialogConfig.height = '460px'; // Asignar ancho al dialog
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

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getSucursales();

    this.sucursalCreatedSubscription = this.sucursalService.sucursalCreated$.subscribe((sucursal) => {
      if (sucursal) {
        this.getSucursales();
      }
    });
  }

  getSucursales() {
      this.apiRequest.getSucursales().subscribe(
        (data: any[]) => {
          this.dataSource.data = data; // Asignar los datos al dataSource.data
        },
        error => {
          console.error('Error al obtener las sucursales:', error);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.sucursalCreatedSubscription) {
      this.sucursalCreatedSubscription.unsubscribe();
    }
  }

}
