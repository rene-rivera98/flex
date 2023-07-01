import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/protected/services/producto.service';
import { productos_activo } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-activo',
  templateUrl: './dialog-activo.component.html',
  styleUrls: ['./dialog-activo.component.css']
})
export class DialogActivoComponent implements OnInit {

  activoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogActivoComponent>,
    private activoService: ProductoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activoForm = this.formBuilder.group({
      codigo: [],
      nombre: [],
      perecedero: [false],
      tipo_egreso: [],
      tipo_producto: []
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('Submit button clicked')
    if (this.activoForm.valid) {
      const nuevoProducto: productos_activo = this.activoForm.value;
      this.activoService.createActivo(nuevoProducto).subscribe(
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
          this.activoService.notifyActivoCreated(nuevoProducto);
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
