import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/protected/services/proveedor.service';
import { proveedores } from 'src/app/interfaces/interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';

@Component({
  selector: 'app-dialog-proveedores',
  templateUrl: './dialog-proveedores.component.html',
  styleUrls: ['./dialog-proveedores.component.css']
})
export class DialogProveedoresComponent implements OnInit {
  proveedorForm!: FormGroup; // Agrega una propiedad para almacenar los datos del formulario

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogProveedoresComponent>,
    private proveedorService: ProveedorService,
    private apiRequest: ApiRequestService,
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
      this.apiRequest.createProveedor(nuevoProveedor).subscribe(
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
}
