import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { proveedores } from 'src/app/interfaces/interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';
import { ProveedorService } from 'src/app/protected/services/proveedor.service';

@Component({
  selector: 'app-dialog-editar-proveedor',
  templateUrl: './dialog-editar-proveedor.component.html',
  styleUrls: ['./dialog-editar-proveedor.component.css']
})
export class DialogEditarProveedorComponent  {

  proveedorForm!: FormGroup;
  proveedor!: proveedores;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private apiRequest: ApiRequestService,
    private proveedorService : ProveedorService,
    private snackBar: MatSnackBar
    ) { 

      this.proveedor = data; // Asignar los datos del elemento seleccionado a la variable 'sucursal'
      console.log('Datos recibidos:', this.proveedor);

      this.proveedorForm = this.formBuilder.group({
          rfc: [],
          nombre: [],
          codigo_postal: [],
          regimen_fiscal: [],
          telefono_fijo: [],
          telefono_movil: [],
          banco: [],
          clave_interbancaria: [],
          cuenta_bancaria: [],
          constancia: []
      });
    }

    actualizarProveedor(): void {
      if (this.proveedorForm.valid) {
        // Obtener el id_proveedor de this.sucursal o desde donde lo obtengas en tu código
        const id_proveedor = this.proveedor.id_proveedor;
        const proveedorActualizado = this.proveedorForm.value;
  
        // Llamar al servicio de API para actualizar la sucursal
        this.apiRequest.actualizarSucursal(id_proveedor, proveedorActualizado).subscribe(
          (response: any) => {
            console.log('Sucursal actualizada:', response);
            // Mostrar una notificación o mensaje de éxito utilizando MatSnackBar
            this.snackBar.open('Proveedor actualizado correctamente', '', {
              duration: 5000,
              panelClass: ['mat-snack-bar-success'], // Clase personalizada para el estilo de éxito
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            // Cerrar el diálogo
            this.dialogRef.close();
  
            // Notificar a través del servicio SucursalesService que la sucursal ha sido actualizada
            this.proveedorService.notifyProveedorUpdated(proveedorActualizado);
          },
          (error: any) => {
            console.error('Error al actualizar la sucursal:', error);
            // Mostrar una notificación o mensaje de error utilizando MatSnackBar
            this.snackBar.open('Error al actualizar proveedor', '', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: ['mat-snack-bar-error'], // Clase personalizada para el estilo de error
              horizontalPosition: 'end'
            });
          }
        );
      }
    }

  /* FUNCION CERRAR DIALOG*/
  closeDialog() {
    this.dialogRef.close();
  }
}
