import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/protected/services/producto.service';
import { producto_venta } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-venta',
  templateUrl: './dialog-venta.component.html',
  styleUrls: ['./dialog-venta.component.css']
})
export class DialogVentaComponent implements OnInit {

  ventaForm!: FormGroup;
  insumos: any[] = []; // Array para almacenar los insumos seleccionados
  idProductos: string[] = [];
  cantidades: number[] = [];
  listaProductos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogVentaComponent>,
    private ventaService: ProductoService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.ventaForm = this.formBuilder.group({
      codigo: [],
      nombre: [],
      cantidad: [],
      area:[],
      talla: [''],
      precio: [],
      receta: [false],
      unidad_medida: [''],
      perecedero: [false],
      tipo_egreso: [],
      insumos: []
    });

    this.obtenerInsumos();
  }

  agregarProducto() {
    const idProducto = this.ventaForm.value.insumos;
    const cantidad = this.ventaForm.value.cantidad;
  
    this.idProductos.push(idProducto);
    this.cantidades.push(cantidad);
  
    console.log('ID Productos:', this.idProductos);
    console.log('Cantidades:', this.cantidades);
  }

  quitarProducto() {
    this.idProductos.pop();
    this.cantidades.pop();
  
    console.log('ID Productos:', this.idProductos);
    console.log('Cantidades:', this.cantidades);
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

  obtenerNombreProducto(id: string): string {
    const producto = this.listaProductos.find((p) => p.id_producto.toString() === id);
    console.log(producto);
    return producto ? producto.nombre : '';
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('Submit button clicked');
    if (this.ventaForm.valid) {
      const nuevoProducto: producto_venta = {
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
        productos_receta: this.idProductos,
        cantidad: this.cantidades,
        id_producto: '', // Reemplaza 'valor' con el valor correcto para id_producto
        created_at: '', // Reemplaza 'valor' con el valor correcto para created_at
        updated_at: '' // Reemplaza 'valor' con el valor correcto para updated_atts
      };

      this.ventaService.createVenta(nuevoProducto).subscribe(
        (response) => {
          // Producto creado con éxito
          console.log(response);

          this.snackBar.open('Producto registrado correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

          this.dialogRef.close();
  
          // Notificar a SucursalesComponent que se ha creado un nuevo producto
          this.ventaService.notifyVentaCreated(nuevoProducto);
        },
        (error) => {
          // Error al crear el producto
          console.error(error);
          this.snackBar.open('Error al registrar el producto', 'Cerrar', {
            duration: 5000,
          });
        }
      );
    }
  }

}
