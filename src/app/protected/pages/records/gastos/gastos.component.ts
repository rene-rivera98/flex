import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import { gastos, sucursal } from 'src/app/protected/interfaces/interfaces';
import { DialogEditarGastoComponent } from './dialog-editar-gasto/dialog-editar-gasto.component';
import { SucursalService } from 'src/app/protected/services/sucursal.service';
import { GastoService } from 'src/app/protected/services/gasto.service';
import { DialogGastoComponent } from './dialog-gasto/dialog-gasto.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})

export class GastosComponent implements AfterViewInit, OnDestroy{

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = [
      'folio_gasto',
      'fecha_factura',
      'metodo_pago',
      'monto_total',
      'nombreSucursal',
      'created_at',
      'updated_at',
      'opciones'
    ];

    dataSource: MatTableDataSource<gastos> = new MatTableDataSource<gastos>([]);

    gastoCreatedSubscription!: Subscription;
    gastoUpdatedSubscription!: Subscription;
    gastoDeletedSubscription!: Subscription;

    //inyeccion de dependencias _entriesService y dialog 
    constructor(
      private gastoService: GastoService, 
      private sucursalService: SucursalService,
      public dialog: MatDialog) {}

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

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.gastoCreatedSubscription = this.gastoService.gastoCreated$.subscribe(() => {
        this.getGastos();
      });
    }

    getGastos() {
      this.sucursalService.getSucursales().subscribe(
        (sucursales: sucursal[]) => {
          const sucursalesMap = new Map<string, string>(sucursales.map(sucursal => [sucursal.id_sucursal, sucursal.nombre]));

              this.gastoService.getGastos().subscribe(
                (gastos: gastos[]) => {
                  this.dataSource.data = gastos.map(gasto => ({
                    ...gasto,
                    nombreSucursal: sucursalesMap.get(gasto.id_sucursal)
                  }));
                },
                error => {
                  console.error('Error al obtener los gastos:', error);
                }
              );
            },
            error => {
              console.error('Error al obtener los gastos:', error);
            }
          );
        }

    ngOnDestroy(): void {
    
    }
}

