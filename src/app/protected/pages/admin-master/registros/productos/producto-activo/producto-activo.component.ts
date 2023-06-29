import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { productos_activo } from 'src/app/interfaces/interface';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';
import { ProductosService } from 'src/app/protected/services/productos.service';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-producto-activo',
  templateUrl: './producto-activo.component.html',
  styleUrls: ['./producto-activo.component.css']
})
export class ProductoActivoComponent implements AfterViewInit, OnDestroy{

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'nombre',
    'codigo',
    'tipo_producto',
    'perecedero',
    'tipo_egreso',
    'created_at',
    'updated_at',
    'opciones'
  ];

  dataSource: MatTableDataSource<productos_activo> = new MatTableDataSource<productos_activo>([]);

  productoCreatedSubscription!: Subscription;
  productoUpdatedSubscription!: Subscription;
  productoDeletedSubscription!: Subscription;

  constructor(
    private apiService:ApiRequestService, 
    public dialog: MatDialog,
    private servicioProducto: ProductosService 
  ) { }

  createDialog(): void {}

  editDialog(element: any): void {}

  deleteDialog(element: any) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getProductos_activo();
  }

  getProductos_activo() {
    this.apiService.getProductos_activo().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  ngOnDestroy(): void {}

}
