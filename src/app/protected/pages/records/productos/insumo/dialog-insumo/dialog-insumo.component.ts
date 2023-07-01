import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/protected/services/producto.service';
import { producto_insumo } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-insumo',
  templateUrl: './dialog-insumo.component.html',
  styleUrls: ['./dialog-insumo.component.css']
})
export class DialogInsumoComponent implements OnInit {

  insumoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogInsumoComponent>,
    private insumoService: ProductoService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.insumoForm = this.formBuilder.group({
      codigo: [],
      nombre: [],
      cantidad: [],
      unidad_medida: [],
      perecedero: [false],
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
      this.insumoService.createInsumo(nuevoProducto).subscribe(
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
          this.insumoService.notifyInsumoCreated(nuevoProducto);
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