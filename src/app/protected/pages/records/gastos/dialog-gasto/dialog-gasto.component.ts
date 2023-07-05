import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GastoService } from 'src/app/protected/services/gasto.service';
import { gastos } from 'src/app/protected/interfaces/interfaces';

@Component({
  selector: 'app-dialog-gasto',
  templateUrl: './dialog-gasto.component.html',
  styleUrls: ['./dialog-gasto.component.css']
})
export class DialogGastoComponent implements OnInit {

  gastoForm!: FormGroup;
  mostrarFechaRecibido = false;
  
  servicios: any[] = [];
  sucursales: any[] = [];

  i!: number;
  idServicios: string[] = [];
  listaServicios: any[] = [];
  conceptos: string[] = [];
  idServicioToNombre: { [key: string]: string } = {};

  constructor(
    private gastosService:GastoService, 
    public dialogRef: MatDialogRef<DialogGastoComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.gastoForm = this.formBuilder.group({
      folio_gasto: ['', [Validators.required]],
      cfdi: ['', [Validators.required]],
      fecha_factura: ['', [Validators.required]],
      subtotal: ['', [Validators.required]],
      iva: [0, [Validators.required]],
      isr: [0, [Validators.required]],
      ieps: [0, [Validators.required]],
      monto_total: ['', [Validators.required]],
      metodo_pago: ['', [Validators.required]],
      estado_pago: ['Pendiente', [Validators.required]],
      id_sucursal: ['', [Validators.required]],
      detalla_factura_gasto: this.formBuilder.array([]),
      servicios: [],
      concepto: [],
      fecha_comprobante: ['']
    });

    this.obtenerServicios();
    this.obtenerSucursales();
  }

  agregarServicio() {
    const servicioSeleccionado = this.gastoForm.value.servicios;
    const concepto = this.gastoForm.value.concepto;
  
    // Verifica si se seleccionó un insumo y la cantidad es válida
    if (servicioSeleccionado && concepto) {
      const nuevoServicio = {
        id_servicio: servicioSeleccionado,
        concepto: concepto
      };
  
      // Agrega el nuevo insumo al array de productos de receta
      const serviciosGasto = this.gastoForm.get('detalla_factura_gasto') as FormArray;
      serviciosGasto.push(this.formBuilder.group(nuevoServicio));
  
      // Imprime el array de productos de receta
      console.log('Array de servicios de gasto:', serviciosGasto.value);
  
      // Limpia los campos de selección de insumo y cantidad
      this.gastoForm.patchValue({
        servicios: null,
        concepto: null
      });
    }
  }

  quitarServicio(index: number) {
    const serviciosGasto = this.gastoForm.get('detalla_factura_gasto') as FormArray;
    serviciosGasto.removeAt(index);
  
    // Elimina el producto y la cantidad de los arreglos correspondientes
    this.idServicios.splice(index, 1);
    this.conceptos.splice(index, 1);

    console.log('Array de servicios de gasto:', serviciosGasto.value);
  }

  obtenerNombreServicio(id: string): string {
    const servicio = this.listaServicios.find((p) => p.id_servicio.toString() === id);
    // console.log(producto);
    return servicio ? servicio.nombre : '';
  }

  obtenerServicios() {
    const urlServicio = 'http://localhost/api/servicios/';
  
    const servicioRequest = this.http.get<any>(urlServicio);
  
    servicioRequest.subscribe(
      (response: any) => {
        const serviciosGasto = response.query.map((servicio: any) => ({
          id_servicio: servicio.id_servicio,
          nombre: servicio.nombre
        }));
  
        this.servicios = [...serviciosGasto];
        this.listaServicios = [...serviciosGasto]; // Agrega esta línea para inicializar la lista de productos
  
        // Crea un objeto de mapeo de id_producto a nombre
        const idServicioToNombre: { [key: string]: string } = {};
        for (const servicio of this.listaServicios) {
          idServicioToNombre[servicio.id_servicio] = servicio.nombre;
        }
  
        // Asigna el objeto de mapeo a una propiedad del componente
        this.idServicioToNombre = idServicioToNombre;
      },
      (error: any) => {
        console.error('Error al obtener los servicios:', error);
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

  onRecibidoChange(){
    const selectRecibido = document.getElementById("status_comprobante") as HTMLSelectElement;
    const valorRecibido = selectRecibido.value;
    this.mostrarFechaRecibido = valorRecibido === 'Recibido';
  }

  onSubmit() {
    console.log('Submit button clicked');
    if (this.gastoForm.valid) {
      const nuevoGasto: gastos = {
        id_gasto: '',
        folio_gasto: this.gastoForm.value.folio_gasto,
        cfdi: this.gastoForm.value.cfdi,
        fecha_factura: this.gastoForm.value.fecha_factura,
        id_sucursal: this.gastoForm.value.id_sucursal,
        subtotal: this.gastoForm.value.subtotal,
        iva: this.gastoForm.value.iva,
        isr: this.gastoForm.value.isr,
        ieps: this.gastoForm.value.ieps,
        monto_total: this.gastoForm.value.monto_total,
        metodo_pago: this.gastoForm.value.metodo_pago,
        estado_pago: 'Pendiente',
        detalla_factura_gasto: this.gastoForm.value.detalla_factura_gasto,
        fecha_comprobante: this.gastoForm.value.fecha_comprobante
      };

      console.log('Nuevo gasto:', nuevoGasto);

      this.gastosService.createGasto(nuevoGasto).subscribe(
        (response) => {
          console.log(response);

          this.snackBar.open('Gasto registrado correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

          this.dialogRef.close();
          this.gastosService.notifyGastoCreated(nuevoGasto);
        },
        (error) => {
          console.error(error);
          this.snackBar.open('Error al registrar el gasto', '', {
            duration: 5000,
          });
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
