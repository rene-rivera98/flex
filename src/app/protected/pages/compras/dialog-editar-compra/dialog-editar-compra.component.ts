import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-editar-compra',
  templateUrl: './dialog-editar-compra.component.html',
  styleUrls: ['./dialog-editar-compra.component.css']
})
export class DialogEditarCompraComponent implements OnInit {
  pagos: any[] = [];
  FormEditarCompra!: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.FormEditarCompra = this.fb.group({
      fechaNuevoMonto: '',
      MontoNuevoPendiente: ''
    });
  }

  ngOnInit(): void {
  }

  agregarPago() {
    const fechaNuevoPago = document.getElementById('fechaNuevoMonto') as HTMLSelectElement;
    const montoNuevoPendiente = document.getElementById('MontoNuevoPendiente') as HTMLSelectElement;

    const pago = {
      fecha: fechaNuevoPago,
      monto: montoNuevoPendiente
    };

    this.pagos.push(pago);
  }

}
