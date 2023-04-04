import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({ 
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const url = `${this.baseUrl}/auth`
    const body = { username, password }
    return this.http.post(url, body)
  }

  // validarToken():Observable<boolean>{

  // }
}
