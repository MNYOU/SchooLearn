import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Observable, of} from "rxjs";
import {AuthService} from "../auth/services/auth.service";


@Injectable({ providedIn: 'root' })
export class TasksGard implements CanActivate, CanActivateChild {
  constructor(
    private _router: Router,
    private _auth: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const userRole = this._auth.role;
    if (this._auth.isAuthenticated() && userRole) {
      const {roles} = route.data;
      if (roles && !roles.includes(userRole)) {
        alert("нет доступа!")
        this._router.navigate(['/']);
        return of(false);
      }
      return of(true);
    } else {
      alert("Вы не авторизованы")
      this._router.navigate(['/'], {
        queryParams: {
          accessDenied: true,
        },
      }); //переход на логин
      return of(false);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}
