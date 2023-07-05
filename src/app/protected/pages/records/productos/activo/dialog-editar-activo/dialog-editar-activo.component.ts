import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { productos_activo } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/protected/services/producto.service';

@Component({
  selector: 'app-dialog-editar-activo',
  templateUrl: './dialog-editar-activo.component.html',
  styleUrls: ['./dialog-editar-activo.component.css']
})
export class DialogEditarActivoComponent {

  activoForm!: FormGroup;
  activo!: productos_activo;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarActivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private activoService : ProductoService,
    private snackBar: MatSnackBar
  ) {

    this.activo = data;
    console.log('Datos recibidos:', this.activo);

    this.activoForm = this.formBuilder.group({
      codigo: [this.activo.codigo,[Validators.required]],
      nombre: [this.activo.nombre, [Validators.required]],
      perecedero: [this.activo.perecedero],
      tipo_egreso: [this.activo.tipo_egreso, [Validators.required]]
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  actualizarProducto(): void {
    if (this.activoForm.valid) {
      // Obtener el id_proveedor de this.sucursal o desde donde lo obtengas en tu código
      const idProducto = this.activo.id_producto;
      const productoActualizado = this.activoForm.value;

      // Llamar al servicio de API para actualizar la sucursal
      this.activoService.updatedActivo(idProducto, productoActualizado).subscribe(
        (response: any) => {
          console.log('Producto actualizado', response);
          // Mostrar una notificación o mensaje de éxito utilizando MatSnackBar
          this.snackBar.open('Producto actualizado correctamente', '', {
            duration: 5000,
            panelClass: ['mat-snack-bar-success'], // Clase personalizada para el estilo de éxito
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          // Cerrar el diálogo
          this.dialogRef.close();

          // Notificar a través del servicio SucursalesService que la sucursal ha sido actualizada
          this.activoService.notifyActivoUpdated(productoActualizado);
        },
        (error: any) => {
          console.error('Error al actualizar el producto:', error);
          // Mostrar una notificación o mensaje de error utilizando MatSnackBar
          this.snackBar.open('Error al actualizar producto', '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['mat-snack-bar-error'], // Clase personalizada para el estilo de error
            horizontalPosition: 'end'
          });
        }
      );
    }
  }

}
