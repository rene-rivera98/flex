import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { inventario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class InventarioService {

  private baseUrl: string = environment.baseUrl

  private inventarioCreatedSubject: BehaviorSubject<inventario | null> = new BehaviorSubject<inventario | null>(null);
  public inventarioCreated$: Observable<inventario | null> = this.inventarioCreatedSubject.asObservable();

constructor(private http: HttpClient) { }

  //metodos CRUD
  getInventario(idAlmacen: number): Observable<any> {
    const url = `${this.baseUrl}almacenes/existencias/${idAlmacen}`; // Reemplaza {id_inventario} con ${idAlmacen}
    return this.http.get(url).pipe(
      map((response: any) => response.query),
      tap((data: any[]) => {
        console.log('Datos de inventarios:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener el inventario:', error);
        throw error;
      })
    );
  }

}
