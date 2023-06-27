import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sucursal } from 'src/app/interfaces/interface';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';
import { SucursalesService } from 'src/app/protected/services/sucursales.service';

@Component({
  selector: 'app-dialog-editar-sucursal',
  templateUrl: './dialog-editar-sucursal.component.html',
  styleUrls: ['./dialog-editar-sucursal.component.css']
})
export class DialogEditarSucursalComponent {
  sucursalForm!: FormGroup;
  sucursal: sucursal; // Variable para almacenar los datos de la sucursal

  constructor(
    public dialogRef: MatDialogRef<DialogEditarSucursalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private apiRequest: ApiRequestService,
    private sucursalService: SucursalesService,
    private snackBar: MatSnackBar) {

    this.sucursal = data; // Asignar los datos del elemento seleccionado a la variable 'sucursal'
    console.log('Datos recibidos:', this.sucursal); // Agregar este console.log

    this.sucursalForm = this.formBuilder.group({
      nombre: [],
      direccion: [],
      codigo_postal: [],
      telefono: []
    });
  }

  actualizarSucursal(): void {
    if (this.sucursalForm.valid) {
      // Obtener el id_sucursal de this.sucursal o desde donde lo obtengas en tu código
      const id_sucursal = this.sucursal.id_sucursal;
      const sucursalActualizada = this.sucursalForm.value;

      // Llamar al servicio de API para actualizar la sucursal
      this.apiRequest.actualizarSucursal(id_sucursal, sucursalActualizada).subscribe(
        (response: any) => {
          console.log('Sucursal actualizada:', response);
          // Mostrar una notificación o mensaje de éxito utilizando MatSnackBar
          this.snackBar.open('Sucursal actualizada correctamente', '', {
            duration: 5000,
            panelClass: ['mat-snack-bar-success'], // Clase personalizada para el estilo de éxito
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          // Cerrar el diálogo
          this.dialogRef.close();

          // Notificar a través del servicio SucursalesService que la sucursal ha sido actualizada
          this.sucursalService.notifySucursalUpdated(sucursalActualizada);
        },
        (error: any) => {
          console.error('Error al actualizar la sucursal:', error);
          // Mostrar una notificación o mensaje de error utilizando MatSnackBar
          this.snackBar.open('Error al actualizar la sucursal', '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['mat-snack-bar-error'], // Clase personalizada para el estilo de error
            horizontalPosition: 'end'
          });
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
