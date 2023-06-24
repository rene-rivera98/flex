import { Injectable } from '@angular/core';
import { sucursal } from 'src/app/interfaces/interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SucursalesService {
  
  private sucursalesSource = new BehaviorSubject<sucursal[]>([]);

  public sucursales$ = this.sucursalesSource.asObservable();

  constructor() { }

  private sucursalCreatedSubject: BehaviorSubject<sucursal | null> = new BehaviorSubject<sucursal | null>(null);

  public sucursalCreated$: Observable<sucursal | null> = this.sucursalCreatedSubject.asObservable();

  public notifySucursalCreated(sucursal: sucursal) {
    this.sucursalCreatedSubject.next(sucursal);
  }

}
