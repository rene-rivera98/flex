import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from 'src/app/protected/services/producto.service';
import { producto_venta } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-editar-venta',
  templateUrl: './dialog-editar-venta.component.html',
  styleUrls: ['./dialog-editar-venta.component.css']
})
export class DialogEditarVentaComponent {

  ventaForm!: FormGroup;
  venta!: producto_venta;
  insumos: any[] = []; // Array para almacenar los insumos seleccionados
  listaProductos: any[] = [];
  idProductos: any[] = []; // Agrega esta línea
  cantidades: number[] = []; // Agrega esta línea
  i!: number;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditarVentaComponent>,
    private ventaService: ProductoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { 
    this.venta = data; // Asignar los datos del elemento seleccionado a la variable 'sucursal'
      console.log('Datos recibidos:', this.venta);

      this.ventaForm = this.formBuilder.group({
        codigo: [this.venta.codigo, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        tipo_egreso: [this.venta.tipo_egreso, [Validators.required]],
        nombre: [this.venta.nombre, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        area:[this.venta.area, [Validators.required]],
        talla: [this.venta.talla, [Validators.required]],
        unidad_medida: [this.venta.unidad_medida, [Validators.required]],
        precio: [this.venta.precio, [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]],
        receta: [this.venta.receta],
        perecedero: [this.venta.perecedero],
        productos_receta: this.formBuilder.array([this.venta.productos_receta]),
        insumos: [],
        cantidad: []
      });

      this.obtenerInsumos();

      console.log(this.ventaForm.get('productos_receta')?.value);

  }

  actualizarProducto(): void {
    if (this.ventaForm.valid) {
      // Obtener el id_proveedor de this.sucursal o desde donde lo obtengas en tu código
      const idProducto = this.venta.id_producto;
      const productoActualizado = this.ventaForm.value;

      // Llamar al servicio de API para actualizar la sucursal
      this.ventaService.updatedVenta(idProducto, productoActualizado).subscribe(
        (response: any) => {
          console.log('Producto actualizado', response);
          // Mostrar una notificación o mensaje de éxito utilizando MatSnackBar
          this.snackBar.open('Producto actualizado correctamente', '', {
            duration: 5000,
            panelClass: ['mat-snack-bar-success'], // Clase personalizada para el estilo de éxito
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          // Cerrar el diálogo
          this.dialogRef.close();

          // Notificar a través del servicio SucursalesService que la sucursal ha sido actualizada
          this.ventaService.notifyVentaUpdated(productoActualizado);
        },
        (error: any) => {
          console.error('Error al actualizar el producto:', error);
          // Mostrar una notificación o mensaje de error utilizando MatSnackBar
          this.snackBar.open('Error al actualizar producto', '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['mat-snack-bar-error'], // Clase personalizada para el estilo de error
            horizontalPosition: 'end'
          });
        }
      );
    }
  }

  obtenerInsumos() {
    this.http.get<any>('http://localhost/api/producto/insumo').subscribe(
      (response: any) => {
        if (Array.isArray(response.query)) {
          this.insumos = response.query.map((insumo: { id_producto: any; nombre: any; }) => ({ id_producto: insumo.id_producto, nombre: insumo.nombre }));
          this.listaProductos = response.query; // Guarda la lista completa de productos
          console.log(response.query);
        } else {
          console.error('La respuesta del API no contiene un arreglo de insumos:', response);
        }
      },
      (error: any) => {
        console.error('Error al obtener los insumos:', error);
      }
    );
  }

  agregarProducto() {
    const insumo = this.ventaForm.get('insumos')?.value;
    const cantidad = this.ventaForm.get('cantidad')?.value;
  
    // Agregar insumo y cantidad a las propiedades correspondientes
    this.idProductos.push(insumo);
    this.cantidades.push(cantidad);
  
    // Limpiar campos de entrada
    this.ventaForm.get('insumos')?.reset();
    this.ventaForm.get('cantidad')?.reset();
  }
  
  quitarProducto(index: number) {
    // Quitar insumo y cantidad según el índice proporcionado
    this.idProductos.splice(index, 1);
    this.cantidades.splice(index, 1);
  }

  obtenerNombreProducto(id: string): string {
    const producto = this.listaProductos.find((p) => p.id_producto.toString() === id);
    console.log(producto);
    return producto ? producto.nombre : '';
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
