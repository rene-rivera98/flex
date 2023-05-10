import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-cafeteria',
  templateUrl: './dialog-cafeteria.component.html',
  styleUrls: ['./dialog-cafeteria.component.css']
})
export class DialogCafeteriaComponent implements OnInit {

  FormDialogCafeteria!: FormGroup;

   /* Variables para agregar insumos a tabla */
   recetaFormPC!: FormGroup;
   @ViewChild('tablaInsumos', { static: false }) tablaInsumos: any;

   
  constructor(private _entriesService:ApiRequestService, 
              public dialogRef: MatDialogRef<DialogCafeteriaComponent>,
              private fb: FormBuilder) {

                this.FormDialogCafeteria = new FormGroup({
                  myFormControlName: new FormControl()
                });

               }

  ngOnInit(): void {
    this.FormDialogCafeteria = this.fb.group({
      codigoPC: ['', Validators.required],
      nombrePC: ['', Validators.required],
      descripcionPC: [],
      insumosPC: [],
      IVA: [],
      IPES:[],
      precioPC: [],
      precioFinalPC: []
    });

    this.recetaFormPC = this.fb.group({
      insumosPC: ['', Validators.required]
    });
  }

  agregarInsumosPC() {
    if (this.recetaFormPC.valid) {
      const producto = this.recetaFormPC.value.insumosPC;
      const fila = this.tablaInsumos.nativeElement.insertRow();
      const celda = fila.insertCell();
      celda.innerText = producto;
      this.recetaFormPC.reset();
    }
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

  eliminarUltimaFila() {
    const tabla = this.tablaInsumos.nativeElement;
    const filas = tabla.rows;
    if (filas.length > 1) {
      tabla.deleteRow(filas.length - 1);
    }
  }

}
