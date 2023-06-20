import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-editar-frontdesk',
  templateUrl: './dialog-editar-frontdesk.component.html',
  styleUrls: ['./dialog-editar-frontdesk.component.css']
})
export class DialogEditarFrontDeskComponent implements OnInit {

  precioValuesEd!: FormGroup;
  FormDialogFrontDeskEd!: FormGroup;

  /* Variables para agregar productos a tabla */
  productosFormPCEd!: FormGroup;
  @ViewChild('tablaProductosEd', { static: false }) tablaProductosEd: any;

  constructor(private _entriesService:ApiRequestService, 
              public dialogRef: MatDialogRef<DialogEditarFrontDeskComponent>,
              private fb: FormBuilder) {
                this.FormDialogFrontDeskEd = new FormGroup({
                  myFormControlName: new FormControl()
                });
              }

  ngOnInit(): void {
    this.FormDialogFrontDeskEd = this.fb.group({
      clasificacionPCEd: ['', Validators.required],
      nombrePCEd: ['', Validators.required],
      minPersonasEd: [],
      maxPersonasEd: [],
      descripcionPCEd: [],
      productosPCEd: [],
      precioPCEd: [],
      IVAEd: [],
      IEPSEd: [],
      precioFinalPCEd: []
    });

    this.productosFormPCEd = this.fb.group({
      productosPCEd: ['', Validators.required]
    });

  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

  agregarProductoPCEd() {
    if (this.productosFormPCEd.valid) {
      const producto = this.productosFormPCEd.value.productosPC;
      const fila = this.tablaProductosEd.nativeElement.insertRow();
      const celda = fila.insertCell();
      celda.innerText = producto;
      this.productosFormPCEd.reset();
    }
  }
  
  eliminarUltimaFilaEd() {
    const tabla = this.tablaProductosEd.nativeElement;
    const filas = tabla.rows;
    if (filas.length > 1) {
      tabla.deleteRow(filas.length - 1);
    }
}

}