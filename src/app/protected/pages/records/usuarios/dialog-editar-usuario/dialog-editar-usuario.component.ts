import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { usuario } from 'src/app/protected/interfaces/interfaces';
import { UsuarioService } from 'src/app/protected/services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-editar-usuario',
  templateUrl: './dialog-editar-usuario.component.html',
  styleUrls: ['./dialog-editar-usuario.component.css']
})
export class DialogEditarUsuarioComponent {

  usuarioForm!: FormGroup;
  usuario: usuario;
  sucursales: any[] = [];
  private apiUrl = `${environment.baseUrl}sucursales/`;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private http: HttpClient) {

    this.usuario = data; // Asignar los datos del elemento seleccionado a la variable 'usuario'
    console.log('Datos recibidos:', this.usuario); // Agregar este console.log

    this.usuarioForm = this.formBuilder.group({
      nombre: [this.usuario.nombre, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      paterno: [this.usuario.paterno, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      materno: [this.usuario.materno, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      celular: [this.usuario.celular, [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: [this.usuario.email, [Validators.required, Validators.email, Validators.pattern('[^@]+@[^@]+\.[a-zA-Z]{2,6}')]],
      fecha_nacimiento: [this.usuario.fecha_nacimiento, Validators.required],
      departamento: [this.usuario.departamento, Validators.required],
      id_sucursal: [this.usuario.id_sucursal, Validators.required],
      rol: [this.usuario.rol, Validators.required]
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

  actualizarUsuario(): void {
    if (this.usuarioForm.valid) {
      // Obtener el id_proveedor de this.sucursal o desde donde lo obtengas en tu código
      const idUsuario = this.usuario.id_empleado;
      const usuarioActualizado = this.usuarioForm.value;

      // Llamar al servicio de API para actualizar la sucursal
      this.usuarioService.updatedUsuario(idUsuario, usuarioActualizado).subscribe(
        (response: any) => {
          console.log('Usuario actualizado:', response);
          this.snackBar.open('Usuario actualizado correctamente', '', {
            duration: 5000,
            panelClass: ['mat-snack-bar-success'],
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.dialogRef.close('registroExitoso');
          this.usuarioService.notifyUsuarioUpdated(usuarioActualizado);
        },
        (error: any) => {
          console.error('Error al actualizar el usuario:', error);
          this.snackBar.open('Error al actualizar el usuario', '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['mat-snack-bar-error'],
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
