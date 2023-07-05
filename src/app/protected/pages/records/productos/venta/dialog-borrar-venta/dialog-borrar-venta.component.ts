import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { producto_venta } from 'src/app/protected/interfaces/interfaces';
import { ProductoService } from 'src/app/protected/services/producto.service';

@Component({
  selector: 'app-dialog-borrar-venta',
  templateUrl: './dialog-borrar-venta.component.html',
  styleUrls: ['./dialog-borrar-venta.component.css']
})
export class DialogBorrarVentaComponent {

  venta!: producto_venta;

  constructor(
    public dialogRef: MatDialogRef<DialogBorrarVentaComponent>,
    private productoService: ProductoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) { }

  eliminarProducto(): void {
    const idProducto = this.data.venta.id_producto; // Obtén el ID de la sucursal a eliminar

    // Realiza la eliminación de la sucursal utilizando el servicio de API
    this.productoService.desactivedProducto(idProducto).subscribe(
      () => {
        this.productoService.notifyVentaDeleted(this.data); // Notifica que la sucursal ha sido eliminada

        // Mostrar una notificación o mensaje de éxito utilizando MatSnackBar
        this.snackBar.open('Producto eliminado correctamente', '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });

        this.dialogRef.close();
      },
      (error) => {
        // Mostrar una notificación o mensaje de error utilizando MatSnackBar
        this.snackBar.open('Error al eliminar el producto', '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });

        console.error('Error al eliminar el producto:', error);
        // Maneja el error adecuadamente (puede mostrar un mensaje de error, etc.)
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
