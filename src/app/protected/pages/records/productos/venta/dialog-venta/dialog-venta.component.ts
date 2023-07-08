import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/protected/services/producto.service';
import { producto_venta} from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-venta',
  templateUrl: './dialog-venta.component.html',
  styleUrls: ['./dialog-venta.component.css']
})
export class DialogVentaComponent implements OnInit {

  ventaForm!: FormGroup;
  tallas: string[] = [];
  unidadesMedida: string[] = [];
  insumos: any[] = []; // Array para almacenar los insumos seleccionados
  listaProductos: any[] = [];
  i!: number;
  idProductos: any[] = []; // Agrega esta línea
  cantidades: number[] = []; // Agrega esta línea
  idProductoToNombre: { [key: string]: string } = {};
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogVentaComponent>,
    private ventaService: ProductoService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.ventaForm = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      tipo_egreso: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      area:['', [Validators.required]],
      talla: [''],
      unidad_medida: [''],
      precio: ['', [Validators.required]],
      receta: [false],
      perecedero: [false],
      productos_receta: this.formBuilder.array([]), // Define productos_receta como un FormArray vacío
      insumos: [],
      cantidad: []
    });

    this.obtenerInsumos();
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

  agregarInsumo() {
    const insumoSeleccionado = this.ventaForm.value.insumos;
    const cantidad = this.ventaForm.value.cantidad;
  
    // Verifica si se seleccionó un insumo y la cantidad es válida
    if (insumoSeleccionado && cantidad) {
      const nuevoInsumo = {
        insumos_id_producto: insumoSeleccionado,
        cantidad: cantidad
      };
  
      // Agrega el nuevo insumo al array de productos de receta
      const productosReceta = this.ventaForm.get('productos_receta') as FormArray;
      productosReceta.push(this.formBuilder.group(nuevoInsumo));
  
      // Imprime el array de productos de receta
      console.log('Array de productos de receta:', productosReceta.value);
  
      // Limpia los campos de selección de insumo y cantidad
      this.ventaForm.patchValue({
        insumos: null,
        cantidad: null
      });
    }
  }
   
  quitarInsumo(index: number) {
    const productosReceta = this.ventaForm.get('productos_receta') as FormArray;
    productosReceta.removeAt(index);
  
    // Elimina el producto y la cantidad de los arreglos correspondientes
    this.idProductos.splice(index, 1);
    this.cantidades.splice(index, 1);

    console.log('Array de productos de receta:', productosReceta.value);
  }
  
  obtenerInsumos() {
    this.ventaService.getInsumos_().subscribe(
      (response: any[]) => {
        this.insumos = response.map((insumo: any) => ({
          id_producto: insumo.id_producto,
          nombre: insumo.nombre
        }));
        this.listaProductos = response;
        const idProductoToNombre: { [key: string]: string } = {};
        for (const insumo of response) {
          idProductoToNombre[insumo.id_producto] = insumo.nombre;
        }
        this.idProductoToNombre = idProductoToNombre;
        // console.log(response);
      },
      (error: any) => {
        console.error('Error al obtener los insumos:', error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('Submit button clicked');
    if (this.ventaForm.valid) {
      const nuevoProducto: producto_venta = {
        id_producto: '',
        codigo: this.ventaForm.value.codigo,
        tipo_egreso: this.ventaForm.value.tipo_egreso,
        tipo_producto: 'Venta',
        perecedero: this.ventaForm.value.perecedero,
        nombre: this.ventaForm.value.nombre,
        area: this.ventaForm.value.area,
        receta: this.ventaForm.value.receta,
        talla: this.ventaForm.value.talla,
        unidad_medida: this.ventaForm.value.unidad_medida,
        precio: this.ventaForm.value.precio,
        productos_receta: this.ventaForm.value.productos_receta // Asigna el valor del array productos_receta al campo correspondiente
      };
  
      console.log('Nuevo Producto:', nuevoProducto);
  
      // Envía el nuevo producto al servicio
      this.ventaService.createVenta(nuevoProducto).subscribe(
        (response: any) => {
          console.log('Producto agregado:', response);
          this.snackBar.open('Producto agregado correctamente', 'Aceptar', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.dialogRef.close();
          this.ventaService.notifyVentaCreated(nuevoProducto); // Notifica que la sucursal ha sido eliminada

        },
        (error: any) => {
          console.error('Error al agregar el producto:', error);
          this.snackBar.open('Error al agregar el producto', 'Aceptar', {
            duration: 2000,
          });
        }
      );
    }
  }
  

}
