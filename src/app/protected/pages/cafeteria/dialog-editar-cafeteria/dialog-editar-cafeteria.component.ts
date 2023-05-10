import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-editar-cafeteria',
  templateUrl: './dialog-editar-cafeteria.component.html',
  styleUrls: ['./dialog-editar-cafeteria.component.css']
})
export class DialogEditarCafeteriaComponent implements OnInit {

  FormDialogCafeteriaEd!: FormGroup;

  /* Variables para agregar insumos a tabla */
  recetaFormPCEd!: FormGroup;
  @ViewChild('tablaInsumosEd', { static: false }) tablaInsumosEd: any;

  constructor(private _entriesService:ApiRequestService, 
              public dialogRef: MatDialogRef<DialogEditarCafeteriaComponent>,
              private fb: FormBuilder) {

                this.FormDialogCafeteriaEd = new FormGroup({
                  myFormControlName: new FormControl()
                });
              }

  ngOnInit(): void {
    this.FormDialogCafeteriaEd= this.fb.group({
      nombrePCEd: ['', Validators.required],
      descripcionPCEd: [],
      insumosPCEd: [],
      IVAEd: [],
      IEPSEd:[],
      precioPCEd: [],
      precioFinalPCEd: []
    });

    this.recetaFormPCEd = this.fb.group({
      insumosPCEd: ['', Validators.required]
    });
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

  agregarInsumosPCEd() {
    if (this.recetaFormPCEd.valid) {
      const producto = this.recetaFormPCEd.value.insumosPC;
      const fila = this.tablaInsumosEd.nativeElement.insertRow();
      const celda = fila.insertCell();
      celda.innerText = producto;
      this.recetaFormPCEd.reset();
    }
  }

  eliminarUltimaFilaEd() {
    const tabla = this.tablaInsumosEd.nativeElement;
    const filas = tabla.rows;
    if (filas.length > 1) {
      tabla.deleteRow(filas.length - 1);
    }
  }

}
