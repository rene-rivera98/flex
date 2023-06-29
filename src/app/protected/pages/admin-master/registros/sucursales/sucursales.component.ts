import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiRequestService } from 'src/app/protected/services/api-request.service';
import { SucursalesService } from 'src/app/protected/services/sucursales.service';
import { sucursal } from 'src/app/interfaces/interface';
import { DialogSucursalComponent } from './dialog-sucursal/dialog-sucursal.component';
import { DialogEditarSucursalComponent } from './dialog-editar-sucursal/dialog-editar-sucursal.component';
import { DialogBorrarSucursalComponent } from './dialog-borrar-sucursal/dialog-borrar-sucursal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  sucursalCreatedSubscription!: Subscription;
  sucursalUpdatedSubscription!: Subscription;
  sucursalDeletedSubscription!: Subscription;

  constructor(
    private apiRequest: ApiRequestService,
    public dialog: MatDialog,
    private sucursalService: SucursalesService
  ) {}

  createDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '550px';
    dialogConfig.height = '460px';
    const dialogRef = this.dialog.open(DialogSucursalComponent, dialogConfig);
  }

  editDialog(element: any): void {
    const elementCopia = Object.assign({}, element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '550px';
    dialogConfig.height = '460px';

    const dialogRefEd = this.dialog.open(DialogEditarSucursalComponent, {
      width: '550px',
      height: '460px',
      data: elementCopia
    });
  }

  deleteDialog(element: any) {
    if (element.id_sucursal) {
      console.log('ID de sucursal:', element.id_sucursal);
  
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.width = '650px';
      dialogConfig.height = '180px';
      dialogConfig.data = { sucursal: { id_sucursal: element.id_sucursal } };
      const dialogRefEd = this.dialog.open(DialogBorrarSucursalComponent, dialogConfig);
    } else {
      // Manejar el caso cuando no se tiene el ID de la sucursal
      console.error('La fila seleccionada no tiene un ID de sucursal válido.');
    }
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getSucursales();

    this.sucursalCreatedSubscription = this.sucursalService.sucursalCreated$.subscribe((sucursal) => {
      if (sucursal) {
        this.getSucursales();
      }
    });

    this.sucursalUpdatedSubscription = this.sucursalService.sucursalUpdated$.subscribe((sucursal) => {
      if (sucursal) {
        this.getSucursales();
      }
    });

    this.sucursalDeletedSubscription = this.sucursalService.sucursalDeleted$.subscribe((sucursal) => {
      if (sucursal) {
        this.getSucursales();
      }
    });

  }

  getSucursales() {
    this.apiRequest.getSucursales().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener las sucursales:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sucursalCreatedSubscription) {
      this.sucursalCreatedSubscription.unsubscribe();
    }

    if (this.sucursalUpdatedSubscription) {
      this.sucursalUpdatedSubscription.unsubscribe();
    }

    if (this.sucursalDeletedSubscription) {
      this.sucursalDeletedSubscription.unsubscribe();
    }
  }
}
