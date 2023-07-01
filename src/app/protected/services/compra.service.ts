import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { compra } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  //variables
  private baseUrl: string = environment.baseUrl

  private compraCreatedSubject: BehaviorSubject<compra | null> = new BehaviorSubject<compra | null>(null);
  public compraCreated$: Observable<compra | null> = this.compraCreatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  //metodos CRUD
  getCompras(): Observable<any> {
    const url = `${this.baseUrl}compras/`;
    return this.http.get(url).pipe(
      map((response: any) => response),
      tap((data: any[]) => {
        console.log('Datos de compras:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener las compras:', error);
        throw error;
      })
    );
  }

  createCompra(activo: compra): Observable<any> {
    const url = `${environment.baseUrl}compras/`;
    return this.http.post(url, activo);
  }

  //metodos de notificacion para actualizar tabla
  public notifyCompraCreated(compra: compra) {
    this.compraCreatedSubject.next(compra);
  }
}
