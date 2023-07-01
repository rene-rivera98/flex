import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { sucursal } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SucursalService } from 'src/app/protected/services/sucursal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-sucursal',
  templateUrl: './dialog-sucursal.component.html',
  styleUrls: ['./dialog-sucursal.component.css']
})
export class DialogSucursalComponent implements OnInit {

  sucursalForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<DialogSucursalComponent>, 
    private sucursalService: SucursalService,
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
      this.sucursalService.createSucursal(nuevaSucursal).subscribe(
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
