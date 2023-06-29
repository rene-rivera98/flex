import { Component,  ViewChild,  AfterViewInit, OnDestroy } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { proveedores } from 'src/app/interfaces/interface';
import { ProveedorService } from 'src/app/protected/services/proveedor.service';

//importacion de dialog proveedores
import { DialogProveedoresComponent } from './dialog-proveedores/dialog-proveedores.component';
import { DialogBorrarProveedoresComponent } from './dialog-borrar-proveedores/dialog-borrar-proveedores.component';
import { DialogEditarProveedorComponent } from './dialog-editar-proveedor/dialog-editar-proveedor.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements AfterViewInit, OnDestroy{

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // se crean las columnas de la tabla 
  displayedColumns: string[] = [
    'rfc',
    'nombre',
    'codigo_postal',
    'regimen_fiscal',
    'telefono_fijo',
    'telefono_movil',
    'banco',
    'cuenta_bancaria',
    'clave_interbancaria',
    'constancia',
    'created_at',
    'updated_at',
    'opciones'
  ];

  dataSource: MatTableDataSource<proveedores> = new MatTableDataSource<proveedores>([]);

  proveedorCreatedSubscription!: Subscription;
  proveedorUpdatedSubscription!: Subscription;
  proveedorDeletedSubscription!: Subscription;

  //inyeccion de dependencias _entriesService y dialog 
  constructor(
    private apiRequest:ApiRequestService, 
    public dialog: MatDialog,
    private proveedorService: ProveedorService) { }

  //metodo para abrir el dialog crear proveedor
  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '550px'; // Asignar ancho al dialog
    dialogConfig.height = '570px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogProveedoresComponent);
  }

  //metodo para abrir el dialog editar producto 
  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '550px'; // Asignar ancho al dialog
    dialogConfig.height = '570px'; // Asignar ancho al dialog
    const dialogRefEd = this.dialog.open(DialogEditarProveedorComponent, {
      data: element
    });
  }
  
  //metodo para abrir el dialog eliminar producto
  deleteDialog(element: any) {
    if (element.id_proveedor) {
      console.log('ID de proveedor:', element.id_proveedor);
  
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.width = '650px';
      dialogConfig.height = '180px';
      dialogConfig.data = { proveedor: { id_proveedor: element.id_proveedor } };
      const dialogRefEd = this.dialog.open(DialogBorrarProveedoresComponent, dialogConfig);
    } else {
      // Manejar el caso cuando no se tiene el ID de la sucursal
      console.error('La fila seleccionada no tiene un ID de proveedor válido.');
    }
  }

  //en este metodo se habilita el paginador una vez iniciada las vistas y los componentes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getProveedores();

    this.proveedorCreatedSubscription = this.proveedorService.proveedorCreated$.subscribe((proveedor) => {
      if (proveedor) {
        this.getProveedores();
      }
    });

    this.proveedorUpdatedSubscription = this.proveedorService.proveedorUpdated$.subscribe((proveedor) => {
      if (proveedor) {
        this.getProveedores();
      }
    });

    this.proveedorDeletedSubscription = this.proveedorService.proveedorDeleted$.subscribe((proveedor) => {
      if (proveedor) {
        this.getProveedores();
      }
    });

  }

  getProveedores() {
    this.apiRequest.getProveedores().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener los proveedores:', error);
      }
    );
  }
    
  ngOnDestroy(): void {
    if (this.proveedorCreatedSubscription) {
      this.proveedorCreatedSubscription.unsubscribe();
    }

    if (this.proveedorUpdatedSubscription) {
      this.proveedorUpdatedSubscription.unsubscribe();
    }

    if (this.proveedorDeletedSubscription) {
      this.proveedorDeletedSubscription.unsubscribe();
    }
  }
  // evento para el buscador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
