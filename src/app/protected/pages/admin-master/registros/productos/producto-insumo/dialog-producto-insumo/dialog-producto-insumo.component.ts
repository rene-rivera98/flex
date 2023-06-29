import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductosService } from 'src/app/protected/services/productos.service';
import { producto_insumo } from 'src/app/interfaces/interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-producto-insumo',
  templateUrl: './dialog-producto-insumo.component.html',
  styleUrls: ['./dialog-producto-insumo.component.css']
})

export class DialogProductoInsumoComponent implements OnInit {

  insumoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogProductoInsumoComponent>,
    private productoService: ProductosService,
    private apiRequest: ApiRequestService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.insumoForm = this.formBuilder.group({
      codigo: [],
      nombre: [],
      cantidad: [],
      unidad_medida: [],
      perecedero: [],
      tipo_egreso: [],
      tipo_producto: new FormControl('Insumo')
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('Submit button clicked')
    if (this.insumoForm.valid) {
      const nuevoProducto: producto_insumo = this.insumoForm.value;
      this.apiRequest.createProducto(nuevoProducto).subscribe(
        (response) => {
          // Sucursal creada con éxito
          console.log(response);

          this.snackBar.open('Producto registrado correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

          this.dialogRef.close();
  
          // Notificar a SucursalesComponent que se ha creado una nueva sucursal
          this.productoService.notifyInsumoCreated(nuevoProducto);
        },
        (error) => {
          // Error al crear la sucursal
          console.error(error);
          this.snackBar.open('Error al registrar el producto', 'Cerrar', {
            duration: 5000,
          });
        }
      );
    }
  }

}
