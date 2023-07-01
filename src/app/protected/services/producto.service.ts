import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { producto_insumo, productos_activo, producto_venta } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //variables
  private baseUrl: string = environment.baseUrl
  
  private insumoCreatedSubject: BehaviorSubject<producto_insumo | null> = new BehaviorSubject<producto_insumo | null>(null);
  public insumoCreated$: Observable<producto_insumo | null> = this.insumoCreatedSubject.asObservable();

  private insumoUpdatedSubject: BehaviorSubject<producto_insumo | null> = new BehaviorSubject<producto_insumo | null>(null);
  public insumoUpdated$: Observable<producto_insumo | null> = this.insumoUpdatedSubject.asObservable();

  private activoCreatedSubject: BehaviorSubject<productos_activo | null> = new BehaviorSubject<productos_activo | null>(null);
  public activoCreated$: Observable<productos_activo | null> = this.activoCreatedSubject.asObservable();

  private activoUpdatedSubject: BehaviorSubject<productos_activo | null> = new BehaviorSubject<productos_activo | null>(null);
  public activoUpdated$: Observable<productos_activo | null> = this.activoUpdatedSubject.asObservable();

  private ventaCreatedSubject: BehaviorSubject<producto_venta | null> = new BehaviorSubject<producto_venta | null>(null);
  public ventaCreated$: Observable<producto_venta | null> = this.ventaCreatedSubject.asObservable();

  private ventaUpdatedSubject: BehaviorSubject<producto_venta | null> = new BehaviorSubject<producto_venta | null>(null);
  public ventaUpdated$: Observable<producto_venta | null> = this.ventaUpdatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  //metodos CRUD INSUMOS
  getInsumos(): Observable<any> {
    const url = `${this.baseUrl}producto/insumo/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query), // Obtener el campo 'query' de la respuesta
      tap((data: any[]) => {
        console.log('Datos de productos:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener los productos:', error);
        throw error;
      })
    );
  }

  createInsumo(insumo: producto_insumo): Observable<any> {
    const url = `${environment.baseUrl}producto/insumo/`;
    return this.http.post(url, insumo);
  }

  updatedInsumo(id_producto: string, insumo: producto_insumo): Observable<any> {
    const url = `${this.baseUrl}producto/insumo/${id_producto}`;
    return this.http.put(url, insumo).pipe(
      tap((data: any) => {
        console.log('Respuesta del PUT:', data);
      }),
      catchError((error: any) => {
        console.error('Error al actualizar servicio:', error);
        throw error;
      })
    );
  }

  //

  getActivos(): Observable<any> {
    const url = `${this.baseUrl}producto/activo/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query), // Obtener el campo 'query' de la respuesta
      tap((data: any[]) => {
        console.log('Datos de productos:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener los productos:', error);
        throw error;
      })
    );
  }

  createActivo(activo: productos_activo): Observable<any> {
    const url = `${environment.baseUrl}producto/activo/`;
    return this.http.post(url, activo);
  }

  updatedActivo(id_producto: string, activo: productos_activo): Observable<any> {
    const url = `${this.baseUrl}producto/activo/${id_producto}`;
    return this.http.put(url, activo).pipe(
      tap((data: any) => {
        console.log('Respuesta del PUT:', data);
      }),
      catchError((error: any) => {
        console.error('Error al actualizar servicio:', error);
        throw error;
      })
    );
  }

  //

  getVentas(): Observable<any> {
    const url = `${this.baseUrl}producto/venta/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query), // Obtener el campo 'query' de la respuesta
      tap((data: any[]) => {
        console.log('Datos de productos:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener los productos:', error);
        throw error;
      })
    );
  }

  createVenta(activo: producto_venta): Observable<any> {
    const url = `${environment.baseUrl}producto/venta/`;
    return this.http.post(url, activo);
  }

  updatedVenta(id_producto: string, venta: producto_venta): Observable<any> {
    const url = `${this.baseUrl}producto/venta/${id_producto}`;
    return this.http.put(url, venta).pipe(
      tap((data: any) => {
        console.log('Respuesta del PUT:', data);
      }),
      catchError((error: any) => {
        console.error('Error al actualizar servicio:', error);
        throw error;
      })
    );
  }
  
  //metodos notificacion para actualizar tabla
  public notifyInsumoCreated(insumo: producto_insumo) {
    this.insumoCreatedSubject.next(insumo);
  }

  public notifyInsumoUpdated(insumo: producto_insumo) {
    this.insumoUpdatedSubject.next(insumo);
  }

  public notifyActivoCreated(activo: productos_activo) {
    this.activoCreatedSubject.next(activo);
  }

  public notifyActivoUpdated(activo: productos_activo) {
    this.activoUpdatedSubject.next(activo);
  }

  public notifyVentaCreated(venta: producto_venta) {
    this.activoCreatedSubject.next(venta);
  }

  public notifyVentaUpdated(venta: producto_venta) {
    this.ventaUpdatedSubject.next(venta);
  }
}
