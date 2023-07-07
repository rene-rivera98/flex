import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { entradas } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  private baseUrl: string = environment.baseUrl

  private entradaCreatedSubject: BehaviorSubject<entradas | null> = new BehaviorSubject<entradas | null>(null);
  public entradaCreated$: Observable<entradas | null> = this.entradaCreatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  //metodos CRUD
  getEntradas(): Observable<any> {
    const url = `${this.baseUrl}entradas/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query), // Obtener el campo 'query' de la respuesta
      tap((data: any[]) => {
        console.log('Datos de entradas:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener las entradas:', error);
        throw error;
      })
    );
  }

  createEntradas(entrada: entradas): Observable<any> {
    const url = `${environment.baseUrl}entradas/`;
    return this.http.post(url, entrada);
  }


}
