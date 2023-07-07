import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { salidas } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class SalidasService {

  private baseUrl: string = environment.baseUrl

  private salidaCreatedSubject: BehaviorSubject<salidas | null> = new BehaviorSubject<salidas | null>(null);
  public salidaCreated$: Observable<salidas | null> = this.salidaCreatedSubject.asObservable();


  constructor(private http: HttpClient) { }

  //metodos CRUD
  getSalidas(): Observable<any> {
    const url = `${this.baseUrl}salidas/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query), // Obtener el campo 'query' de la respuesta
      tap((data: any[]) => {
        console.log('Datos de salidas:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener las salidas:', error);
        throw error;
      })
    );
  }

  createSalidas(salida: salidas): Observable<any> {
    const url = `${environment.baseUrl}salidas/`;
    return this.http.post(url, salida);
  }

}
