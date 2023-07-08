import { HttpClient } from '@angular/common/http';
import { Component, Inject} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ProductoService } from 'src/app/protected/services/producto.service';
import { producto_venta } from 'src/app/protected/interfaces/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-editar-producto-venta',
  templateUrl: './dialog-editar-venta.component.html',
  styleUrls: ['./dialog-editar-venta.component.css']
})
export class DialogEditarVentaComponent {

  ventaForm!: FormGroup;
  venta!: producto_venta;

  tallas: string[] = [];
  unidadesMedida: string[] = [];

  productos: any[] = [];
  i!: number;
  idProductos: string[] = [];
  listaProductos: any[] = [];
  cantidades: number[] = []; 
  idProductoToNombre: { [key: string]: string } = {};

  constructor(
    public dialogRef: MatDialogRef<DialogEditarVentaComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private ventaService: ProductoService,
    private snackBar: MatSnackBar) 
  { 
    this.venta = data;
    console.log('Datos recibidos:', this.venta);

    this.ventaForm = this.formBuilder.group({
      area: [this.venta.area, [Validators.required]],
      codigo: [this.venta.codigo, [Validators.required]],
      nombre: [this.venta.nombre, [Validators.required]],
      precio: [this.venta.precio, [Validators.required]],
      talla: [this.venta.talla, [Validators.required]],
      unidad_medida: [this.venta.unidad_medida],
      tipo_egreso: [this.venta.tipo_egreso],
      perecedero: [this.venta.perecedero],
      receta: [this.venta.receta],
      productos_receta: this.formBuilder.array([]),
      productos: [],
      cantidad: []
    });

    const productosRecetaArray = this.ventaForm.get('productos_receta') as FormArray;
      if (this.venta.productos_receta?.length) {
        this.venta.productos_receta.forEach((producto: any) => {
          productosRecetaArray.push(this.formBuilder.group(producto));
          console.log('Array de insumos de receta:', productosRecetaArray.value);
        });
      }

    this.obtenerProductos();
  }

  actualizarValores() {
    const areaSeleccionada = this.ventaForm.get('area')?.value;

    // Actualizar valores de acuerdo a la selección del área
    if (areaSeleccionada === 'Cafeteria') {
      this.tallas = ['Chico', 'Mediano', 'Grande' ,'N/A'];
      this.unidadesMedida = ['ml', 'grs', 'oz', 'pz', 'cm', 'bolsa', 'grs', 'N/A'];
    } else if (areaSeleccionada === 'FrontDesk') {
      this.tallas = ['Bebe', 'Niño', 'Chica', 'Mediana', 'Grande', 'Extra-grande', 'N/A'];
      this.unidadesMedida = ['pz', 'N/A'];
    } else {
      // Otras opciones
      this.tallas = ['N/A'];
      this.unidadesMedida = ['N/A'];
    }
  }

  agregarProducto() {
    const productoSeleccionado = this.ventaForm.value.productos;
    const cantidad = this.ventaForm.value.cantidad;
  
    // Verifica si se seleccionó un insumo y la cantidad es válida
    if (productoSeleccionado && cantidad) {
      const nuevoProducto = {
        id_producto: productoSeleccionado,
        cantidad: cantidad
      };
  
      // Agrega el nuevo insumo al array de productos de receta
      const productosVenta = this.ventaForm.get('productos_receta') as FormArray;
      productosVenta.push(this.formBuilder.group(nuevoProducto));
  
      // Imprime el array de productos 
      console.log('Array de productos de receta:', productosVenta.value);
  
      // Limpia los campos de selección de insumo y cantidad
      this.ventaForm.patchValue({
        productos: null,
        cantidad: null
      });
    }
  }

  quitarProducto(index: number) {
    const productosVenta = this.ventaForm.get('productos_receta') as FormArray;
    productosVenta.removeAt(index);
  
    // Elimina el producto y la cantidad de los arreglos correspondientes
    this.idProductos.splice(index, 1);
    this.cantidades.splice(index, 1);

    console.log('Array de productos de venta:', productosVenta.value);
  }

  obtenerNombreProducto(id: string): string {
    const producto = this.listaProductos.find((p) => p.id_producto.toString() === id);
    // console.log(producto);
    return producto ? producto.nombre : '';
  }


  obtenerProductos() {
    const urlInsumo = 'http://localhost/api/producto/insumo/';
  
    const insumoRequest = this.http.get<any>(urlInsumo);
  
    insumoRequest.subscribe(
      (response: any) => {
        const productosInsumo = response.query.map((producto: any) => ({
          id_producto: producto.id_producto,
          nombre: producto.nombre
        }));
  
        this.productos = [...productosInsumo];
        this.listaProductos = [...productosInsumo];
  
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
  


  actualizarVenta(): void {
    if (this.ventaForm.valid) {
      const idVenta = this.venta.id_producto;
      const ventaActualizado = { ...this.ventaForm.value }; // Clonar el objeto
  
      this.ventaService.updatedVenta(idVenta, ventaActualizado).subscribe(
        (response: any) => {
          console.log('Venta actualizada', response);
          this.snackBar.open('Producto actualizado correctamente', '', {
            duration: 5000,
            panelClass: ['mat-snack-bar-success'],
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.dialogRef.close();
          this.ventaService.notifyVentaUpdated(ventaActualizado);
        },
        (error: any) => {
          console.error('Error al actualizar producto:', error);
          this.snackBar.open('Error al actualizar producto', '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['mat-snack-bar-error'],
            horizontalPosition: 'end'
          });
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
