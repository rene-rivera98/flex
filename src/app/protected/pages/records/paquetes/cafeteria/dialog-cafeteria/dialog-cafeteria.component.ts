import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CafeteriaService } from 'src/app/protected/services/cafeteria.service';
import { ProductoService } from 'src/app/protected/services/producto.service';
import { cafeteria } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-cafeteria',
  templateUrl: './dialog-cafeteria.component.html',
  styleUrls: ['./dialog-cafeteria.component.css']
})
export class DialogCafeteriaComponent implements OnInit {

  cafeForm!: FormGroup;
  productos: any[] = [];
  listaProductos: any[] = [];
  i!: number;
  idProductos: any[] = []; // Agrega esta línea
  cantidades: number[] = []; // Agrega esta línea
  idProductoToNombre: { [key: string]: string } = {};

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogCafeteriaComponent>,
    private cafeService: CafeteriaService,
    private productoService: ProductoService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.cafeForm = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      descripcion: ['', [Validators.required]],
      precio: [''],
      iva: [''],
      isr: ['', [Validators.required]],
      detalla_cafeteria_producto: this.formBuilder.array([]), // Define productos_receta como un FormArray vacío
      productos: [],
      cantidad: []
    });

    this.obtenerProductos();
  }

  agregarProducto() {
    const productoSeleccionado = this.cafeForm.value.productos;
    const cantidad = this.cafeForm.value.cantidad;
  
    // Verifica si se seleccionó un insumo y la cantidad es válida
    if (productoSeleccionado && cantidad) {
      const nuevoProducto = {
        id_producto: productoSeleccionado,
        cantidad: cantidad
      };
  
      // Agrega el nuevo insumo al array de productos de receta
      const productosPaquete = this.cafeForm.get('detalla_cafeteria_producto') as FormArray;
      productosPaquete.push(this.formBuilder.group(nuevoProducto));
  
      // Imprime el array de productos de receta
      console.log('Array de productos de paquete:', productosPaquete.value);
  
      // Limpia los campos de selección de insumo y cantidad
      this.cafeForm.patchValue({
        productos: null,
        cantidad: null
      });
    }
  }
   
  quitarProducto(index: number) {
    const productosPaquete = this.cafeForm.get('detalla_cafeteria_producto') as FormArray;
    productosPaquete.removeAt(index);
  
    // Elimina el producto y la cantidad de los arreglos correspondientes
    this.idProductos.splice(index, 1);
    this.cantidades.splice(index, 1);

    console.log('Array de productos de paquete:', productosPaquete.value);
  }

  obtenerProductos() {
    this.productoService.getProductosCafeteria().subscribe(
      (response: any[]) => {
        this.productos = response.map((producto: any) => ({
          id_producto: producto.id_producto,
          nombre: producto.nombre
        }));
        this.listaProductos = response;
        const idProductoToNombre: { [key: string]: string } = {};
        for (const producto of response) {
          idProductoToNombre[producto.id_producto] = producto.nombre;
        }
        this.idProductoToNombre = idProductoToNombre;
        // console.log(response);
      },
      (error: any) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  onSubmit() {
    console.log('Submit button clicked');
    if (this.cafeForm.valid) {
      const nuevoProducto: cafeteria = {
        id_paquete_cafeteria: '',
        codigo: this.cafeForm.value.codigo,
        nombre: this.cafeForm.value.nombre,
        descripcion: this.cafeForm.value.descripcion,
        precio: this.cafeForm.value.precio,
        iva: this.cafeForm.value.iva,
        isr: this.cafeForm.value.isr,
        detalla_cafeteria_producto: this.cafeForm.value.detalla_cafeteria_producto // Asigna el valor del array productos_receta al campo correspondiente
      };
  
      console.log('Nuevo Producto:', nuevoProducto);
  
      // Envía el nuevo producto al servicio
      this.cafeService.createCafeteria(nuevoProducto).subscribe(
        (response: any) => {
          console.log('Producto agregado:', response);
          this.snackBar.open('Producto agregado correctamente', 'Aceptar', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.dialogRef.close();
          this.cafeService.notifyCafeCreated(nuevoProducto); // Notifica que la sucursal ha sido eliminada

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
