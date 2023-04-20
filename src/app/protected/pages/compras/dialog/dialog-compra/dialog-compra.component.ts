import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { proveedores } from 'src/app/interfaces/interface';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-compra',
  templateUrl: './dialog-compra.component.html',
  styleUrls: ['./dialog-compra.component.css']
})
export class DialogCompraComponent implements OnInit {

/* Variable que contiene los datos de proveedores */
  proveedores: proveedores[] = [];

/* Variables para metodo de pago */
  formulario!: FormGroup;
  mostrarPago: boolean = false;
  mostrarComplemento: boolean = false;
  mostrarFechaPago = false;
  mostrarFormaPago = false;
  mostrarFechaRecibido = false;
  mostrarMonto = false;
  mostrarFechaRecepcion = false;
  mostrarFechaCaducidad = false;

/* Variables para agregar productos a tabla */
  productosForm!: FormGroup;
  @ViewChild('tablaProductos') tablaProductos: any;
  
  constructor(private _entriesService:ApiRequestService, 
              public dialogRef: MatDialogRef<DialogCompraComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerListaProveedores();

    this.formulario = this.fb.group({
      metodoDePago: ['1', Validators.required]
    });
    
    this.productosForm = this.fb.group({
      Productos: ['', Validators.required]
    });
  }

/* Obtener lista de proveedores */
obtenerListaProveedores(){
  this._entriesService.getListaProveedores().subscribe(
    response =>{
      console.log(response);
      this.proveedores = response;
    }
  );
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
  }
  
  onRecepcionChange() {
    const selectRecepcion = document.getElementById("selectRecepcion") as HTMLSelectElement;
    const valorRecepcion = selectRecepcion.value;
    this.mostrarFechaRecepcion = valorRecepcion === 'Recibido';
    this.mostrarFechaCaducidad = valorRecepcion === 'Recibido';
  }

  agregarProducto() {
    if (this.productosForm.valid) {
      const producto = this.productosForm.value.Productos;
      const fila = this.tablaProductos.nativeElement.insertRow();
      const celda = fila.insertCell();
      celda.innerText = producto;
      this.productosForm.reset();
    }
  }
}
