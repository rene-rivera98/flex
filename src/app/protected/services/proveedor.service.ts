import { Injectable } from '@angular/core';
import { proveedores } from 'src/app/interfaces/interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProveedorService {

  private proveedorCreatedSubject: BehaviorSubject<proveedores | null> = new BehaviorSubject<proveedores | null>(null);
  public proveedorCreated$: Observable<proveedores | null> = this.proveedorCreatedSubject.asObservable();

  private proveedorUpdatedSubject: BehaviorSubject<proveedores | null> = new BehaviorSubject<proveedores | null>(null);
  public proveedorUpdated$: Observable<proveedores | null> = this.proveedorUpdatedSubject.asObservable();

  private proveedorDeletedSubject: BehaviorSubject<proveedores | null> = new BehaviorSubject<proveedores | null>(null);
  public proveedorDeleted$: Observable<proveedores | null> = this.proveedorDeletedSubject.asObservable();

  constructor() { }

  public notifyProveedorCreated(proveedor: proveedores) {
    this.proveedorCreatedSubject.next(proveedor);
  }

  public notifyProveedorUpdated(proveedor: proveedores) {
    this.proveedorUpdatedSubject.next(proveedor);
  }

  public notifyProveedorDeleted(proveedor: proveedores) {
    this.proveedorDeletedSubject.next(proveedor);
  }

}
