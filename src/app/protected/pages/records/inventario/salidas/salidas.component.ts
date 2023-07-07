import { Component, ViewChild, OnDestroy, AfterViewInit  } from '@angular/core';
import { Subscription } from 'rxjs';
import { almacenes, productos, salidas } from 'src/app/protected/interfaces/interfaces';
import { SalidasService } from 'src/app/protected/services/salidas.service';
import { AlmacenesService } from 'src/app/protected/services/almacenes.service';
import { ProductoService } from 'src/app/protected/services/producto.service';
import { DialogSalidaComponent } from './dialog-salida/dialog-salida.component';

//importacion de librerias angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'nombreAlmacen',
    'nombreProducto',
    'cantidad',
    'fecha_salida'
  ];

  dataSource: MatTableDataSource<salidas> = new MatTableDataSource<salidas>([]);

  salidaCreatedSubscription!: Subscription;
  salidaUpdatedSubscription!: Subscription;
  salidaDeletedSubscription!: Subscription;

  constructor(
    private salidasService: SalidasService, 
    private almacenService: AlmacenesService,
    private productoService: ProductoService,
    public dialog: MatDialog
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getSalidas() {
    this.almacenService.getAlmacenes(true).subscribe(
      (almacenes: almacenes[]) => {
        const almacenesMap = new Map<string, string>(almacenes.map(almacen => [almacen.id_almacen, almacen.nombre]));
  
        this.productoService.getProductos().subscribe(
          (productos: productos[]) => {
            const productosMap = new Map<string, string>(productos.map(producto => [producto.id_producto, producto.nombre]));
  
            this.salidasService.getSalidas().subscribe(
              (salidas: salidas[]) => {
                this.dataSource.data = salidas.map(salida => ({
                  ...salida,
                  nombreAlmacen: almacenesMap.get(salida.id_almacen) || '',
                  nombreProducto: productosMap.get(salida.id_producto) || ''
                }));
              },
              error => {
                console.error('Error al obtener las salidas:', error);
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getSalidas();
  }

  createDialog(): void {
    const dialogConfig = new MatDialogConfig(); //se crea una instancia de la clase MatDialogConfig
    dialogConfig.disableClose = true; //bloquea el dialog
    dialogConfig.width = '580px'; // Asignar ancho al dialog
    dialogConfig.height = '500px'; // Asignar ancho al dialog
    const dialogRef = this.dialog.open(DialogSalidaComponent, dialogConfig); //abre el dialog
  }

  ngOnDestroy(): void {
    
  }
}
