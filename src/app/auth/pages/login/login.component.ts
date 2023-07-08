import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  login() {
    if (this.formulario.valid) {
      const { username, password } = this.formulario.value;
      this.authService.login(username, password).subscribe(
        (response: any) => {
          // Manejar la respuesta del servicio de autenticación
          console.log(response);
          // Guardar el token en el almacenamiento local o en una variable
          const token = response.detail;
          // Redirigir a la página principal o a otra ruta protegida

          this.snackBar.open('Inicio de sesión exitoso', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
       });

          this.router.navigate(['/protected/administrador']);         
        },
        (error: any) => {
          // Manejar el error en caso de falla en la autenticación
          console.error(error);
            this.snackBar.open('Error: favor de verificar bien su usuario y contraseña', '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['mat-snack-bar-success']
          });

        }
      );
    }
  }

}
