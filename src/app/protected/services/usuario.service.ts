import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //variables
  private baseUrl: string = environment.baseUrl

  private usuarioCreatedSubject: BehaviorSubject<usuario | null> = new BehaviorSubject<usuario | null>(null);
  public usuarioCreated$: Observable<usuario | null> = this.usuarioCreatedSubject.asObservable();

  private usuarioUpdatedSubject: BehaviorSubject<usuario | null> = new BehaviorSubject<usuario | null>(null);
  public usuarioUpdated$: Observable<usuario | null> = this.usuarioUpdatedSubject.asObservable();

  constructor(private http: HttpClient) { }

    //Metodos CRUD
    getUsuarios(activo: boolean): Observable<any> {
      const url = `${this.baseUrl}empleados/?activo_empleado=${activo}`; // Incluye el parámetro activo en la URL
      return this.http.get(url).pipe(
        map((response: any) => response.query.map((usuario: any) =>({
          id_empleado: usuario.id_empleado,
          nombre: usuario.nombre,
          paterno: usuario.paterno,
          materno: usuario.materno,
          celular: usuario.celular,
          email: usuario.email,
          fecha_nacimiento: usuario.fecha_nacimiento,
          departamento: usuario.departamento,
          id_sucursal: usuario.id_sucursal,
          rol: usuario.rol,
          created_at: usuario.created_at,
          updated_at: usuario.updated_at
        }))),
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
  
    updatedUsuario(id_empleado: string, usuario: usuario): Observable<any> {
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

    activateUsuario(id_empleado: string, usuario: usuario): Observable<any>{
      const url = `${this.baseUrl}empleados/activar/${id_empleado}`;
      return this.http.post(url, usuario).pipe(
        tap((data: any) => {
          console.log('Respuesta del PUT:', data);
        }),
        catchError((error: any) => {
          console.error('Error al activar el usuario:', error);
          throw error;
        })
      );
    }

    desactivedUsuario(id_empleado: string): Observable<any> {
      const url = `${this.baseUrl}empleados/desactivar/${id_empleado}`;
      return this.http.delete(url).pipe(
        tap((data: any) => {
          console.log('Respuesta del DELETE:', data);
        }),
        catchError((error: any) => {
          console.error('Error al desactivar el usuario:', error);
          throw error;
        })
      );
    }
    

    //metodos notificar cambios
    public notifyUsuarioCreated(usuario: usuario) {
    this.usuarioCreatedSubject.next(usuario);
    }

    public notifyUsuarioUpdated(usuario: usuario) {
      this.usuarioUpdatedSubject.next(usuario);
    }
}
