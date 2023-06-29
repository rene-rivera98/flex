import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { servicios } from 'src/app/interfaces/interface';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';
import { ServiciosService } from 'src/app/protected/services/servicios.service';

@Component({
  selector: 'app-dialog-borrar-servicio',
  templateUrl: './dialog-borrar-servicio.component.html',
  styleUrls: ['./dialog-borrar-servicio.component.css']
})
export class DialogBorrarServicioComponent {

  servicio!: servicios;

  constructor(
    public dialogRef: MatDialogRef<DialogBorrarServicioComponent>,
    private apiRequest: ApiRequestService,
    private servicioServices: ServiciosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar) { }

    eliminarServicio(): void {
      const idServicio = this.data.servicio.id_servicio; // Obtén el ID de la sucursal a eliminar
  
      // Realiza la eliminación de la sucursal utilizando el servicio de API
      this.apiRequest.eliminarServicio(idServicio).subscribe(
        () => {
          this.servicioServices.notifyServicioDeleted(this.data); // Notifica que la sucursal ha sido eliminada
  
          // Mostrar una notificación o mensaje de éxito utilizando MatSnackBar
          this.snackBar.open('Servicio eliminado correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
  
          this.dialogRef.close();
        },
        (error) => {
          // Mostrar una notificación o mensaje de error utilizando MatSnackBar
          this.snackBar.open('Error al eliminar el servicio', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
  
          console.error('Error al eliminar el servicio:', error);
          // Maneja el error adecuadamente (puede mostrar un mensaje de error, etc.)
        }
      );
    }

  closeDialog() {
    this.dialogRef.close();
  }
}
