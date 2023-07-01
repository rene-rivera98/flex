import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
//importacion de servicio api 
import { ServicioService } from 'src/app/protected/services/servicio.service';
//importacion de interfaz 
import { servicios } from 'src/app/protected/interfaces/interfaces';

//importacion de dialog productos
import { DialogServiciosComponent } from './dialog-servicios/dialog-servicios.component';
import { DialogEditarServicioComponent } from './dialog-editar-servicio/dialog-editar-servicio.component';
import { DialogBorrarServicioComponent } from './dialog-borrar-servicio/dialog-borrar-servicio.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})

export class ServiciosComponent {

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  

  // se crean las columnas de la tabla 
  displayedColumns: string[] = [
    'nombre',
    'tipo_egreso',
    'created_at',
    'updated_at',
    'opciones'
  ];

  dataSource: MatTableDataSource<servicios> = new MatTableDataSource<servicios>([]);

  servicioCreatedSubscription!: Subscription;
  servicioUpdatedSubscription!: Subscription;
  servicioDeletedSubscription!: Subscription;

  //inyeccion de dependencias _entriesService y dialog 
  constructor(
    private serviciosService: ServicioService, 
    public dialog: MatDialog) { }

  //metodo para abrir el dialog crear servicio
  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '550px'; // Asignar ancho al dialog
    dialogConfig.height = '350px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogServiciosComponent, dialogConfig); //abre el dialog
  }
 
  //metodo para abrir el dialog editar servicio
  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '550px';
    dialogConfig.height = '350px';

    const dialogRefEd = this.dialog.open(DialogEditarServicioComponent, {
      data: element
    });
  }

  //metodo para abrir el dialog eliminar servicio
  deleteDialog(element: any) {
    if (element.id_servicio) {
      console.log('ID de servicio:', element.id_servicio);
  
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.width = '650px';
      dialogConfig.height = '180px';
      dialogConfig.data = { servicio: { id_servicio: element.id_servicio } };
      const dialogRefEd = this.dialog.open(DialogBorrarServicioComponent, dialogConfig);
    } else {
      // Manejar el caso cuando no se tiene el ID de la sucursal
      console.error('La fila seleccionada no tiene un ID de proveedor válido.');
    }
  }

  // evento para el buscador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getServicios();

    this.servicioCreatedSubscription = this.serviciosService.servicioCreated$.subscribe((servicio) => {
      if (servicio) {
        this.getServicios();
      }
    });

    this.servicioUpdatedSubscription = this.serviciosService.servicioUpdated$.subscribe((servicio) => {
      if (servicio) {
        this.getServicios();
      }
    });

    this.servicioDeletedSubscription = this.serviciosService.servicioDeleted$.subscribe((servicio) => {
      if (servicio) {
        this.getServicios();
      }
    });
  }

  getServicios() {
    this.serviciosService.getServicios().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.servicioCreatedSubscription) {
      this.servicioCreatedSubscription.unsubscribe();
    }

    if (this.servicioUpdatedSubscription) {
      this.servicioUpdatedSubscription.unsubscribe();
    }

    if (this.servicioDeletedSubscription) {
      this.servicioDeletedSubscription.unsubscribe();
    }
  }
}
