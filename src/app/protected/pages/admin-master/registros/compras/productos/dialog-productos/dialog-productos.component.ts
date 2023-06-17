import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-productos',
  templateUrl: './dialog-productos.component.html',
  styleUrls: ['./dialog-productos.component.css']
})
export class DialogProductosComponent implements OnInit {

  FormDialogProducto!: FormGroup;

  formulario!: FormGroup;
  mostrarTalla = false;
  mostrarMedida = false;
  constructor(private _entriesService:ApiRequestService,
              public dialogRef: MatDialogRef<DialogProductosComponent>,
              private fb: FormBuilder) { 
                this.FormDialogProducto = new FormGroup({
                  myFormControlName: new FormControl()
                });
              }

  ngOnInit(): void {
    this.FormDialogProducto = this.fb.group({
      codigoProducto: [],
      NombreProducto: [],
      areaProducto: [],
      medidaProducto: [],
      tallaProducto: []
    });

    this.formulario = this.fb.group({
      areaProducto: [],
      medidaProducto: [],
      tallaProducto: []
    });
  }

  /* CLASIFICAICION AREA*/
  onChangeArea() {
    const clasifArea = this.formulario?.get('areaProducto')?.value;
    if (clasifArea === "FrontDesk") {
      this.mostrarTalla = true;
      this.mostrarMedida = false;
      console.log('FrontDesk');
    } else if (clasifArea === "Cafeteria") {
      this.mostrarTalla = false;
      this.mostrarMedida = true;
      console.log('Cafeteria');
    }
  }

    /* FUNCION CERRAR DIALOG*/
    closeDialog() {
      this.dialogRef.close();
    }
    

}
