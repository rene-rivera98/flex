import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/protected/services/proveedor.service';
import { proveedores } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-proveedores',
  templateUrl: './dialog-proveedores.component.html',
  styleUrls: ['./dialog-proveedores.component.css']
})
export class DialogProveedoresComponent implements OnInit {

  proveedorForm!: FormGroup; // Agrega una propiedad para almacenar los datos del formulario

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
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogProveedoresComponent>,
    private proveedorService: ProveedorService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.proveedorForm = this.formBuilder.group({
      rfc: [],
      nombre: [],
      codigo_postal: [],
      regimen_fiscal: [],
      telefono_fijo: [],
      telefono_movil: [],
      banco: [],
      cuenta_bancaria: [],
      clave_interbancaria: [],
      constancia: [],
      created_at: [],
      updated_at: []
  });

  }
  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('Submit button clicked')
    if (this.proveedorForm.valid) {
      const nuevoProveedor: proveedores = this.proveedorForm.value;
      this.proveedorService.createProveedor(nuevoProveedor).subscribe(
        (response) => {
          // Sucursal creada con éxito
          console.log(response);

          this.snackBar.open('Proveedor registrado correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

          this.dialogRef.close();
  
          // Notificar a SucursalesComponent que se ha creado una nueva sucursal
          this.proveedorService.notifyProveedorCreated(nuevoProveedor);
        },
        (error) => {
          // Error al crear la sucursal
          console.error(error);
          this.snackBar.open('Error al registrar el proveedor', 'Cerrar', {
            duration: 5000,
          });
        }
      );
    }
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
