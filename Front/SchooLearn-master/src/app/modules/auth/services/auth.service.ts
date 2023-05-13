import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, Subject, throwError} from "rxjs";
import {tap} from "rxjs/operators"
import {environment} from "../../../../environments/environment";
import {AuthResponseInterface, IAuthUser} from "../interfaces/auth-response.interface";
import {Router} from "@angular/router";
import {User} from "../interfaces/user.interface";
import {IRegistrationUser} from "../interfaces/registration/registration-user.interface";
import { IAuthorizationUser} from "../interfaces/auth/athorization-user.interface";
import {IAuthResponseUserInterface} from "../interfaces/auth/auth-responce-user.interface";
import {Role} from "../enums/role.enum";
import {IRegistrationOrganization} from "../interfaces/registration/registration-organization.interface";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Injectable()
export class AuthService {
  private _token: string | null = null;
  public error$: Subject<string> = new Subject<string>();
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private _http: HttpClient, private _router: Router) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();

    this.userSubject2 = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
  }

  register(user: IAuthUser): Observable<IAuthUser> {
    return this._http.post<IAuthUser>('/regist', user) //TODO: ПОМЕНЯТЬ ПУТЬ
  }

  login(user: IAuthUser): Observable<AuthResponseInterface> {
    console.log(user);
    //TODO: добавить прохи --proxy-config proxy.conf.json
    return this._http.post<AuthResponseInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((value) => {
          console.log(value)
          this.setToken(value);
        }),
        catchError(this.handleError.bind(this))
      )
  }

  private setToken(response: AuthResponseInterface | null): void { //Сделал приватным, надеюсь ничего не упало )) упало)) сейчас не падает
    if (response) {
      if(!!response.expiresIn) {
        const expDate: Date = new Date(new Date().getTime() + parseInt(response.expiresIn) * 1000);
        localStorage.setItem('token-exp', expDate.toString());
      }
      this._token = response.idToken;
      localStorage.setItem('token', response.idToken);
    } else {
      localStorage.clear();
      this._token = null;
      this.userSubject.next(null);
    }
  }

  get token() : string | null {
    const strDateExp: string | null = localStorage.getItem('token-exp');
    if (strDateExp !== null) {
      if (new Date() > new Date(strDateExp)) {
        this.logout();
        return null;
      }
    }
    return localStorage.getItem('token');
  }

  get userValue() {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean { //TODO: сделать проверку валидности токена
    return !!this.token;
    // return this.token !== null;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет');
        break;
    }
    return throwError(error);
  }

  logout() {
    this.setToken(null); //TODO: сделать переадресацию на авторизацию
  }

  register2(user: IRegistrationUser): Observable<boolean> {
    return this._http.post<boolean>('/regist', user) //Ведется работа над разделением на роли
  }

  registerCompany(company: IRegistrationOrganization): Observable<boolean> {
    return this._http.post<boolean>('/registCompany', company)
  }

  login2(user: IAuthorizationUser): Observable<IAuthResponseUserInterface> {
    console.log(user);
    //TODO: добавить прохи --proxy-config proxy.conf.json
    return this._http.post<IAuthResponseUserInterface>(`${environment.apiUrl}/users/authenticate`, user)
      .pipe(
        tap((value) => {
          console.log(value)
          this.setToken2(value);
        }),
        catchError(this.handleError.bind(this))
      )
  }

  navigateLk(role: Role): void {
    switch (role) {
      case Role.Teacher:
        this._router.navigate(['/lk-teacher']).then(); // переход на лк
        break;
      case Role.Student:
        this._router.navigate(['/lk-student']).then(); // переход на лк
        break;
    }
  }

  private userSubject2: BehaviorSubject<IAuthResponseUserInterface | null>;

  private setToken2(response: IAuthResponseUserInterface | null): void { //Сделал приватным, надеюсь ничего не упало )) упало))
    if (response) {
      if(!!response.expiresIn) {
        const expDate: Date = new Date(new Date().getTime() + parseInt(response.expiresIn) * 1000);
        localStorage.setItem('token-exp', expDate.toString());
      }
      this._token = response.idToken;
      this.userSubject2.next(response);
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', response.idToken);
    } else {
      localStorage.clear();
      this._token = null;
      this.userSubject.next(null);
    }
  }

  get userValue2() {
    let value = localStorage.getItem('user');
    if (value)
      return JSON.parse(value);
    // return this.userSubject2.value;
  }

  get token2() : string | null {
    const strDateExp: string | null = localStorage.getItem('token-exp');
    if (strDateExp !== null) {
      if (new Date() > new Date(strDateExp)) {
        this.logout();
        return null;
      }
    }
    return localStorage.getItem('token');
  }

  // isAuthenticated(): Observable<boolean> {
  //   if(!this._token) {
  //     return of(false);
  //   }
  //   return this._http.get("/api/users/isAuth") //TODO: ПОМЕНЯТЬ URL
  //     .pipe(
  //       switchMap((res: any) => {
  //         return of(res.success);
  //       }),
  //       catchError(() => {
  //         return of(false);
  //       })
  //     )
  // }

}
