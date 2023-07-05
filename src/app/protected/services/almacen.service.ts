import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { almacen } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getAlmacen(): Observable<any> {
    const url = `${this.baseUrl}almacenes/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query), // Obtener el campo 'query' de la respuesta
      tap((data: any[]) => {
        console.log('Datos de almacen:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener almacen:', error);
        throw error;
      })
    );
  }

}
