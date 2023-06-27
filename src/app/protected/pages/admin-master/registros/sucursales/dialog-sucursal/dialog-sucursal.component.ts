import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiRequestService } from 'src/app/protected/services/api-request.service';
import { sucursal } from 'src/app/interfaces/interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SucursalesService } from 'src/app/protected/services/sucursales.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-sucursal',
  templateUrl: './dialog-sucursal.component.html',
  styleUrls: ['./dialog-sucursal.component.css']
})
export class DialogSucursalComponent implements OnInit {

  sucursalForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              public dialogRef: MatDialogRef<DialogSucursalComponent>, 
              private apiRequest: ApiRequestService,
              private sucursalService: SucursalesService,
              private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.sucursalForm = this.formBuilder.group({
      nombre: [],
      direccion: [],
      codigo_postal: [],
      telefono: []
    });
  }

  onSubmit() {
    console.log('Submit button clicked')
    if (this.sucursalForm.valid) {
      const nuevaSucursal: sucursal = this.sucursalForm.value;
      this.apiRequest.createSucursal(nuevaSucursal).subscribe(
        (response) => {
          // Sucursal creada con éxito
          console.log(response);

          this.snackBar.open('Sucursal registrada correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

          this.dialogRef.close();
  
          // Notificar a SucursalesComponent que se ha creado una nueva sucursal
          this.sucursalService.notifySucursalCreated(nuevaSucursal);
        },
        (error) => {
          // Error al crear la sucursal
          console.error(error);
          this.snackBar.open('Error al registrar la sucursal', 'Cerrar', {
            duration: 5000,
          });
        }
      );
    }
  }
  

  closeDialog() {
    this.dialogRef.close();
  }

}
