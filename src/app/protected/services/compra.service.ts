import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { compra, compra_, complemento_compra } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  //variables
  private baseUrl: string = environment.baseUrl

  private compraCreatedSubject: BehaviorSubject<compra | null> = new BehaviorSubject<compra | null>(null);
  public compraCreated$: Observable<compra | null> = this.compraCreatedSubject.asObservable();

  private compraUpdatedSubject: BehaviorSubject<compra | null> = new BehaviorSubject<compra | null>(null);
  public compraUpdated$: Observable<compra | null> = this.compraUpdatedSubject.asObservable();

  private pagoCreatedSubject: BehaviorSubject<complemento_compra | null> = new BehaviorSubject<complemento_compra | null>(null);
  public pagoCreated$: Observable<complemento_compra | null> = this.pagoCreatedSubject.asObservable();


  constructor(private http: HttpClient) { }

  //metodos CRUD
  getCompras(): Observable<any> {
    const url = `${this.baseUrl}compras/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query),
      tap((data: any[]) => {
        console.log('Datos de compras:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener las compras:', error);
        throw error;
      })
    );
  }

  createCompra(compra: compra): Observable<any> {
    const url = `${environment.baseUrl}compras/`;
    return this.http.post(url, compra);
  }

  updatedCompra(id_compra: string, compra: compra_): Observable<any> {
    const url = `${this.baseUrl}compras/${id_compra}`;
    return this.http.put(url, compra).pipe(
      tap((data: any) => {
        console.log('Respuesta del PUT:', data);
      }),
      catchError((error: any) => {
        console.error('Error al actualizar compra:', error);
        throw error;
      })
    );
  }

  createComplemento(complemento: complemento_compra): Observable<any>{
    const url = `${environment.baseUrl}compras/complemento/`;
    return this.http.post(url, complemento);
  }

  getComplemento(id_compra: string): Observable<any>{
    const url = `${this.baseUrl}compras/suma/${id_compra}`;
    return this.http.get(url).pipe(
      map((response: any) => response.query),
      tap((data: any[]) => {
        console.log('Datos de sumas de complemento:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener las sumas:', error);
        throw error;
      })
    );
  }

  //metodos de notificacion para actualizar tabla
  public notifyCompraCreated(compra: compra) {
    this.compraCreatedSubject.next(compra);
  }

  public notifyCompraUpdated(compra: compra) {
    this.compraUpdatedSubject.next(compra);
  }

  public notifyPagoCreated(pago: complemento_compra) {
    this.pagoCreatedSubject.next(pago);
  }

}
