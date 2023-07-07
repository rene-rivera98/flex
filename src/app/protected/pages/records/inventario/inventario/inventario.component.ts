import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { inventario, productos } from 'src/app/protected/interfaces/interfaces';
import { InventarioService } from 'src/app/protected/services/inventario.service';
import { ProductoService } from 'src/app/protected/services/producto.service';
import { AlmacenesService } from 'src/app/protected/services/almacenes.service';

// Importaciones de Angular Material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filtroForm!: FormGroup;
  almacenes: any[] = [];
  selectedAlmacenId: number | undefined;

  displayedColumns: string[] = ['id_producto', 'existencias'];
  dataSource: MatTableDataSource<inventario> = new MatTableDataSource<inventario>([]);

  entradaCreatedSubscription!: Subscription;
  entradaUpdatedSubscription!: Subscription;
  entradaDeletedSubscription!: Subscription;

  constructor(
    private inventarioService: InventarioService,
    private productoService: ProductoService,
    private almacenService: AlmacenesService
  ) {
    this.filtroForm = new FormGroup({
      filtro: new FormControl(0)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
    this.almacenService.getAlmacenes(true).subscribe(
      (almacenes: any[]) => {
        this.almacenes = almacenes;
      },
      error => {
        console.error('Error al obtener los almacenes:', error);
      }
    );

    this.filtroForm.get('filtro')?.valueChanges.subscribe((selectedId: number) => {
      this.selectedAlmacenId = selectedId;
      this.getInventarios(selectedId);
    });
  
    // Llama a getInventarios() inicialmente con el valor actual del select
    const selectedId = this.filtroForm.get('filtro')?.value;
    if (selectedId) {
      this.selectedAlmacenId = selectedId;
      this.getInventarios(selectedId);
    }
  }

  getInventarios(idAlmacen: number): void {
    this.productoService.getProductos().subscribe(
      (productos: productos[]) => {
        const productosMap = new Map<string, string>(productos.map(producto => [producto.id_producto, producto.nombre]));
  
        this.inventarioService.getInventario(idAlmacen).subscribe(
          (inventarios: inventario[]) => {
            this.dataSource.data = inventarios.map(inventario => ({
              ...inventario,
              nombreProducto: productosMap.get(inventario.id_producto)
            }));
          },
          error => {
            console.error('Error al obtener el inventario:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {}
}
