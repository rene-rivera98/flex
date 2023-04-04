import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiRequestService } from '../../services/api-request.service';
import { Ususario } from '../../../interfaces/interface';


import Swal from 'sweetalert2'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: any[] = []

  constructor(private http: HttpClient, private apiRequestService: ApiRequestService) { }

  ngOnInit(): void {
    this.getUsuarios()
  }

  getUsuarios() {
    this.apiRequestService.getUsuarios().subscribe({
      next: (resp: any) => {
        // console.log(resp);
        this.usuarios = resp.usuarios
        // console.log(this.usuarios);
        

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

  crearUser(){
   
  }
}
