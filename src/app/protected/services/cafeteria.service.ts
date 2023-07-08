import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { cafeteria } from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
  })

export class CafeteriaService {

    private baseUrl: string = environment.baseUrl

    private cafeCreatedSubject: BehaviorSubject<cafeteria | null> = new BehaviorSubject<cafeteria | null>(null);
    public cafeCreated$: Observable<cafeteria | null> = this.cafeCreatedSubject.asObservable();


    constructor(private http: HttpClient) { }

    getCafeteria(): Observable<any> {
        const url = `${this.baseUrl}paquetes/cafeteria/`;
        return this.http.get(url).pipe(
          map((response: any) => response.query), // Obtener el campo 'query' de la respuesta
          tap((data: any[]) => {
            console.log('Datos de paquete:', data);
          }),
          catchError((error: any) => {
            console.error('Error al obtener paquete:', error);
            throw error;
          })
        );
      }

      createCafeteria(cafe: cafeteria): Observable<any> {
        const url = `${environment.baseUrl}paquetes/cafeteria`;
        return this.http.post(url, cafe);
      }

      public notifyCafeCreated(cafe: cafeteria) {
        this.cafeCreatedSubject.next(cafe);
      }
    

}
