import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { servicios } from 'src/app/protected/interfaces/interfaces';
import { ServicioService } from 'src/app/protected/services/servicio.service';

@Component({
  selector: 'app-dialog-editar-servicio',
  templateUrl: './dialog-editar-servicio.component.html',
  styleUrls: ['./dialog-editar-servicio.component.css']
})
export class DialogEditarServicioComponent {

  servicioForm!: FormGroup;
  servicio!: servicios;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private serviciosService: ServicioService,
    private snackBar: MatSnackBar) {

      this.servicio = data; // Asignar los datos del elemento seleccionado a la variable 'sucursal'
      console.log('Datos recibidos:', this.servicio); // Agregar este console.log

      this.servicioForm = this.formBuilder.group({
        nombre:[this.servicio.nombre],
        tipo_egreso:[this.servicio.tipo_egreso]
      })
    }

    actualizarServicio(): void {
      if (this.servicioForm.valid) {
        // Obtener el id_sucursal de this.sucursal o desde donde lo obtengas en tu código
        const id_servicio = this.servicio.id_servicio;
        const servicioActualizado = this.servicioForm.value;
  
        // Llamar al servicio de API para actualizar la sucursal
        this.serviciosService.updatedServicio(id_servicio, servicioActualizado).subscribe(
          (response: any) => {
            console.log('Servicio actualizada:', response);
            // Mostrar una notificación o mensaje de éxito utilizando MatSnackBar
            this.snackBar.open('Servicio actualizado correctamente', '', {
              duration: 5000,
              panelClass: ['mat-snack-bar-success'], // Clase personalizada para el estilo de éxito
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            // Cerrar el diálogo
            this.dialogRef.close();
  
            // Notificar a través del servicio SucursalesService que la sucursal ha sido actualizada
            this.serviciosService.notifyServicioUpdated(servicioActualizado);
          },
          (error: any) => {
            console.error('Error al actualizar servicio:', error);
            // Mostrar una notificación o mensaje de error utilizando MatSnackBar
            this.snackBar.open('Error al actualizar servicio', '', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: ['mat-snack-bar-error'], // Clase personalizada para el estilo de error
              horizontalPosition: 'end'
            });
          }
        );
      }
    }

  closeDialog() {
    this.dialogRef.close();
  }

}
