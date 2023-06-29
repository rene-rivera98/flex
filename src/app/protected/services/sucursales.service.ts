import { Injectable } from '@angular/core';
import { sucursal } from 'src/app/interfaces/interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  
  private sucursalCreatedSubject: BehaviorSubject<sucursal | null> = new BehaviorSubject<sucursal | null>(null);
  public sucursalCreated$: Observable<sucursal | null> = this.sucursalCreatedSubject.asObservable();

  private sucursalUpdatedSubject: BehaviorSubject<sucursal | null> = new BehaviorSubject<sucursal | null>(null);
  public sucursalUpdated$: Observable<sucursal | null> = this.sucursalUpdatedSubject.asObservable();

  private sucursalDeletedSubject: BehaviorSubject<sucursal | null> = new BehaviorSubject<sucursal | null>(null);
  public sucursalDeleted$: Observable<sucursal | null> = this.sucursalDeletedSubject.asObservable();

  constructor() { }

  public notifySucursalCreated(sucursal: sucursal) {
    this.sucursalCreatedSubject.next(sucursal);
  }

  public notifySucursalUpdated(sucursal: sucursal) {
    this.sucursalUpdatedSubject.next(sucursal);
  }

  public notifySucursalDeleted(sucursal: sucursal) {
    this.sucursalDeletedSubject.next(sucursal);
  }
  
}
