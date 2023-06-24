import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from 'src/app/interfaces/interface';
import { Observable } from 'rxjs';


@Injectable({ 
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthResponse> {
    const body = { username, password };
    return this.http.post<AuthResponse>(`${environment.baseUrl}empleados/login`, body);
  }
}
