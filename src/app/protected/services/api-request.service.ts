import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Ususario } from 'src/app/interfaces/interface';
import { compra } from 'src/app/interfaces/interface';
import { proveedores } from 'src/app/interfaces/interface';

import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getUsuarios():Observable<Ususario> {
    const authorization = localStorage.getItem('token')!
    const headers = new HttpHeaders({'Authorization': authorization})
    const url = `${this.baseUrl}/users/${''}`
    return this.http.get<Ususario>(url, {headers})
  }

  getCompras():Observable<compra> {
    const authorization = localStorage.getItem('token')!
    const headers = new HttpHeaders({'Authorization': authorization})
    const url = `${this.baseUrl}/compras/${''}`
    return this.http.get<compra>(url, {headers})
  }

  getProveedores():Observable<proveedores> {
    const authorization = localStorage.getItem('token')!
    const headers = new HttpHeaders({'Authorization': authorization})
    const url = `${this.baseUrl}/proveedores/${''}`
    return this.http.get<proveedores>(url, {headers})
  }

  getListaProveedores(): Observable<proveedores[]> {
    const authorization = localStorage.getItem('token')!;
    const headers = new HttpHeaders({'Authorization': authorization});
    const url = `${this.baseUrl}/proveedores?select=nombreProveedor/${''}`;
    return this.http.get<proveedores[]>(url, {headers});
  }
  
}







