import {AuthService} from "../services/auth.service";
import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Observable, of} from "rxjs";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _router: Router,
    private _auth: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const user = this._auth.userValue2;
    if (this._auth.isAuthenticated() && user) {
      // check if route is restricted by role
      const {roles} = route.data;
      if (roles && !roles.includes(user.role)) {
        // role not authorized so redirect to home page
        alert("нет кабинета с такой ролью!")
        this._router.navigate(['/']);
        return of(false);
      }
      console.log("Успешная авторизация");
      return of(true);
    } else {
      this._router.navigate(['/authorization'], {
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









// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   CanActivateChild,
//   Router,
//   RouterStateSnapshot,
// } from "@angular/router";
// import {Observable, of} from "rxjs";
// import {Injectable} from "@angular/core";
// import {AuthService} from "../services/auth.service";
// import {tap} from "rxjs/operators";
//
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate, CanActivateChild {
//   constructor(private _auth: AuthService,
//               private _router: Router) { }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     if(this._auth.isAuthenticated()) {
//       return of(true);
//     } else {
//       this._router.navigate(['/authorization'], {
//         queryParams: {
//           accessDenied: true,
//         },
//       }); //переход на логин
//       return of(false);
//     }
//   }
//
//   canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return this.canActivate(childRoute, state);
//   }
// }

// import { Injectable } from "@angular/core";
// import { CanActivate, Router } from "@angular/router";
// import { Observable, of, switchMap } from "rxjs";
// import { AuthService } from '../services/auth.service'
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private _auth: AuthService,
//     private _router: Router,
//   ) { }
//
//   public canActivate(): Observable<boolean> {
//     return this._auth.isValidToken()
//       .pipe(
//         switchMap((res: boolean) => {
//             if (!res) {
//               this._router.navigateByUrl("/account");
//             }
//             return of(res)
//           }
//         )
//       )
//   }
// }
