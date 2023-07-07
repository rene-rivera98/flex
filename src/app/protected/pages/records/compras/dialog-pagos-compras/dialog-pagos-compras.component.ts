import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CompraService } from 'src/app/protected/services/compra.service';
import { complemento_compra, compra_ } from 'src/app/protected/interfaces/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-pagos-compras',
  templateUrl: './dialog-pagos-compras.component.html',
  styleUrls: ['./dialog-pagos-compras.component.css']
})
export class DialogPagosComprasComponent {

  sumaMonto: number = 0;
  montoTotal: number = 0;
  restante: number = 0;

  pagoForm!: FormGroup;
  compra!: compra_;
  pagos: any[] =[];
  constructor(
    public dialogRef: MatDialogRef<DialogPagosComprasComponent>,
    private complementoService: CompraService,
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {

    this.compra = data;
    console.log('Datoa recibidos:', this.compra);
    this.pagoForm = this.formBuilder.group({
      id_compra: [this.data.compra.id_compra],
      monto_pago: ['', [Validators.required]],
      forma_pago: ['', [Validators.required]],
      fecha_pago: ['', [Validators.required]]
    });


        // Obtener los datos de la suma de pagos
      const idCompra = this.data.compra.id_compra;
      this.http.get<any>(`${environment.baseUrl}compras/suma/${idCompra}`).subscribe(
        (response: any) => {
          console.log('Datos de suma de pagos:', response);

          // Asignar los datos al arreglo pagos
          this.pagos = response.query;

          this.sumaMonto = this.pagos.reduce((total: number, pago: any) => total + pago.monto_pago, 0);
          this.montoTotal = this.data.compra.monto_total;
          this.calcularRestante();
        },
        (error: any) => {
          console.error('Error al obtener la suma de pagos:', error);
        }
      );
   }

   calcularRestante() {
    this.restante = this.montoTotal - this.sumaMonto;
  }
   
   onSubmit() {
    console.log('Submit button clicked');
    if (this.pagoForm.valid) {
      const nuevoPago: complemento_compra = {
        id_complemento_compra: '',
        id_compra: this.pagoForm.value.id_compra,
        monto_pago: this.pagoForm.value.monto_pago,
        forma_pago: this.pagoForm.value.forma_pago,
        fecha_pago: this.pagoForm.value.fecha_pago
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

          this.dialogRef.close();
          this.complementoService.notifyPagoCreated(nuevoPago);
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
      this.dialogRef.close();
    }

}
