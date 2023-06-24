import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { sucursal } from 'src/app/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  //METODOS GET
  getUsuarios(): Observable<any> {
    const url = `${this.baseUrl}empleados/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query), // Obtener el campo 'query' de la respuesta
      tap((data: any[]) => {
        console.log('Datos de usuarios:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener los usuarios:', error);
        throw error;
      })
    );
  }

  getSucursales(): Observable<any> {
    const url = `${this.baseUrl}sucursales/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query), // Obtener el campo 'query' de la respuesta
      tap((data: any[]) => {
        console.log('Datos de sucursales:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener las sucursales:', error);
        throw error;
      })
    );
  }

  createSucursal(sucursal: sucursal): Observable<any> {
    const url = `${environment.baseUrl}sucursales`;
    return this.http.post(url, sucursal);
  }
  
}







