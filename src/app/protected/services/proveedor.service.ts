import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { proveedores } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private baseUrl: string = environment.baseUrl

  private proveedorCreatedSubject: BehaviorSubject<proveedores | null> = new BehaviorSubject<proveedores | null>(null);
  public proveedorCreated$: Observable<proveedores | null> = this.proveedorCreatedSubject.asObservable();

  private proveedorUpdatedSubject: BehaviorSubject<proveedores | null> = new BehaviorSubject<proveedores | null>(null);
  public proveedorUpdated$: Observable<proveedores | null> = this.proveedorUpdatedSubject.asObservable();

  private proveedorDeletedSubject: BehaviorSubject<proveedores | null> = new BehaviorSubject<proveedores | null>(null);
  public proveedorDeleted$: Observable<proveedores | null> = this.proveedorDeletedSubject.asObservable();

  constructor(private http: HttpClient) { }

  //metodos CRUD

  getProveedores(): Observable<any> {
    const url = `${this.baseUrl}proveedores/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query.map((proveedor: any) => ({
        id_proveedor: proveedor.id_proveedor,
        rfc: proveedor.rfc,
        nombre: proveedor.nombre,
        regimen_fiscal: proveedor.regimen_fiscal,
        banco: proveedor.banco,
        cuenta_bancaria: proveedor.cuenta_bancaria,
        clave_interbancaria: proveedor.clave_interbancaria,
        telefono_fijo: proveedor.telefono_fijo,
        telefono_movil: proveedor.telefono_movil,
        codigo_postal: proveedor.codigo_postal,
        constancia: proveedor.constancia,
        created_at: proveedor.created_at,
        updated_at : proveedor.updated_at
      }))), // Obtener el campo 'query' de la respuesta
      tap((data: any[]) => {
        console.log('Datos de proveedores:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener los proveedores:', error);
        throw error;
      })
    );
  }

  getProveedores_(): Observable<any> {
    const url = `${this.baseUrl}proveedores/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query.map((proveedor: any) => ({
        id_proveedor: proveedor.id_proveedor,
        nombre: proveedor.nombre
      }))), // Obtener el campo 'query' de la respuesta
      tap((data: any[]) => {
        console.log('Datos de proveedores:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener los proveedores:', error);
        throw error;
      })
    );
  }

  createProveedor(proveedor: proveedores): Observable<any> {
    const url = `${environment.baseUrl}proveedores`;
    return this.http.post(url, proveedor);
  }

  updatedProveedor(id_proveedor: string, proveedor: proveedores): Observable<any> {
    const url = `${this.baseUrl}proveedores/${id_proveedor}`;
    return this.http.put(url, proveedor).pipe(
      tap((data: any) => {
        console.log('Respuesta del PUT:', data);
      }),
      catchError((error: any) => {
        console.error('Error al actualizar la sucursal:', error);
        throw error;
      })
    );
  }

  deletedProveedor(idProveedor: string): Observable<any> {
    const url = `${this.baseUrl}proveedores/desactivar/${idProveedor}`;
    return this.http.delete(url).pipe(
      tap((data: any) => {
        console.log('Respuesta del DELETE:', data);
      }),
      catchError((error: any) => {
        console.error('Error al eliminar proveedor:', error);
        throw error;
      })
    );
  }

  //metodos para notificar cambios
  public notifyProveedorCreated(proveedor: proveedores) {
    this.proveedorCreatedSubject.next(proveedor);
  }

  public notifyProveedorUpdated(proveedor: proveedores) {
    this.proveedorUpdatedSubject.next(proveedor);
  }

  public notifyProveedorDeleted(proveedor: proveedores) {
    this.proveedorDeletedSubject.next(proveedor);
  }

  
}
