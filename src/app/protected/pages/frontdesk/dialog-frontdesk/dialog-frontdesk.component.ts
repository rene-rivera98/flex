import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-frontdesk',
  templateUrl: './dialog-frontdesk.component.html',
  styleUrls: ['./dialog-frontdesk.component.css']
})
export class DialogFrontDeskComponent implements OnInit {
  
  precioValues!: FormGroup;
  descuentoActivo: boolean = false;
  FormDialogFrontDesk!: FormGroup;

  /* Variables para agregar productos a tabla */
  productosFormPF!: FormGroup;
  @ViewChild('tablaProductos', { static: false }) tablaProductos: any;

  constructor(private _entriesService:ApiRequestService, 
              public dialogRef: MatDialogRef<DialogFrontDeskComponent>,
              private fb: FormBuilder) {

                this.FormDialogFrontDesk = new FormGroup({
                  myFormControlName: new FormControl()
                });
              }

  ngOnInit(): void {
    this.FormDialogFrontDesk = this.fb.group({
      clasificacionPF: ['', Validators.required],
      codigoPF: ['', Validators.required],
      nombrePF: ['', Validators.required],
      minPersonas: [],
      maxPersonas: [],
      descripcionPF: [],
      productosPF: [],
      precioPF: [],
      IVA:[],
      IEPS:[],
      precioFinalPF: []
    });

    this.productosFormPF = this.fb.group({
      productosPF: ['', Validators.required]
    });

  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

  agregarProductoPC() {
    if (this.productosFormPF.valid) {
      const producto = this.productosFormPF.value.productosPF;
      const fila = this.tablaProductos.nativeElement.insertRow();
      const celda = fila.insertCell();
      celda.innerText = producto;
      this.productosFormPF.reset();
    }
  }

  eliminarUltimaFila() {
      const tabla = this.tablaProductos.nativeElement;
      const filas = tabla.rows;
      if (filas.length > 1) {
        tabla.deleteRow(filas.length - 1);
      }
  }
    

}
