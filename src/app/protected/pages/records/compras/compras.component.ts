import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

//importacion de servicio 
import { CompraService } from 'src/app/protected/services/compra.service';

//importacion de interfaz 
import { compra } from 'src/app/protected/interfaces/interfaces';

//importacion de dialog compras
import { DialogCompraComponent } from './dialog-compra/dialog-compra.component';
import { DialogEditarCompraComponent } from './dialog-editar-compra/dialog-editar-compra.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})

export class ComprasComponent implements AfterViewInit, OnDestroy{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'folio',
    'id_proveedor',
    'monto_total',
    'metodo_pago',
    'fecha_factura',
    'id_sucursal',
    'created_at',
    'updated_at',
    'opciones',
  ];

  dataSource: MatTableDataSource<compra> = new MatTableDataSource<compra>([]);

  compraCreatedSubscription!: Subscription;
  compraUpdatedSubscription!: Subscription;
  compraDeletedSubscription!: Subscription;

  constructor(
    private compraService: CompraService,
    public dialog: MatDialog) {}

  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '780px'; // Asignar ancho al dialog
    dialogConfig.height = '700px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogCompraComponent, dialogConfig); //abre el dialog
  }

  editDialog(element: any): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '650px'; // Asignar ancho al dialog
    dialogConfig.height = '650px'; // Asignar ancho al dialog
    const dialogRefEd = this.dialog.open(DialogEditarCompraComponent,dialogConfig); //abre el dialog
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getCompras();

    this.compraCreatedSubscription = this.compraService.compraCreated$.subscribe((compra) => {
      if (compra) {
        this.getCompras();
      }
    });
  }

  getCompras() {
    this.compraService.getCompras().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener las compras:', error);
      }
    );
  }

  ngOnDestroy(): void {
    
  }

}

