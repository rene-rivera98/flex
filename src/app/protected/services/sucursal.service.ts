import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { sucursal } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  //variables
  private baseUrl: string = environment.baseUrl

  private sucursalCreatedSubject: BehaviorSubject<sucursal | null> = new BehaviorSubject<sucursal | null>(null);
  public sucursalCreated$: Observable<sucursal | null> = this.sucursalCreatedSubject.asObservable();

  private sucursalUpdatedSubject: BehaviorSubject<sucursal | null> = new BehaviorSubject<sucursal | null>(null);
  public sucursalUpdated$: Observable<sucursal | null> = this.sucursalUpdatedSubject.asObservable();

  private sucursalDeletedSubject: BehaviorSubject<sucursal | null> = new BehaviorSubject<sucursal | null>(null);
  public sucursalDeleted$: Observable<sucursal | null> = this.sucursalDeletedSubject.asObservable();

  constructor(private http: HttpClient) { }

  //metodos CRUD
  getSucursales(): Observable<sucursal[]> {
    const url = `${this.baseUrl}sucursales/`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => response.query.map((sucursal: any) => ({
        id_sucursal: sucursal.id_sucursal,
        nombre: sucursal.nombre,
        direccion: sucursal.direccion,
        codigo_postal: sucursal.codigo_postal,
        telefono: sucursal.telefono,
        created_at: sucursal.created_at,
        updated_at: sucursal.updated_at
      }))),
      tap((data: sucursal[]) => {
        console.log('Datos de sucursales:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener las sucursales:', error);
        throw error;
      })
    );
  }

  getSucursales_(): Observable<sucursal[]> {
    const url = `${this.baseUrl}sucursales/`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => response.query.map((sucursal: any) => ({
        id_sucursal: sucursal.id_sucursal,
        nombre: sucursal.nombre
      }))),
      tap((data: sucursal[]) => {
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
  
  updatedSucursal(id_sucursal: string, sucursal: sucursal): Observable<any> {
    const url = `${this.baseUrl}sucursales/${id_sucursal}`;
    return this.http.put(url, sucursal).pipe(
      tap((data: any) => {
        console.log('Respuesta del PUT:', data);
      }),
      catchError((error: any) => {
        console.error('Error al actualizar la sucursal:', error);
        throw error;
      })
    );
  }

  deletedSucursal(idSucursal: string): Observable<any> {
    const url = `${this.baseUrl}sucursales/desactivar/${idSucursal}`;
    return this.http.delete(url).pipe(
      tap((data: any) => {
        console.log('Respuesta del DELETE:', data);
      }),
      catchError((error: any) => {
        console.error('Error al eliminar la sucursal:', error);
        throw error;
      })
    );
  }

  //metodos notificar cambios
  public notifySucursalCreated(sucursal: sucursal) {
    this.sucursalCreatedSubject.next(sucursal);
  }

  public notifySucursalUpdated(sucursal: sucursal) {
    this.sucursalUpdatedSubject.next(sucursal);
  }

  public notifySucursalDeleted(sucursal: sucursal) {
    this.sucursalDeletedSubject.next(sucursal);
  }
}
