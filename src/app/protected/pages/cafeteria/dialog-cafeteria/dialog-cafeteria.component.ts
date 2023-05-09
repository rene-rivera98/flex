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
  
  precioValues!: FormGroup;
  descuentoActivo: boolean = false;
  FormDialogCafeteria!: FormGroup;

  /* Variables para agregar productos a tabla */
  productosFormPC!: FormGroup;
  @ViewChild('tablaProductos', { static: false }) tablaProductos: any;

  constructor(private _entriesService:ApiRequestService, 
              public dialogRef: MatDialogRef<DialogCafeteriaComponent>,
              private fb: FormBuilder) {
                this.FormDialogCafeteria = new FormGroup({
                  myFormControlName: new FormControl()
                });
                this.precioValues = new FormGroup({
                  IVA: new FormControl(false),
                  Descuento: new FormControl(false),
                  'descuentoPC': new FormControl({ value: null, disabled: true })
                });
              }

  ngOnInit(): void {
    this.FormDialogCafeteria = this.fb.group({
      clasificacionPC: ['', Validators.required],
      codigoPC: ['', Validators.required],
      nombrePC: ['', Validators.required],
      minPersonas: [],
      maxPersonas: [],
      descripcionPC: [],
      productosPC: [],
      precioPC: [],
      descuentoPC: [],
      precioFinalPC: []
    });

    this.productosFormPC = this.fb.group({
      productosPC: ['', Validators.required]
    });

  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

  agregarProductoPC() {
    if (this.productosFormPC.valid) {
      const producto = this.productosFormPC.value.productosPC;
      const fila = this.tablaProductos.nativeElement.insertRow();
      const celda = fila.insertCell();
      celda.innerText = producto;
      this.productosFormPC.reset();
    }
  }

  onDescuentoChange() {
    const descuentoCheckbox = this.precioValues.get('Descuento');
    const descuentoInput = this.precioValues.get('descuentoPC');

    if (descuentoCheckbox?.value) {
      descuentoInput?.enable();
    } else {
      descuentoInput?.disable();
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
