import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { almacenes } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlmacenesService {

  private baseUrl: string = environment.baseUrl

  private almacenCreatedSubject: BehaviorSubject<almacenes | null> = new BehaviorSubject<almacenes | null>(null);
  public almacenCreated$: Observable<almacenes | null> = this.almacenCreatedSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  getAlmacenes(activo: boolean): Observable<any[]> {
    const url = `${this.baseUrl}almacenes/?activo=${activo}`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => response.query),
      tap((data: any[]) => {
        console.log('Datos de almacenes:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener almacenes:', error);
        throw error;
      })
    );
  }

  createAlmacen(almacen: almacenes): Observable<any> {
    const url = `${environment.baseUrl}almacenes/`;
    return this.http.post(url, almacen);
  }

  activatedAlmacen(id_almacen: string, almacen: almacenes): Observable<any>{
    const url = `${this.baseUrl}almacenes/activar/${id_almacen}`;
    return this.http.post(url, almacen).pipe(
      tap((data: any) => {
        console.log('Respuesta del PUT:', data);
      }),
      catchError((error: any) => {
        console.error('Error al activar el almacen:', error);
        throw error;
      })
    );
  }

  desactivedAlmacen(id_almacen: string): Observable<any> {
    const url = `${this.baseUrl}almacenes/desactivar/${id_almacen}`;
    return this.http.delete(url).pipe(
      tap((data: any) => {
        console.log('Respuesta del DELETE:', data);
      }),
      catchError((error: any) => {
        console.error('Error al desactivar el almacen:', error);
        throw error;
      })
    );
  }

  //metodos notificar cambios
  public notifyAlmacenCreated(almacen: almacenes) {
    this.almacenCreatedSubject.next(almacen);
  }
}
