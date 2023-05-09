import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-cafeteria',
  templateUrl: './dialog-cafeteria.component.html',
  styleUrls: ['./dialog-cafeteria.component.css']
})
export class DialogCafeteriaComponent implements OnInit {
  
  precioValues!: FormGroup;

  FormDialogCafeteria!: FormGroup;

  /* Variables para agregar productos a tabla */
  productosFormPC!: FormGroup;
  @ViewChild('tablaProductos') tablaProductos: any;

  constructor(private _entriesService:ApiRequestService, 
              public dialogRef: MatDialogRef<DialogCafeteriaComponent>,
              private fb: FormBuilder) {
                this.FormDialogCafeteria = new FormGroup({
                  myFormControlName: new FormControl()
                });
                this.precioValues = new FormGroup({
                  IVA: new FormControl(false),
                  Descuento: new FormControl(false)
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
      productosPC: []
    });

    this.productosFormPC = this.fb.group({
      Productos: ['', Validators.required]
    });
  }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }

  agregarProductoPC() {
    if (this.productosFormPC.valid) {
      const producto = this.productosFormPC.value.Productos;
      const fila = this.tablaProductos.nativeElement.insertRow();
      const celda = fila.insertCell();
      celda.innerText = producto;
      this.productosFormPC.reset();
    }
  }

  // Agrega este método
  onDescuentoChange() {
    const descuentoControl = this.precioValues.get('Descuento');
    const descuentoInputControl = this.precioValues.get('descuentoPC');
    if (this.precioValues.controls['Descuento'].value) {
      const descuentoControl = this.precioValues.controls['descuentoPC'];
      if (descuentoControl) {
        descuentoControl.enable();
      }
    }
    
  }

}
