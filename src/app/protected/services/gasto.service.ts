import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { gastos } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  //variables
  private baseUrl: string = environment.baseUrl

  private gastoCreatedSubject: BehaviorSubject<gastos | null> = new BehaviorSubject<gastos | null>(null);
  public gastoCreated$: Observable<gastos | null> = this.gastoCreatedSubject.asObservable();

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

  //metodos de notificacion para actualizar tabla
  public notifyGastoCreated(gasto: gastos) {
    this.gastoCreatedSubject.next(gasto);
  }

}
