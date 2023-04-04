import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Ususario } from 'src/app/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getUsuarios() {
    const authorization = localStorage.getItem('token')!
    const headers = new HttpHeaders({'Authorization': authorization})
    const url = `${this.baseUrl}/users/${''}`
    return this.http.get<Ususario>(url, {headers})
  }

}
