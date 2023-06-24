// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

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

          this.router.navigate(['/protected/administrador']);         
        },
        (error: any) => {
          // Manejar el error en caso de falla en la autenticación
          console.error(error);
        }
      );
    }
  }
  
}
