import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { proveedores } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    { digitos: '002', banco: 'BANAMEX' },
    { digitos: '006', banco: 'BANCOMEXT' },
    { digitos: '009', banco: 'BANOBRAS' },
    { digitos: '012', banco: 'BBVA BANCOMER' },
    { digitos: '014', banco: 'SANTANDER' },
    { digitos: '019', banco: 'BANJERCITO' },
    { digitos: '021', banco: 'HSBC' },
    { digitos: '030', banco: 'BAJIO' },
    { digitos: '032', banco: 'IXE' },
    { digitos: '036', banco: 'INBURSA' },
    { digitos: '037', banco: 'INTERACCIONES' },
    { digitos: '042', banco: 'MIFEL' },
    { digitos: '044', banco: 'SCOTIABANK' },
    { digitos: '058', banco: 'BANREGIO' },
    { digitos: '059', banco: 'INVEX' },
    { digitos: '060', banco: 'BANSI' },
    { digitos: '062', banco: 'AFIRME' },
    { digitos: '072', banco: 'BANORTE' },
    { digitos: '102', banco: 'THE ROYAL BANK' },
    { digitos: '103', banco: 'AMERICAN EXPRESS' },
    { digitos: '106', banco: 'BAMSA' },
    { digitos: '108', banco: 'TOKYO' },
    { digitos: '110', banco: 'JP MORGAN' },
    { digitos: '112', banco: 'BMONEX' },
    { digitos: '113', banco: 'VE POR MAS' },
    { digitos: '116', banco: 'ING' },
    { digitos: '124', banco: 'DEUTSCHE' },
    { digitos: '126', banco: 'CREDIT SUISSE' },
    { digitos: '127', banco: 'AZTECA' },
    { digitos: '128', banco: 'AUTOFIN' },
    { digitos: '129', banco: 'BARCLAYS' },
    { digitos: '130', banco: 'COMPARTAMOS' },
    { digitos: '131', banco: 'BANCO FAMSA' },
    { digitos: '132', banco: 'BMULTIVA' },
    { digitos: '133', banco: 'ACTINVER' },
    { digitos: '134', banco: 'WAL-MART' },
    { digitos: '135', banco: 'NAFIN' },
    { digitos: '136', banco: 'INTERBANCO' },
    { digitos: '137', banco: 'BANCOPPEL' },
    { digitos: '138', banco: 'ABC CAPITAL' },
    { digitos: '139', banco: 'UBS BANK' },
    { digitos: '140', banco: 'CONSUBANCO' },
    { digitos: '141', banco: 'VOLKSWAGEN' },
    { digitos: '143', banco: 'CIBANCO' },
    { digitos: '145', banco: 'BBASE' },
    { digitos: '166', banco: 'BANSEFI' },
    { digitos: '168', banco: 'HIPOTECARIA FEDERAL' },
    { digitos: '600', banco: 'MONEXCB' },
    { digitos: '601', banco: 'GBM' },
    { digitos: '602', banco: 'MASARI' },
    { digitos: '605', banco: 'VALUE' },
    { digitos: '606', banco: 'ESTRUCTURADORES' },
    { digitos: '607', banco: 'TIBER' },
    { digitos: '608', banco: 'VECTOR' },
    { digitos: '610', banco: 'B&B' },
    { digitos: '614', banco: 'ACCIVAL' },
    { digitos: '615', banco: 'MERRILL LYNCH' },
    { digitos: '616', banco: 'FINAMEX' },
    { digitos: '617', banco: 'VALMEX' },
    { digitos: '618', banco: 'UNICA' },
    { digitos: '619', banco: 'MAPFRE' },
    { digitos: '620', banco: 'PROFUTURO' },
    { digitos: '621', banco: 'CB ACTINVER' },
    { digitos: '622', banco: 'OACTIN' },
    { digitos: '623', banco: 'SKANDIA' },
    { digitos: '626', banco: 'CBDEUTSCHE' },
    { digitos: '627', banco: 'ZURICH' },
    { digitos: '628', banco: 'ZURICHVI' },
    { digitos: '629', banco: 'SU CASITA' },
    { digitos: '630', banco: 'CB INTERCAM' },
    { digitos: '631', banco: 'CI BOLSA' },
    { digitos: '632', banco: 'BULLTICK CB' },
    { digitos: '633', banco: 'STERLING' },
    { digitos: '634', banco: 'FINCOMUN' },
    { digitos: '636', banco: 'HDI SEGUROS' },
    { digitos: '637', banco: 'ORDER' },
    { digitos: '638', banco: 'AKALA' },
    { digitos: '640', banco: 'CB JPMORGAN' },
    { digitos: '642', banco: 'REFORMA' },
    { digitos: '646', banco: 'STP' },
    { digitos: '647', banco: 'TELECOMM' },
    { digitos: '648', banco: 'EVERCORE' },
    { digitos: '649', banco: 'SKANDIA' },
    { digitos: '651', banco: 'SEGMTY' },
    { digitos: '652', banco: 'ASEA' },
    { digitos: '653', banco: 'KUSPIT' },
    { digitos: '655', banco: 'SOFIEXPRESS' },
    { digitos: '656', banco: 'UNAGRA' },
    { digitos: '659', banco: 'OPCIONES EMPRESARIALES DEL NOROESTE' },
    { digitos: '901', banco: 'CLS' },
    { digitos: '902', banco: 'INDEVAL' },
    { digitos: '670', banco: 'LIBERTAD' },
    { digitos: '999', banco: 'N/A' }
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogEditarProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
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
        this.proveedorService.updatedProveedor(idProveedor, proveedorActualizado).subscribe(
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

