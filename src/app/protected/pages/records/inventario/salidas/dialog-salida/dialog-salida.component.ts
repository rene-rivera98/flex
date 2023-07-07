import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { salidas } from 'src/app/protected/interfaces/interfaces';
import { SalidasService } from 'src/app/protected/services/salidas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dialog-salida',
  templateUrl: './dialog-salida.component.html',
  styleUrls: ['./dialog-salida.component.css']
})
export class DialogSalidaComponent implements OnInit {

  salidaForm!: FormGroup;
  productos: any[] = [];
  almacenes: any[] = [];

  constructor(
    private salidaService: SalidasService,
    public dialogRef: MatDialogRef<DialogSalidaComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.salidaForm = this.formBuilder.group({
      id_producto: [],
      id_almacen: [],
      cantidad: [],
      fecha_salida: []
    });

    this.obtenerProductos();
    this.obtenerAlmacenes();
    
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
      },
      (error: any) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  obtenerAlmacenes() {
    this.http.get<any>('http://localhost/api/almacenes').subscribe(
      (response: any) => {
        if (Array.isArray(response.query)) {
          this.almacenes = response.query.map((almacen: { id_almacen: any; nombre: any; }) => ({ id_almacen: almacen.id_almacen, nombre: almacen.nombre }));
          console.log(response.query);
        } else {
          console.error('La respuesta del API no contiene un arreglo de almacenes:', response);
        }
      },
      (error: any) => {
        console.error('Error al obtener los almacenes:', error);
      }
    );
  }

  onSubmit() {
    console.log('Submit button clicked');
    if (this.salidaForm.valid) {
      const nuevaSalida: salidas = this.salidaForm.value;
      console.log(this.salidaForm.value);
      this.createSalida(nuevaSalida);
    }
  }

  createSalida(nuevaSalida: salidas) {
    this.salidaService.createSalidas(nuevaSalida).subscribe(
      (response) => {
        // Usuario creado con éxito
        console.log(response);

        const message = `Salida registrada correctamente`;

        this.snackBar.open(message, '', {
          duration: 15000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });

        this.dialogRef.close();

        // Notificar a SucursalesComponent que se ha creado un nuevo usuario
        // this.entradaService.notifyEntradaCreated(nuevaEntrada);
      },
      (error) => {
        // Error al crear el usuario
        console.error(error);
        this.snackBar.open('Error al registrar salida', '', {
          duration: 5000,
        });
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
