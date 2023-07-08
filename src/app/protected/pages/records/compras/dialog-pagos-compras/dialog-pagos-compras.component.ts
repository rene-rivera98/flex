import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { CompraService } from 'src/app/protected/services/compra.service';
import { complemento_compra, compra_ } from 'src/app/protected/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-pagos-compras',
  templateUrl: './dialog-pagos-compras.component.html',
  styleUrls: ['./dialog-pagos-compras.component.css']
})
export class DialogPagosComprasComponent implements OnDestroy {
  sumaMonto: number = 0; // Variable para almacenar la suma de los montos de los pagos
  montoTotal: number = 0; // Monto total de la compra
  restante: number = 0; // Monto restante por pagar

  pagoForm!: FormGroup; // Formulario para ingresar los datos del pago
  compra!: compra_; // Objeto que representa la compra
  pagos: any[] = []; // Arreglo para almacenar los pagos asociados a la compra

  private httpSubscription: Subscription | undefined; // Suscripción al observable HTTP

  constructor(
    public dialogRef: MatDialogRef<DialogPagosComprasComponent>,
    private complementoService: CompraService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos pasados al diálogo
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    const compraData: compra_ = this.data.compra; // Obtener la compra de los datos
    this.compra = compraData;
    console.log('Datos recibidos:', this.compra);

    const idCompra = compraData.id_compra; // Obtener el ID de la compra
    this.httpSubscription = this.http.get<any>(`${environment.baseUrl}compras/suma/${idCompra}`).subscribe(
      (response: any) => {
        console.log('Datos de suma de pagos:', response);

        this.pagos = response.query; // Asignar los datos de los pagos
        this.sumaMonto = this.pagos.reduce((total: number, pago: any) => total + pago.monto_pago, 0); // Calcular la suma de los montos de los pagos
        this.montoTotal = parseFloat(compraData.monto_total); // Obtener el monto total de la compra
        this.calcularRestante(); // Calcular el monto restante por pagar
      },
      (error: any) => {
        console.error('Error al obtener la suma de pagos:', error);
      }
    );

    this.pagoForm = this.formBuilder.group({
      id_compra: [compraData.id_compra], // Campo oculto para almacenar el ID de la compra
      monto_pago: ['', [Validators.required]], // Campo para ingresar el monto del pago
      forma_pago: ['', [Validators.required]], // Campo para seleccionar la forma de pago
      fecha_pago: ['', [Validators.required]] // Campo para seleccionar la fecha de pago
    });
  }

  calcularRestante() {
    this.restante = this.montoTotal - this.sumaMonto; // Calcular el monto restante por pagar
  }

  onSubmit() {
    console.log('Botón de envío presionado');
    if (this.pagoForm.valid) {
      const nuevoPago: complemento_compra = {
        id_complemento_compra: '',
        id_compra: this.pagoForm.value.id_compra, // Obtener el ID de la compra del formulario
        monto_pago: this.pagoForm.value.monto_pago, // Obtener el monto del pago del formulario
        forma_pago: this.pagoForm.value.forma_pago, // Obtener la forma de pago del formulario
        fecha_pago: this.pagoForm.value.fecha_pago // Obtener la fecha de pago del formulario
      };

      console.log('Nuevo pago:', nuevoPago);

      this.complementoService.createComplemento(nuevoPago).subscribe(
        (response) => {
          console.log(response);

          this.snackBar.open('Pago registrado correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

          this.dialogRef.close(); // Cerrar el diálogo
          this.complementoService.notifyPagoCreated(nuevoPago); // Notificar al servicio que se ha creado un nuevo pago
        },
        (error) => {
          console.error(error);

          this.snackBar.open('Error al registrar el pago', '', {
            duration: 5000,
          });
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close(); // Cerrar el diálogo
  }

  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe(); // Cancelar la suscripción al observable HTTP
    }
  }
}
