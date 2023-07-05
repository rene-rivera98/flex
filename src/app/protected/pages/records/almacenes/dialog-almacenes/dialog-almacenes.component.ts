import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { almacenes } from 'src/app/protected/interfaces/interfaces';
import { AlmacenesService } from 'src/app/protected/services/almacenes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-almacenes',
  templateUrl: './dialog-almacenes.component.html',
  styleUrls: ['./dialog-almacenes.component.css']
})

export class DialogAlmacenesComponent implements OnInit {

  almacenForm!: FormGroup;
  sucursales: any[] = [];

  private apiUrl = `${environment.baseUrl}sucursales/`;
  
  constructor(
    private almacenService: AlmacenesService,
    public dialogRef: MatDialogRef<DialogAlmacenesComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient) { }

  ngOnInit() {
    this.almacenForm = this.formBuilder.group({
      id_sucursal: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    });

    this.fetchSucursales();
  }

  fetchSucursales() {
    this.http.get<any>(this.apiUrl).subscribe(
      (response: any) => {
        if (Array.isArray(response.query)) {
          this.sucursales = response.query.map((sucursal: { id_sucursal: any; nombre: any; }) => ({ id_sucursal: sucursal.id_sucursal, nombre: sucursal.nombre }));
        } else {
          console.error('La respuesta del API no contiene un arreglo de sucursales:', response);
        }
      },
      (error: any) => {
        console.error('Error al obtener las sucursales:', error);
      }
    );
  }

  onSubmit() {
    console.log('Submit button clicked')
    if (this.almacenForm.valid) {
      const nuevoAlmacen: almacenes = this.almacenForm.value;
      this.almacenService.createAlmacen(nuevoAlmacen).subscribe(
        (response) => {
          // Sucursal creada con éxito
          console.log(response);

          this.snackBar.open('Almacen registrada correctamente', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

          this.dialogRef.close();
  
          // Notificar a SucursalesComponent que se ha creado una nueva sucursal
          this.almacenService.notifyAlmacenCreated(nuevoAlmacen);
        },
        (error) => {
          // Error al crear la sucursal
          console.error(error);
          this.snackBar.open('Error al registrar el almacen', '', {
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
