import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private _auth: AuthService,
              private _router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._auth.token !== null) {
      req = req.clone({
        setHeaders: {
          Authorization: this._auth.token
        }
      });
    }
    return next.handle(req)
      .pipe(
      tap({
        error:
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (this._auth.isAuthenticated() && err.status !== 401) {
                return;
              }
              this._router.navigate(['authorization']);
            }
          }
      })
    );
  }
}
