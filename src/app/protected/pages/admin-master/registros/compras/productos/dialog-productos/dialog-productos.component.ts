import { Component, OnInit, ViewChild } from '@angular/core';
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

  insumosForm!: FormGroup;

  formulario!: FormGroup;
  mostrar_codigo = false;
  mostrar_nombre = false;
  mostrar_area = false;
  mostrar_cantidad = false;
  mostrar_unidad = false;
  mostrar_talla = false;
  mostrar_receta = false;
  mostrar_precio = false;
  mostrar_egreso = false;
  mostrar_botones = false;
  mostrar_insumo = false;
  mostrar_checkbox_receta = false;

  @ViewChild('tabla_receta', { static: false }) tabla_receta: any;


  constructor(private _entriesService:ApiRequestService,
              public dialogRef: MatDialogRef<DialogProductosComponent>,
              private fb: FormBuilder) { 
                this.FormDialogProducto = new FormGroup({
                  myFormControlName: new FormControl()
                });
              }

  ngOnInit(): void {

    this.FormDialogProducto = this.fb.group({

      tipoProducto: [],
      Codigo:[],
      NombreProducto: [],
      areaProducto: [],
      cantidadProducto: [],
      unidad_medida: [],
      Talla: [],
      precio: [],
      tipoEgreso: [],
      Insumos: [],
      valueReceta: []

    });

  }

  /* METODO DE PAGO*/
  onTipo_Producto() {
    const tipo = this.FormDialogProducto?.get('tipoProducto')?.value;
    
    if (tipo === "Insumo") {
      this.mostrar_codigo = true;
      this.mostrar_nombre = true;
      this.mostrar_cantidad = true;
      this.mostrar_unidad = true;
      this.mostrar_talla = true;
      this.mostrar_egreso = true;

      this.mostrar_area = false;
      this.mostrar_insumo = false;
      this.mostrar_precio = false;
      this.mostrar_botones = false;
      this.mostrar_receta = false;
      this.mostrar_checkbox_receta = false;
      console.log('Insumos');

    } else if (tipo === "Venta") {

        this.mostrar_codigo = true;
        this.mostrar_area = true;
        this.mostrar_nombre = true;
        this.mostrar_unidad = true;
        this.mostrar_talla = true;
        this.mostrar_precio = true;
        this.mostrar_egreso = true;
        this.mostrar_checkbox_receta = true;
        this.mostrar_insumo = false;

        const checkboxReceta = this.FormDialogProducto.get('valueReceta');

        if (checkboxReceta) {
          checkboxReceta.valueChanges.subscribe((value) => {
            if (value) {
              // Si el checkbox está marcado, mostrar el campo de entrada "mostrar_insumo"
              this.mostrar_insumo = true;
            } else {
              // Si el checkbox no está marcado, ocultar el campo de entrada "mostrar_insumo"
              this.mostrar_insumo = false;
            }
          });
        }
      
        console.log('Venta');


    } else if(tipo === "Activo"){
      this.mostrar_codigo = true;
      this.mostrar_nombre = true;
      this.mostrar_egreso = true;

      this.mostrar_cantidad = false;
      this.mostrar_talla = false;
      this.mostrar_area = false;
      this.mostrar_precio = false;
      this.mostrar_unidad = false;
      this.mostrar_insumo = false;
      this.mostrar_botones = false;
      this.mostrar_receta = false;
      this.mostrar_checkbox_receta = false;
      console.log('Activo')
    }
  }

  agregarProducto() {
    if (this.insumosForm.valid) {
      const insumo = this.insumosForm.value.Insumos;
      const fila = this.tabla_receta.nativeElement.insertRow();
      const celda = fila.insertCell();
      celda.innerText = insumo;
      this.insumosForm.reset();
    }
  }

  eliminarUltimaFila() {
    const tabla = this.tabla_receta.nativeElement;
    const filas = tabla.rows;
    if (filas.length > 1) {
      tabla.deleteRow(filas.length - 1);
    }
  }

    /* FUNCION CERRAR DIALOG*/
    closeDialog() {
      this.dialogRef.close();
    }
    

}
