import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { servicios } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  //variables
  private baseUrl: string = environment.baseUrl

  private servicioCreatedSubject: BehaviorSubject<servicios | null> = new BehaviorSubject<servicios | null>(null);
  public servicioCreated$: Observable<servicios | null> = this.servicioCreatedSubject.asObservable();
  
  private servicioUpdatedSubject: BehaviorSubject<servicios | null> = new BehaviorSubject<servicios | null>(null);
  public servicioUpdated$: Observable<servicios | null> = this.servicioUpdatedSubject.asObservable();

  private servicioDeletedSubject: BehaviorSubject<servicios | null> = new BehaviorSubject<servicios | null>(null);
  public servicioDeleted$: Observable<servicios | null> = this.servicioDeletedSubject.asObservable();

  constructor(private http: HttpClient) { }

  //metodos CRUD
  getServicios(): Observable<any> {
    const url = `${this.baseUrl}servicios/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query), // Obtener el campo 'query' de la respuesta
      tap((data: any[]) => {
        console.log('Datos de servicios:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener los servicios:', error);
        throw error;
      })
    );
  }

  createServicio(servicio: servicios): Observable<any> {
    const url = `${environment.baseUrl}servicios/`;
    return this.http.post(url, servicio);
  }

  updatedServicio(id_servicio: string, servicio: servicios): Observable<any> {
    const url = `${this.baseUrl}servicios/${id_servicio}`;
    return this.http.put(url, servicio).pipe(
      tap((data: any) => {
        console.log('Respuesta del PUT:', data);
      }),
      catchError((error: any) => {
        console.error('Error al actualizar servicio:', error);
        throw error;
      })
    );
  }

  deletedServicio(idServicio: string): Observable<any> {
    const url = `${this.baseUrl}servicios/desactivar/${idServicio}`;
    return this.http.delete(url).pipe(
      tap((data: any) => {
        console.log('Respuesta del DELETE:', data);
      }),
      catchError((error: any) => {
        console.error('Error al eliminar servicio:', error);
        throw error;
      })
    );
  }

  //metodos notificar cambios
  public notifyServicioCreated(servicio: servicios) {
    this.servicioCreatedSubject.next(servicio);
  }

  public notifyServicioUpdated(servicio: servicios) {
    this.servicioUpdatedSubject.next(servicio);
  }

  public notifyServicioDeleted(servicio: servicios) {
    this.servicioDeletedSubject.next(servicio);
  }

}
