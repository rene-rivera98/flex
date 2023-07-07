import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { producto_insumo } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/protected/services/producto.service';

@Component({
  selector: 'app-dialog-editar-insumo',
  templateUrl: './dialog-editar-insumo.component.html',
  styleUrls: ['./dialog-editar-insumo.component.css']
})
export class DialogEditarInsumoComponent {

  insumoForm!: FormGroup;
  insumo!: producto_insumo;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarInsumoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private insumoService : ProductoService,
    private snackBar: MatSnackBar) {

      this.insumo = data; // Asignar los datos del elemento seleccionado a la variable 'sucursal'
      console.log('Datos recibidos:', this.insumo);

      this.insumoForm = this.formBuilder.group({
        codigo: [this.insumo.codigo, [Validators.required]],
        nombre: [this.insumo.nombre, [Validators.required]],
        unidad_medida: [this.insumo.unidad_medida, [Validators.required]],
        perecedero: [this.insumo.perecedero],
        tipo_egreso: [this.insumo.tipo_egreso, [Validators.required]],
        tipo_producto: [this.insumo.tipo_producto],
        cantidad: [this.insumo.cantidad]
      });
    }

    closeDialog() {
      this.dialogRef.close();
    }

    actualizarProducto(): void {
      if (this.insumoForm.valid) {
        // Obtener el id_proveedor de this.sucursal o desde donde lo obtengas en tu código
        const idProducto = this.insumo.id_producto;
        const productoActualizado = this.insumoForm.value;
  
        // Llamar al servicio de API para actualizar la sucursal
        this.insumoService.updatedInsumo(idProducto, productoActualizado).subscribe(
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
            this.insumoService.notifyInsumoUpdated(productoActualizado);
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

