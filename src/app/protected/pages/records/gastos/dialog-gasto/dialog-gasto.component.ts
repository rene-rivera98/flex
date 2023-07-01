import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GastoService } from 'src/app/protected/services/gasto.service';

@Component({
  selector: 'app-dialog-gasto',
  templateUrl: './dialog-gasto.component.html',
  styleUrls: ['./dialog-gasto.component.css']
})
export class DialogGastoComponent implements OnInit {

  FormDialogGasto!: FormGroup;

  formulario!: FormGroup;
  
  mostrarPago: boolean = false;

  mostrarComplemento: boolean = false;

  mostrarFechaPago = false;

  mostrarFormaPago = false;

  mostrarMonto = false;

  mostrarFechaPagoPendiente = false;

  mostrarMontoPendiente = false;

  mostrarPagoInsoluto = false;

  serviciosForm!: FormGroup;
  
  @ViewChild('tablaGastos', { static: false }) tablaGastos: any;

  constructor(
    private gastosService:GastoService, 
    public dialogRef: MatDialogRef<DialogGastoComponent>,
    private fb: FormBuilder) { 
      this.FormDialogGasto = new FormGroup({
        myFormControlName: new FormControl()
      });
    }

  ngOnInit(): void {

    this.FormDialogGasto = this.fb.group({
      Servicios: [],
      Folio: [],
      UsoCFDI: [],
      Fechafactura: [],
      Subtotal: ['', [Validators.pattern(/^\d+$/)]],
      IVA: [],
      ISR: [],
      IEPS: [],
      Total: [],
      metodoDePago: [],
      Pago: [],
      FechaPago: [],
      FormaPago: [],
      ComplementoPago: [],
      FechaRecibido: [],
      Monto: [],
      Sucursal: [],
      TipoEgreso: []
    });

    this.formulario = this.fb.group({
      metodoDePago: []
    });

    this.serviciosForm = this.fb.group({
      Servicios: []
    });

  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

  /* METODO DE PAGO*/
  onChangeMetodoDePago() {
    const metodoDePago = this.formulario?.get('metodoDePago')?.value;
    if (metodoDePago === "Pago en una exhibición (PUE)") {
      this.mostrarPago = true;
      this.mostrarComplemento = false;
      console.log('Pago');
    } else if (metodoDePago === "Pago diferido (PPD)") {
      this.mostrarPago = false;
      this.mostrarComplemento = true;
      console.log('Complemento');
    }
  }

  onPagoChange() {
    const selectPago = document.getElementById("selectPago") as HTMLSelectElement;
    const valorPago = selectPago.value;
    this.mostrarFechaPago = valorPago === 'Pagado';
    this.mostrarFormaPago = valorPago === 'Pagado';
  }

  onComplementoChange() {
    const selectComplemento = document.getElementById("selectComplementoPago") as HTMLSelectElement;
    const valorComplemento = selectComplemento.value;this.mostrarMonto = valorComplemento === 'Finalizado';
    this.mostrarFechaPagoPendiente = valorComplemento === 'Pendiente';
    this.mostrarMontoPendiente = valorComplemento === 'Pendiente';
    this.mostrarPagoInsoluto = valorComplemento == 'Pendiente';
  }

  agregarProducto() {
    if (this.serviciosForm.valid) {
      const producto = this.serviciosForm.value.Productos;
      const fila = this.tablaGastos.nativeElement.insertRow();
      const celda = fila.insertCell();
      celda.innerText = producto;
      this.serviciosForm.reset();
    }
  }

  eliminarUltimaFila() {
    const tabla = this.tablaGastos.nativeElement;
    const filas = tabla.rows;
    if (filas.length > 1) {
      tabla.deleteRow(filas.length - 1);
    }
  }
}
