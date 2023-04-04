import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// importaciones de terceros
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  formulario: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }



  login() {

    // console.log(this.formulario.value);
    const { username, password } = this.formulario.value

    this.authService.login(username, password).subscribe({
      next: (resp: any) => {
        console.log(resp);
        const token = resp.token;
        localStorage.setItem('token', token)
        this.router.navigateByUrl('/dashboard')

      }, error: (error: any) => {
        console.log(error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.error,
          showConfirmButton: false,
          timer: 1500
        })

      }

    })

  };

}




// Swal.fire({
    //   title: 'Espere!',
    //   text: 'Procesando la solucitud',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }

    // })