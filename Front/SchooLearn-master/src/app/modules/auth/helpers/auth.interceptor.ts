// import { SessionStorageService } from '../services/session-storage.service';
// import {Injectable} from "@angular/core";
// import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
// import {Observable, tap} from "rxjs";
// import {Router} from "@angular/router";
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(
//     private _sessionStorageService: SessionStorageService,
//     private router: Router,
//   ) { }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let authReq = req;
//     const sessionData = this._sessionStorageService.getSessionData();
//     if (sessionData?.token) {
//       authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer' + sessionData.token)});
//     }
//
//     return next.handle(authReq).pipe(
//       tap({
//         error:
//           (err: any) => {
//             if (err instanceof HttpErrorResponse) {
//               if (!sessionData?.token && err.status !== 401) {
//                 return;
//               }
//               this.router.navigate(['account/login']);
//             }
//           }
//       })
//     )
//   }
//
// }
