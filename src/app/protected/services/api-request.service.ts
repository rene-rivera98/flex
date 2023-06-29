import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { producto_insumo, sucursal } from 'src/app/interfaces/interface';
import { usuario } from 'src/app/interfaces/interface';
import { proveedores } from 'src/app/interfaces/interface';
import { servicios } from 'src/app/interfaces/interface';
import { productos_activo } from 'src/app/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

    //USUARIOS
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

    createUsuario(usuario: usuario): Observable<any> {
      const url = `${environment.baseUrl}empleados/usuario/register`;
      return this.http.post(url, usuario);
    }

    actualizarUsuario(id_empleado: string, usuario: usuario): Observable<any> {
      const url = `${this.baseUrl}empleados/${id_empleado}`;
      return this.http.put(url, usuario).pipe(
        tap((data: any) => {
          console.log('Respuesta del PUT:', data);
        }),
        catchError((error: any) => {
          console.error('Error al actualizar el usuario:', error);
          throw error;
        })
      );
    }
    


    //SUCURSALES
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

    actualizarSucursal(id_sucursal: string, sucursal: sucursal): Observable<any> {
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
    
    eliminarSucursal(idSucursal: string): Observable<any> {
      const url = `${this.baseUrl}sucursales/${idSucursal}`;
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

    //PROVEEDORES
    getProveedores(): Observable<any> {
      const url = `${this.baseUrl}proveedores/`;
      return this.http.get(url).pipe(
        map((response: any) => response.query), // Obtener el campo 'query' de la respuesta
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

    actualizarProveedor(id_proveedor: string, proveedor: proveedores): Observable<any> {
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
    
    eliminarProveedor(idProveedor: string): Observable<any> {
      const url = `${this.baseUrl}proveedores/${idProveedor}`;
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

    //SERVICIOS
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

    actualizarServicio(id_servicio: string, servicio: servicios): Observable<any> {
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

    eliminarServicio(idServicio: string): Observable<any> {
      const url = `${this.baseUrl}servicios/${idServicio}`;
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

    //PRODUCTOS
    getProductos_activo(): Observable<any> {
      const url = `${this.baseUrl}producto/activo`;
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

    getProductos(): Observable<any> {
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

    createProducto(insumo: producto_insumo): Observable<any> {
      const url = `${environment.baseUrl}producto/insumo/`;
      return this.http.post(url, insumo);
    }

    actualizarProducto(id_producto: string, insumo: producto_insumo): Observable<any> {
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
}







