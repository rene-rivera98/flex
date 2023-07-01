import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CompraService } from 'src/app/protected/services/compra.service';
@Component({
  selector: 'app-dialog-editar-compra',
  templateUrl: './dialog-editar-compra.component.html',
  styleUrls: ['./dialog-editar-compra.component.css']
})
export class DialogEditarCompraComponent implements OnInit {
  pagos: any[] = [];
  FormEditarCompra!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogEditarCompraComponent>,
    private fb: FormBuilder) { 
    this.FormEditarCompra = this.fb.group({
      fechaNuevoMonto: [''],
      MontoNuevoPendiente: ['']
    });
  }

  ngOnInit(): void {
  }

    /* FUNCION CERRAR DIALOG*/
    closeDialog() {
      this.dialogRef.close();
    }

  agregarPago() {
    const fechaNuevoPago = this.FormEditarCompra?.get('fechaNuevoMonto')?.value;
    const montoNuevoPendiente = this.FormEditarCompra?.get('MontoNuevoPendiente')?.value;
    const nuevoPago = { fecha: fechaNuevoPago, monto: montoNuevoPendiente };
    this.pagos.push(nuevoPago);
  }

}
