import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { usuario } from 'src/app/protected/interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/protected/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.css']
})
export class DialogUsuarioComponent implements OnInit {

  usuarioForm!: FormGroup;
  sucursales: any[] = [];

  private apiUrl = `${environment.baseUrl}sucursales/`;

  constructor(
    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      paterno: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      materno: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      celular: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[^@]+@[^@]+\.[a-zA-Z]{2,6}')]],
      fecha_nacimiento: ['', Validators.required],
      departamento: ['', Validators.required],
      id_sucursal: ['', Validators.required],
      rol: ['', Validators.required]
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
    console.log('Submit button clicked');
    if (this.usuarioForm.valid) {
      const nuevoUsuario: usuario = this.usuarioForm.value;
      this.createUsuario(nuevoUsuario);
    }
  }

  createUsuario(nuevoUsuario: usuario) {
    this.usuarioService.createUsuario(nuevoUsuario).subscribe(
      (response) => {
        // Usuario creado con éxito
        console.log(response);

        const message = `Usuario registrado correctamente:\r\nUsername: ${response.username}\r\nContraseña temporal: ${response['contraseña temporal']}`;

        this.snackBar.open(message, '', {
          duration: 15000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });

        this.dialogRef.close();

        // Notificar a SucursalesComponent que se ha creado un nuevo usuario
        this.usuarioService.notifyUsuarioCreated(nuevoUsuario);
      },
      (error) => {
        // Error al crear el usuario
        console.error(error);
        this.snackBar.open('Error al registrar usuario', '', {
          duration: 5000,
        });
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
