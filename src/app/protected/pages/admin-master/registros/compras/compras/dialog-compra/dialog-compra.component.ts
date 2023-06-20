import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-compra',
  templateUrl: './dialog-compra.component.html',
  styleUrls: ['./dialog-compra.component.css']
})
export class DialogCompraComponent implements OnInit {

  FormDialogCompra!: FormGroup;

  formulario!: FormGroup;

  mostrarPago: boolean = false;

  mostrarComplemento: boolean = false;

  mostrarFechaPago = false;

  mostrarFormaPago = false;

  mostrarFechaRecibido = false;

  mostrarMonto = false;

  mostrarFechaRecepcion = false;

  mostrarFechaPagoPendiente = false;

  mostrarMontoPendiente = false;

  mostrarPagoInsoluto = false;

/* Variables para clasificacion */
  formularioClasif!: FormGroup;

/* Variables para agregar productos a tabla */
  productosForm!: FormGroup;



/* TABLA: LISTA DE COMPRA*/
  @ViewChild('tablaCompras', { static: false }) tablaCompras: any;

  constructor(private _entriesService:ApiRequestService, 
              public dialogRef: MatDialogRef<DialogCompraComponent>,
              private fb: FormBuilder) { 
                this.FormDialogCompra = new FormGroup({
                  myFormControlName: new FormControl()
                });
              }

  ngOnInit(): void {
    
    this.FormDialogCompra = this.fb.group({
      Proveedor: [],
      Productos: [],
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
      Recepción: [],
      FechaRecepción: [],
      Sucursal: [],
      TipoEgreso: []
    });

    this.formulario = this.fb.group({
      metodoDePago: []
    });
    
    this.productosForm = this.fb.group({
      Productos: []
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
    const valorComplemento = selectComplemento.value;
    this.mostrarFechaRecibido = valorComplemento === 'Finalizado';
    this.mostrarMonto = valorComplemento === 'Finalizado';
    this.mostrarFechaPagoPendiente = valorComplemento === 'Pendiente';
    this.mostrarMontoPendiente = valorComplemento === 'Pendiente';
    this.mostrarPagoInsoluto = valorComplemento == 'Pendiente';
  }
  
  onRecepcionChange() {
    const selectRecepcion = document.getElementById("status_recepcion") as HTMLSelectElement;
    const valorRecepcion = selectRecepcion.value;
    this.mostrarFechaRecepcion = valorRecepcion === 'Recibido';
  }


  agregarProducto() {
    if (this.productosForm.valid) {
      const producto = this.productosForm.value.Productos;
      const fila = this.tablaCompras.nativeElement.insertRow();
      const celda = fila.insertCell();
      celda.innerText = producto;
      this.productosForm.reset();
    }
  }

  eliminarUltimaFila() {
    const tabla = this.tablaCompras.nativeElement;
    const filas = tabla.rows;
    if (filas.length > 1) {
      tabla.deleteRow(filas.length - 1);
    }
  }


}