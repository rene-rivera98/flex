import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { GastoService } from 'src/app/protected/services/gasto.service';
import { gastos } from 'src/app/protected/interfaces/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog-editar-gasto',
  templateUrl: './dialog-editar-gasto.component.html',
  styleUrls: ['./dialog-editar-gasto.component.css']
})
export class DialogEditarGastoComponent {

  gastoForm!: FormGroup;
  gasto!: gastos;

  mostrarFechaRecibido = false;
  servicios: any[] = [];
  sucursales: any[] = [];
  i!: number;
  idServicios: string[] = [];
  listaServicios: any[] = [];
  conceptos: string[] = [];
  idServicioToNombre: { [key: string]: string } = {};

  constructor(
    public dialogRef: MatDialogRef<DialogEditarGastoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private gastoService: GastoService,
    private snackBar: MatSnackBar
  ) { 
    this.gasto = data;
    console.log('Datos recibidos:', this.gasto);

    this.gastoForm = this.formBuilder.group({
      folio_gasto: [this.gasto.folio_gasto, [Validators.required]],
      cfdi: [this.gasto.cfdi, [Validators.required]],
      fecha_factura: [this.gasto.fecha_factura, [Validators.required]],
      subtotal: [this.gasto.subtotal, [Validators.required]],
      iva: [this.gasto.iva, [Validators.required]],
      isr: [this.gasto.isr, [Validators.required]],
      ieps: [this.gasto.ieps, [Validators.required]],
      monto_total: [this.gasto.monto_total, [Validators.required]],
      metodo_pago: [this.gasto.metodo_pago, [Validators.required]],
      id_sucursal: [this.gasto.id_sucursal, [Validators.required]],
      fecha_comprobante: [this.gasto.fecha_comprobante],
      detalla_factura_gasto: this.formBuilder.array([]),
      servicios: [],
      concepto: [],
    });

    const serviciosFacturaArray = this.gastoForm.get('detalla_factura_gasto') as FormArray;
    this.gasto.detalla_factura_gasto.forEach((servicio: any) => {
      serviciosFacturaArray.push(this.formBuilder.group(servicio));
      console.log('Array de servicios de factura:', serviciosFacturaArray.value);
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

  actualizarGasto(): void {
    if (this.gastoForm.valid) {
      const idGasto = this.gasto.id_gasto;
      const gastoActualizado = { ...this.gastoForm.value }; // Clonar el objeto
  
      this.gastoService.updatedGasto(idGasto, gastoActualizado).subscribe(
        (response: any) => {
          console.log('Gasto actualizada', response);
          this.snackBar.open('Gasto actualizado correctamente', '', {
            duration: 5000,
            panelClass: ['mat-snack-bar-success'],
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.dialogRef.close();
          this.gastoService.notifyGastoUpdated(gastoActualizado);
        },
        (error: any) => {
          console.error('Error al actualizar el gasto:', error);
          this.snackBar.open('Error al actualizar gasto', '', {
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
