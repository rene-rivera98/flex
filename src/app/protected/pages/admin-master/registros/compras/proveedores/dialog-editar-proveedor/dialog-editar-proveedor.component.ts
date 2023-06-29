import { Component, Inject } from '@angular/core';
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

  asociacionesBancos = [
    { digitos: '002', banco: 'Banamex (Citibanamex)' },
    { digitos: '006', banco: 'Bancomext' },
    { digitos: '009', banco: 'Santander' },
    { digitos: '012', banco: 'BBVA Bancomer' },
    { digitos: '014', banco: 'Banco Santander' },
    { digitos: '019', banco: 'Inbursa' },
    { digitos: '021', banco: 'HSBC'},
    { digitos: '030', banco: 'Scotiabank'},
    { digitos: '032', banco: 'IXE Banco'},
    { digitos: '036', banco: 'Banco Walmart'},
    { digitos: '037', banco: 'Banca Afirme'},
    { digitos: '042', banco: 'Banco Multiva'},
    { digitos: '044', banco: 'Banco Ahorro Famsa' },
    { digitos: '058', banco: 'BanRegio' },
    { digitos: '059', banco: 'Invex Banco' },
    { digitos: '072', banco: 'Banorte' },
  ];

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
          rfc: [this.proveedor.rfc],
          nombre: [this.proveedor.nombre],
          codigo_postal: [this.proveedor.codigo_postal],
          regimen_fiscal: [this.proveedor.regimen_fiscal],
          telefono_fijo: [this.proveedor.telefono_fijo],
          telefono_movil: [this.proveedor.telefono_movil],
          banco: [this.proveedor.banco],
          clave_interbancaria: [this.proveedor.clave_interbancaria],
          cuenta_bancaria: [this.proveedor.cuenta_bancaria],
          constancia: [this.proveedor.constancia]
      });
    }

    actualizarProveedor(): void {
      if (this.proveedorForm.valid) {
        // Obtener el id_proveedor de this.sucursal o desde donde lo obtengas en tu código
        const idProveedor = this.proveedor.id_proveedor;
        const proveedorActualizado = this.proveedorForm.value;
  
        // Llamar al servicio de API para actualizar la sucursal
        this.apiRequest.actualizarProveedor(idProveedor, proveedorActualizado).subscribe(
          (response: any) => {
            console.log('Proveedor actualizado', response);
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

  onCuentaBancariaInput(): void {
    const cuentaBancariaValue = this.proveedorForm.get('cuenta_bancaria')?.value;

    if (cuentaBancariaValue && cuentaBancariaValue.length >= 3) {
      const primerosTresDigitos = cuentaBancariaValue.substring(0, 3);
      const asociacionBanco = this.asociacionesBancos.find(
        asociacion => asociacion.digitos === primerosTresDigitos
      );

      if (asociacionBanco) {
        this.proveedorForm.get('banco')?.setValue(asociacionBanco.banco);
      } else {
        this.proveedorForm.get('banco')?.setValue('');
      }
    } else {
      this.proveedorForm.get('banco')?.setValue('');
    }
  }
}
