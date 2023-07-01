import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { servicios } from 'src/app/protected/interfaces/interfaces';
import { ServicioService } from 'src/app/protected/services/servicio.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-servicios',
  templateUrl: './dialog-servicios.component.html',
  styleUrls: ['./dialog-servicios.component.css']
})

export class DialogServiciosComponent implements OnInit {

  servicioForm!: FormGroup;

  constructor(
    private serviciosService: ServicioService,
    public dialogRef: MatDialogRef<DialogServiciosComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
      this.servicioForm = this.formBuilder.group({
        nombre: [],
        tipo_egreso: []
      })
  }

  onSubmit() {
    console.log('Submit button clicked')
    if (this.servicioForm.valid) {
      const nuevoServicio: servicios = this.servicioForm.value;
      this.serviciosService.createServicio(nuevoServicio).subscribe(
        (response) => {
          // Sucursal creada con éxito
          console.log(response);

          this.snackBar.open('Servicio registrada correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

          this.dialogRef.close();
  
          // Notificar a SucursalesComponent que se ha creado una nueva sucursal
          this.serviciosService.notifyServicioCreated(nuevoServicio);
        },
        (error) => {
          // Error al crear la sucursal
          console.error(error);
          this.snackBar.open('Error al registrar la servicio', '', {
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
