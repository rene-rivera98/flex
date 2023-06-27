import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sucursal } from 'src/app/interfaces/interface';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';
import { SucursalesService } from 'src/app/protected/services/sucursales.service';

@Component({
  selector: 'app-dialog-borrar-sucursal',
  templateUrl: './dialog-borrar-sucursal.component.html',
  styleUrls: ['./dialog-borrar-sucursal.component.css']
})
export class DialogBorrarSucursalComponent {
  sucursal!: sucursal;

  constructor(
    public dialogRef: MatDialogRef<DialogBorrarSucursalComponent>,
    private apiRequest: ApiRequestService,
    private sucursalService: SucursalesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  eliminarSucursal(): void {
    const idSucursal = this.data.sucursal.id_sucursal; // Obtén el ID de la sucursal a eliminar

    // Realiza la eliminación de la sucursal utilizando el servicio de API
    this.apiRequest.eliminarSucursal(idSucursal).subscribe(
      () => {
        this.sucursalService.notifySucursalDeleted(this.data); // Notifica que la sucursal ha sido eliminada

        // Mostrar una notificación o mensaje de éxito utilizando MatSnackBar
        this.snackBar.open('Sucursal eliminada correctamente', '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });

        this.dialogRef.close();
      },
      (error) => {
        // Mostrar una notificación o mensaje de error utilizando MatSnackBar
        this.snackBar.open('Error al eliminar la sucursal', '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });

        console.error('Error al eliminar la sucursal:', error);
        // Maneja el error adecuadamente (puede mostrar un mensaje de error, etc.)
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
