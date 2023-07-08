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
import { DialogPagosGastosComponent } from './dialog-pagos-gastos/dialog-pagos-gastos.component';

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
      'metodo_pago',
      'monto_total',
      'fecha_factura',
      'nombreSucursal',
      'estado_pago',
      'created_at',
      'updated_at',
      'opciones'
    ];

    dataSource: MatTableDataSource<gastos> = new MatTableDataSource<gastos>([]);

    gastoCreatedSubscription!: Subscription;
    gastoUpdatedSubscription!: Subscription;
    pagoCreatedSubscription!: Subscription;

    //inyeccion de dependencias _entriesService y dialog 
    constructor(
      private gastoService: GastoService, 
      private sucursalService: SucursalService,
      public dialog: MatDialog) {}

    //metodo para abrir el dialog registrar gasto
    createDialog(): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      dialogConfig.disableClose = true; //bloquea el dialog
      dialogConfig.width = '780px'; // Asignar ancho al dialog
      dialogConfig.height = '700px'; // Asignar ancho al dialog
      const dialogRef = this.dialog.open(DialogGastoComponent, dialogConfig); //abre el dialog
    }
    
    //metodo para abrir el dialog editar gasto
    editDialog(element: any): void {
      const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
      const dialogRefEd = this.dialog.open(DialogEditarGastoComponent, {
        data: element,
        disableClose: true,
        width: '780px',
        height: '700px'
      });
    }

    pagoDialog(element: any) {
      if (element.id_gasto || element.monto_total) {
        console.log('ID de gasto:', element.id_gasto, element.monto_total);
    
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.width = '750px';
        dialogConfig.height = '720px';
        dialogConfig.data = { gasto: { id_gasto: element.id_gasto, monto_total: element.monto_total } };
        const dialogRefEd = this.dialog.open(DialogPagosGastosComponent, dialogConfig);
      } else {
        // Manejar el caso cuando no se tiene el ID de la sucursal
        console.error('La fila seleccionada no tiene un ID de gasto válido.');
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

      this.gastoCreatedSubscription = this.gastoService.gastoCreated$.subscribe(() => {
        this.getGastos();
      });

      this.gastoUpdatedSubscription = this.gastoService.gastoUpdated$.subscribe(() => {
        this.getGastos();
      });

      this.pagoCreatedSubscription = this.gastoService.pagoCreated$.subscribe(() => {
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

