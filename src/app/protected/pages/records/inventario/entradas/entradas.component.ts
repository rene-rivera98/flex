import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { entradas, almacenes, productos } from 'src/app/protected/interfaces/interfaces';
import { EntradasService } from 'src/app/protected/services/entradas.service';
import { AlmacenesService } from 'src/app/protected/services/almacenes.service';
import { ProductoService } from 'src/app/protected/services/producto.service';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DialogEntradaComponent } from './dialog-entrada/dialog-entrada.component';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnDestroy, AfterViewInit{

  //decorador y variable de paginador material 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'nombreAlmacen',
    'nombreProducto',
    'cantidad',
    'merma',
    'fecha_entrada',
    'fecha_caducidad'
  ];

  dataSource: MatTableDataSource<entradas> = new MatTableDataSource<entradas>([]);

  entradaCreatedSubscription!: Subscription;
  entradaUpdatedSubscription!: Subscription;
  entradaDeletedSubscription!: Subscription;

  constructor(
    private entradasService: EntradasService, 
    private almacenService: AlmacenesService,
    private productoService: ProductoService,
    public dialog: MatDialog
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getEntradas();
  }

  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '780px'; // Asignar ancho al dialog
    dialogConfig.height = '700px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogEntradaComponent, dialogConfig); //abre el dialog
  }

  getEntradas() {
    this.almacenService.getAlmacenes(true).subscribe(
      (almacenes: almacenes[]) => {
        const almacenesMap = new Map<string, string>(almacenes.map(almacen => [almacen.id_almacen, almacen.nombre]));
  
        this.productoService.getProductos().subscribe(
          (productos: productos[]) => {
            const productosMap = new Map<string, string>(productos.map(producto => [producto.id_producto, producto.nombre]));
  
            this.entradasService.getEntradas().subscribe(
              (entradas: entradas[]) => {
                this.dataSource.data = entradas.map(entrada => ({
                  ...entrada,
                  nombreAlmacen: almacenesMap.get(entrada.id_almacen) || '',
                  nombreProducto: productosMap.get(entrada.id_producto) || ''
                }));
              },
              error => {
                console.error('Error al obtener las entradas:', error);
              }
            );
          },
          error => {
            console.error('Error al obtener los productos:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener los almacenes:', error);
      }
    );
  }

  ngOnDestroy(): void {
    
  }

}
