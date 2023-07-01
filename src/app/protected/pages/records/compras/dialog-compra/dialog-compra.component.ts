import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  productos: any[] = [];
  proveedores: any[] = [];
  sucursales: any[] = [];
  // cantidades: number[] = [];

  idProductos: string[] = [];
  listaProductos: any[] = [];

  constructor(
    private comprasService: CompraService, 
    public dialogRef: MatDialogRef<DialogCompraComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.compraForm = this.formBuilder.group({
      id_proveedor: [],
      productos: [],
      folio_compra: [],
      cfdi: [''],
      fecha_factura: [],
      subtotal: ['', [Validators.pattern(/^\d+$/)]],
      iva: [0],
      isr: [0],
      ieps: [0],
      monto_total: [],
      metodo_pago: [],
      estado_pago: [],
      fecha_pago: [],
      forma_pago: [],
      id_sucursal: [],
      fecha_recepcion: [''],
      monto_pago: []
    });

    this.obtenerProveedores();
    this.obtenerProductos();
    this.obtenerSucursales();
  }

  agregarProducto() {
    const idProducto = this.compraForm.value.productos;
    // const cantidad = this.compraForm.value.cantidad;
  
    this.idProductos.push(idProducto);
    // this.cantidades.push(cantidad);
  
    console.log('ID Productos:', this.idProductos);
    // console.log('Cantidades:', this.cantidades);
  }

  quitarProducto() {
    this.idProductos.pop();
    // this.cantidades.pop();
  
    console.log('ID Productos:', this.idProductos);
    // console.log('Cantidades:', this.cantidades);
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

  onSubmit() {
    console.log('Submit button clicked');
    if (this.compraForm.valid) {
      const nuevaCompra: compra = {
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
        estado_pago: this.compraForm.value.estado_pago,
        detalla_factura_compra: this.idProductos,
        id_compra: '',
        created_at: '', // Reemplaza 'valor' con el valor correcto para created_at
        updated_at: '', // Reemplaza 'valor' con el valor correcto para updated_atts
      };

      this.comprasService.createCompra(nuevaCompra).subscribe(
        (response) => {
          // Producto creado con éxito
          console.log(response);

          this.snackBar.open('Compra registrada correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

          this.dialogRef.close();
  
          // Notificar a SucursalesComponent que se ha creado un nuevo producto
          this.comprasService.notifyCompraCreated(nuevaCompra);
        },
        (error) => {
          // Error al crear el producto
          console.error(error);
          this.snackBar.open('Error al registrar la compra', '', {
            duration: 5000,
          });
        }
      );
    }
  }

}
