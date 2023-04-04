import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  canActivate(): Observable<boolean> | boolean {
    console.log('canActive');

    return true;
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    return true;
  }
}
 