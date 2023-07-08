import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CompraService } from 'src/app/protected/services/compra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { compra } from 'src/app/protected/interfaces/interfaces';
import { forkJoin} from 'rxjs';

@Component({
  selector: 'app-dialog-compra',
  templateUrl: './dialog-compra.component.html',
  styleUrls: ['./dialog-compra.component.css']
})
export class DialogCompraComponent implements OnInit {

  compraForm!: FormGroup;
  mostrarFechaRecepcion = false;
  mostrarFechaRecibido = false;

  productos: any[] = [];
  proveedores: any[] = [];
  sucursales: any[] = [];
  // cantidades: number[] = [];
  i!: number;
  idProductos: string[] = [];
  listaProductos: any[] = [];
  cantidades: number[] = []; 
  idProductoToNombre: { [key: string]: string } = {};

  constructor(
    private comprasService: CompraService, 
    public dialogRef: MatDialogRef<DialogCompraComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.compraForm = this.formBuilder.group({
      id_proveedor: ['', [Validators.required]],
      folio_compra: ['', [Validators.required]],
      cfdi: ['', [Validators.required]],
      fecha_factura: ['', [Validators.required]],
      subtotal: ['', [Validators.required]],
      iva: [0],
      isr: [0],
      ieps: [0],
      monto_total: ['', [Validators.required]],
      metodo_pago: ['', [Validators.required]],
      id_sucursal: ['', [Validators.required]],
      fecha_recepcion: [false],
      detalla_factura_compra: this.formBuilder.array([]),
      productos: [],
      cantidad: [],
      fecha_comprobante: [false]
    });

    this.obtenerProveedores();
    this.obtenerProductos();
    this.obtenerSucursales();
  }

  agregarProducto() {
    const productoSeleccionado = this.compraForm.value.productos;
    const cantidad = this.compraForm.value.cantidad;
  
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
    this.idProductos.splice(index, 1);
    this.cantidades.splice(index, 1);

    console.log('Array de productos de compra:', productosCompra.value);
  }

  obtenerNombreProducto(id: string): string {
    const producto = this.listaProductos.find((p) => p.id_producto.toString() === id);
    // console.log(producto);
    return producto ? producto.nombre : '';
  }

  obtenerProveedores() {
    this.http.get<any>('http://localhost/api/proveedores').subscribe(
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
  
    forkJoin([ventaRequest, insumoRequest, activoRequest]).subscribe(
      (responses: any[]) => {
        const productosVenta = responses[0].query.filter((producto: any) => producto.receta === 0).map((producto: any) => ({ id_producto: producto.id_producto, nombre: producto.nombre }));
        const productosInsumo = responses[1].query.map((producto: any) => ({ id_producto: producto.id_producto, nombre: producto.nombre }));
        const productosActivo = responses[2].query.map((producto: any) => ({ id_producto: producto.id_producto, nombre: producto.nombre }));
  
        this.productos = [...productosVenta, ...productosInsumo, ...productosActivo];
        this.listaProductos = [...productosVenta, ...productosInsumo, ...productosActivo]; // Agrega esta línea para inicializar la lista de productos
  
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

  obtenerSucursales(){
    this.http.get<any>('http://localhost/api/sucursales/').subscribe(
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

  closeDialog() {
    this.dialogRef.close();
  }
  
  onRecepcionChange() {
    const selectRecepcion = document.getElementById("status_recepcion") as HTMLSelectElement;
    const valorRecepcion = selectRecepcion.value;
    this.mostrarFechaRecepcion = valorRecepcion === 'Recibido';
  }

  onRecibidoChange(){
    const selectRecibido = document.getElementById("status_comprobante") as HTMLSelectElement;
    const valorRecibido = selectRecibido.value;
    this.mostrarFechaRecibido = valorRecibido === 'Recibido';
  }

  onSubmit() {
    console.log('Submit button clicked');
    if (this.compraForm.valid) {
      const nuevaCompra: compra = {
        id_compra: '',
        folio_compra: this.compraForm.value.folio_compra,
        cfdi: this.compraForm.value.cfdi,
        fecha_factura: this.compraForm.value.fecha_factura,
        id_proveedor: this.compraForm.value.id_proveedor,
        id_sucursal: this.compraForm.value.id_sucursal,
        subtotal: this.compraForm.value.subtotal,
        iva: this.compraForm.value.iva,
        isr: this.compraForm.value.isr,
        ieps: this.compraForm.value.ieps,
        monto_total: this.compraForm.value.monto_total,
        metodo_pago: this.compraForm.value.metodo_pago,
        fecha_recepcion: this.compraForm.value.fecha_recepcion,
        estado_pago: 'Pendiente',
        detalla_factura_compra: this.compraForm.value.detalla_factura_compra,
        fecha_comprobante: this.compraForm.value.fecha_comprobante
      };

      console.log('Nueva compra:', nuevaCompra);

      this.comprasService.createCompra(nuevaCompra).subscribe(
        (response) => {
          console.log(response);

          this.snackBar.open('Compra registrada correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

          this.dialogRef.close();
          this.comprasService.notifyCompraCreated(nuevaCompra);
        },
        (error) => {
          console.error(error);
          this.snackBar.open('Error al registrar la compra', '', {
            duration: 5000,
          });
        }
      );
    }
  }

}
