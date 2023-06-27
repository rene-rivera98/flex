import { Injectable } from '@angular/core';
import { usuario } from 'src/app/interfaces/interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioCreatedSubject: BehaviorSubject<usuario | null> = new BehaviorSubject<usuario | null>(null);
  public usuarioCreated$: Observable<usuario | null> = this.usuarioCreatedSubject.asObservable();

  private usuarioUpdatedSubject: BehaviorSubject<usuario | null> = new BehaviorSubject<usuario | null>(null);
  public usuarioUpdated$: Observable<usuario | null> = this.usuarioUpdatedSubject.asObservable();


  constructor() { }

    public notifyUsuarioCreated(usuario: usuario) {
    this.usuarioCreatedSubject.next(usuario);
    }

    public notifyUsuarioUpdated(usuario: usuario) {
      this.usuarioUpdatedSubject.next(usuario);
    }

}
