import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { gastos, complemento_gasto } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  //variables
  private baseUrl: string = environment.baseUrl

  private gastoCreatedSubject: BehaviorSubject<gastos | null> = new BehaviorSubject<gastos | null>(null);
  public gastoCreated$: Observable<gastos | null> = this.gastoCreatedSubject.asObservable();

  private gastoUpdatedSubject: BehaviorSubject<gastos | null> = new BehaviorSubject<gastos | null>(null);
  public gastoUpdated$: Observable<gastos | null> = this.gastoUpdatedSubject.asObservable();

  private pagoCreatedSubject: BehaviorSubject<complemento_gasto | null> = new BehaviorSubject<complemento_gasto | null>(null);
  public pagoCreated$: Observable<complemento_gasto | null> = this.pagoCreatedSubject.asObservable();


  constructor(private http: HttpClient) { }

  //metodos CRUD
  getGastos(): Observable<any> {
    const url = `${this.baseUrl}gastos/`;
    return this.http.get(url).pipe(
      map((response: any) => response.query),
      tap((data: any[]) => {
        console.log('Datos de gastos:', data);
      }),
      catchError((error: any) => {
        console.error('Error al obtener las gastos:', error);
        throw error;
      })
    );
  }

  createGasto(gasto: gastos): Observable<any> {
    const url = `${environment.baseUrl}gastos/`;
    return this.http.post(url, gasto);
  }

  updatedGasto(id_gasto: string, gasto: gastos): Observable<any> {
    const url = `${this.baseUrl}gastos/${id_gasto}`;
    return this.http.put(url, gasto).pipe(
      tap((data: any) => {
        console.log('Respuesta del PUT:', data);
      }),
      catchError((error: any) => {
        console.error('Error al actualizar gasto:', error);
        throw error;
      })
    );
  }

  createComplemento(complemento: complemento_gasto): Observable<any>{
    const url = `${environment.baseUrl}gastos/complemento/`;
    return this.http.post(url, complemento);
  }

  getComplemento(id_gasto: string): Observable<any>{
    const url = `${this.baseUrl}gastos/suma/${id_gasto}`;
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
  public notifyGastoCreated(gasto: gastos) {
    this.gastoCreatedSubject.next(gasto);
  }

  public notifyGastoUpdated(gasto: gastos) {
    this.gastoUpdatedSubject.next(gasto);
  }

  public notifyPagoCreated(pago: complemento_gasto) {
    this.pagoCreatedSubject.next(pago);
  }

}
