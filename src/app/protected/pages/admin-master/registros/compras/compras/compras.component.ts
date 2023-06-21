
import { Component, ViewChild } from '@angular/core';

//importacion de servicio api 
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

//importacion de interfaz 
import { compra } from 'src/app/interfaces/interface';

//importacion de dialog compras
import { DialogCompraComponent } from './dialog-compra/dialog-compra.component';
import { DialogEditarCompraComponent } from './dialog-editar-compra/dialog-editar-compra.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})

export class ComprasComponent {

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
    'proveedor',
    'folio',
    'fecha_factura',
    'total',
    'metodo_pago',
    'sucursal',
    'created_at',
    'updated_at',
    'opciones',
  ];

  dataSource = new MatTableDataSource<any>([
    {
    proveedor: 'Proveedor 1',
    folio: 'Folio 001',
    fecha_factura: '2022-01-01',
    total: 1000,
    metodo_pago: 'Efectivo',
    sucursal: 'Sucursal A',
    created_at: '2022-01-01',
    updated_at: '2022-01-02',
  },
  {
    proveedor: 'Proveedor 2',
    folio: 'Folio 002',
    fecha_factura: '2022-02-01',
    total: 2000,
    metodo_pago: 'Tarjeta de crédito',
    sucursal: 'Sucursal B',
    created_at: '2022-02-01',
    updated_at: '2022-02-02'
  }
  ]);

  // Variable que contiene los campos de interfaz compra 
  // dataSource = new MatTableDataSource<compra>([]);

  //inyeccion de dependencias _entriesService y dialog 
  constructor(private _entriesService: ApiRequestService,public dialog: MatDialog) {}

  //metodo para abrir el dialog registrar compra
  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '950px'; // Asignar ancho al dialog
    dialogConfig.height = '600px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogCompraComponent, dialogConfig); //abre el dialog
  }

  //metodo para abrir el dialog editar compra 
  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '650px'; // Asignar ancho al dialog
    const dialogRefEd = this.dialog.open(DialogEditarCompraComponent,dialogConfig); //abre el dialog
  }

  // evento para el buscador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
