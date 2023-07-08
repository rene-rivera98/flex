import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Subscription } from 'rxjs';

import { CompraService } from 'src/app/protected/services/compra.service';
import { compra } from 'src/app/protected/interfaces/interfaces';

@Component({
  selector: 'app-dialog-editar-compra',
  templateUrl: './dialog-editar-compra.component.html',
  styleUrls: ['./dialog-editar-compra.component.css']
})
export class DialogEditarCompraComponent implements OnDestroy {
  compraForm!: FormGroup;
  compra!: compra;
  mostrarFechaRecepcion = false;
  mostrarFechaRecibido = false;

  productos: any[] = [];
  proveedores: any[] = [];
  sucursales: any[] = [];
  listaProductos: any[] = [];
  cantidades: number[] = [];
  idProductoToNombre: { [key: string]: string } = {};

  private httpSubscription: Subscription | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarCompraComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private compraService: CompraService,
    private snackBar: MatSnackBar
  ) {
    this.compra = data;
    console.log('Datos recibidos:', this.compra);

    this.compraForm = this.formBuilder.group({
      id_proveedor: [this.compra.id_proveedor, [Validators.required]],
      folio_compra: [this.compra.folio_compra, [Validators.required]],
      cfdi: [this.compra.cfdi, [Validators.required]],
      fecha_factura: [this.compra.fecha_factura, [Validators.required]],
      subtotal: [this.compra.subtotal, [Validators.required]],
      iva: [this.compra.iva],
      isr: [this.compra.isr],
      ieps: [this.compra.ieps],
      monto_total: [this.compra.monto_total, [Validators.required]],
      metodo_pago: [this.compra.metodo_pago, [Validators.required]],
      id_sucursal: [this.compra.id_sucursal, [Validators.required]],
      fecha_recepcion: [this.compra.fecha_recepcion],
      fecha_comprobante: [this.compra.fecha_comprobante],
      detalla_factura_compra: this.formBuilder.array([]),
      productos: [],
      cantidad: []
    });

    const productosFacturaArray = this.compraForm.get('detalla_factura_compra') as FormArray;
    this.compra.detalla_factura_compra.forEach((producto: any) => {
      productosFacturaArray.push(this.formBuilder.group(producto));
      console.log('Array de productos de factura:', productosFacturaArray.value);
    });

    this.obtenerProductos();
    this.obtenerProveedores();
    this.obtenerSucursales();
  }

  agregarProducto() {
    const productoSeleccionado = this.compraForm.get('detalla_factura_compra')?.value;
    const cantidad = this.compraForm.get('cantidad')?.value;

    // Verifica si se seleccionó un insumo y la cantidad es válida
    if (productoSeleccionado && cantidad) {
      const nuevoProducto = {
        id_producto: productoSeleccionado,
        cantidad: cantidad
      };

      // Agrega el nuevo insumo al array de productos de receta
      const productosCompra = this.compraForm.get('detalla_factura_compra') as FormArray;
      productosCompra.push(this.formBuilder.group(nuevoProducto));

      // Imprime el array de productos de receta
      console.log('Array de productos de compra:', productosCompra.value);

      // Limpia los campos de selección de insumo y cantidad
      this.compraForm.patchValue({
        productos: null,
        cantidad: null,
        fecha_recepcion: null,
        fecha_comprobante: null
      });
    }
  }

  quitarProducto(index: number) {
    const productosCompra = this.compraForm.get('detalla_factura_compra') as FormArray;
    productosCompra.removeAt(index);

    // Elimina el producto y la cantidad de los arreglos correspondientes
    this.cantidades.splice(index, 1);

    console.log('Array de productos de compra:', productosCompra.value);
  }

  obtenerNombreProducto(id: string): string {
    return this.idProductoToNombre[id] || '';
  }

  obtenerProveedores() {
    this.httpSubscription = this.http.get<any>('http://localhost/api/proveedores').subscribe(
      (response: any) => {
        if (Array.isArray(response.query)) {
          this.proveedores = response.query.map((proveedor: { id_proveedor: any; nombre: any; }) => ({ id_proveedor: proveedor.id_proveedor, nombre: proveedor.nombre }));
          console.log(response.query);
        } else {
          console.error('La respuesta del API no contiene un arreglo de proveedores:', response);
        }
      },
      (error: any) => {
        console.error('Error al obtener los proveedores:', error);
      }
    );
  }

  obtenerProductos() {
    const urlVenta = 'http://localhost/api/producto/venta/';
    const urlInsumo = 'http://localhost/api/producto/insumo/';
    const urlActivo = 'http://localhost/api/producto/activo/';

    const ventaRequest = this.http.get<any>(urlVenta);
    const insumoRequest = this.http.get<any>(urlInsumo);
    const activoRequest = this.http.get<any>(urlActivo);

    this.httpSubscription = forkJoin([ventaRequest, insumoRequest, activoRequest]).subscribe(
      (responses: any[]) => {
        const productosVenta = responses[0].query.filter((producto: any) => producto.receta === 0).map((producto: any) => ({ id_producto: producto.id_producto, nombre: producto.nombre }));
        const productosInsumo = responses[1].query.map((producto: any) => ({ id_producto: producto.id_producto, nombre: producto.nombre }));
        const productosActivo = responses[2].query.map((producto: any) => ({ id_producto: producto.id_producto, nombre: producto.nombre }));

        this.productos = [...productosVenta, ...productosInsumo, ...productosActivo];
        this.listaProductos = [...productosVenta, ...productosInsumo, ...productosActivo];

        // Crea un objeto de mapeo de id_producto a nombre
        const idProductoToNombre: { [key: string]: string } = {};
        for (const producto of this.listaProductos) {
          idProductoToNombre[producto.id_producto] = producto.nombre;
        }

        // Asigna el objeto de mapeo a una propiedad del componente
        this.idProductoToNombre = idProductoToNombre;
      },
      (error: any) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  obtenerSucursales() {
    this.httpSubscription = this.http.get<any>('http://localhost/api/sucursales/').subscribe(
      (response: any) => {
        if (Array.isArray(response.query)) {
          this.sucursales = response.query.map((sucursal: { id_sucursal: any; nombre: any; }) => ({ id_sucursal: sucursal.id_sucursal, nombre: sucursal.nombre }));
        } else {
          console.error('La respuesta del API no contiene un arreglo de sucursales:', response);
        }
      },
      (error: any) => {
        console.error('Error al obtener las sucursales:', error);
      }
    );
  }

  onRecepcionChange() {
    const selectRecepcion = document.getElementById("status_recepcion") as HTMLSelectElement;
    const valorRecepcion = selectRecepcion.value;
    this.mostrarFechaRecepcion = valorRecepcion === 'Recibido';
  }

  onRecibidoChange() {
    const selectRecibido = document.getElementById("status_comprobante") as HTMLSelectElement;
    const valorRecibido = selectRecibido.value;
    this.mostrarFechaRecibido = valorRecibido === 'Recibido';
  }

  closeDialog() {
    this.dialogRef.close();
  }

  actualizarCompra(): void {
    if (this.compraForm.valid) {
      const idCompra = this.compra.id_compra;
      const compraActualizada = { ...this.compraForm.value };

      this.compraService.updatedCompra(idCompra, compraActualizada).subscribe(
        (response: any) => {
          console.log('Compra actualizada', response);
          this.snackBar.open('Compra actualizada correctamente', '', {
            duration: 5000,
            panelClass: ['mat-snack-bar-success'],
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.dialogRef.close();
          this.compraService.notifyCompraUpdated(compraActualizada);
        },
        (error: any) => {
          console.error('Error al actualizar la compra:', error);
          this.snackBar.open('Error al actualizar compra', '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['mat-snack-bar-error'],
            horizontalPosition: 'end'
          });
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }
}
