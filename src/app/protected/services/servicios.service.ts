import { Injectable } from '@angular/core';
import { servicios } from 'src/app/interfaces/interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private servicioCreatedSubject: BehaviorSubject<servicios | null> = new BehaviorSubject<servicios | null>(null);
  public servicioCreated$: Observable<servicios | null> = this.servicioCreatedSubject.asObservable();
  
  private servicioUpdatedSubject: BehaviorSubject<servicios | null> = new BehaviorSubject<servicios | null>(null);
  public servicioUpdated$: Observable<servicios | null> = this.servicioUpdatedSubject.asObservable();

  private servicioDeletedSubject: BehaviorSubject<servicios | null> = new BehaviorSubject<servicios | null>(null);
  public servicioDeleted$: Observable<servicios | null> = this.servicioDeletedSubject.asObservable();

  constructor() { }

  public notifyServicioCreated(servicio: servicios) {
    this.servicioCreatedSubject.next(servicio);
  }

  public notifyServicioUpdated(servicio: servicios) {
    this.servicioUpdatedSubject.next(servicio);
  }

  public notifyServicioDeleted(servicio: servicios) {
    this.servicioDeletedSubject.next(servicio);
  }
}
