import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { proveedores } from 'src/app/protected/interfaces/interfaces';
import { ProveedorService } from 'src/app/protected/services/proveedor.service';
@Component({
  selector: 'app-dialog-borrar-proveedores',
  templateUrl: './dialog-borrar-proveedores.component.html',
  styleUrls: ['./dialog-borrar-proveedores.component.css']
})
export class DialogBorrarProveedoresComponent {

  proveedor!: proveedores;

  constructor(
    public dialogRef: MatDialogRef<DialogBorrarProveedoresComponent>,
    private proveedorService: ProveedorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar) { }


    eliminarProveedor(): void {
      const idProveedor = this.data.proveedor.id_proveedor; // Obtén el ID de la sucursal a eliminar
  
      // Realiza la eliminación de la sucursal utilizando el servicio de API
      this.proveedorService.deletedProveedor(idProveedor).subscribe(
        () => {
          this.proveedorService.notifyProveedorDeleted(this.data); // Notifica que la sucursal ha sido eliminada
  
          // Mostrar una notificación o mensaje de éxito utilizando MatSnackBar
          this.snackBar.open('Proveedor eliminada correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
  
          this.dialogRef.close();
        },
        (error) => {
          // Mostrar una notificación o mensaje de error utilizando MatSnackBar
          this.snackBar.open('Error al eliminar el proveedor', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
  
          console.error('Error al eliminar el proveedor:', error);
          // Maneja el error adecuadamente (puede mostrar un mensaje de error, etc.)
        }
      );
    }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }


}

