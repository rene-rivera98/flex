import { Injectable } from '@angular/core';
import { producto_insumo } from 'src/app/interfaces/interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private insumoCreatedSubject: BehaviorSubject<producto_insumo | null> = new BehaviorSubject<producto_insumo | null>(null);
  public insumoCreated$: Observable<producto_insumo | null> = this.insumoCreatedSubject.asObservable();

  private insumoUpdatedSubject: BehaviorSubject<producto_insumo | null> = new BehaviorSubject<producto_insumo | null>(null);
  public insumoUpdated$: Observable<producto_insumo | null> = this.insumoUpdatedSubject.asObservable();

  constructor() { }

  public notifyInsumoCreated(insumo: producto_insumo) {
    this.insumoCreatedSubject.next(insumo);
  }

  public notifyInsumoUpdated(insumo: producto_insumo) {
    this.insumoUpdatedSubject.next(insumo);
  }

}
