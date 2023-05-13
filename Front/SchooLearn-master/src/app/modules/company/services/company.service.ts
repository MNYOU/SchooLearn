import {Injectable} from "@angular/core";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "../../message/services/message.service";
import {ICompany} from "../interfaces/company.interface";


@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private companiesUrl = `http://localhost:4200/companies`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET companies from the server */
  getCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(this.companiesUrl)
      .pipe(
        tap(_ => this.log('fetched companies')),
        catchError(this.handleError<ICompany[]>('getHeroes', []))
      );
  }

  /** GET company by id. Will 404 if id not found */
  getCompany(id: number): Observable<ICompany> {
    const url = `${this.companiesUrl}/${id}`;
    return this.http.get<ICompany>(url).pipe(
      tap(_ => this.log(`fetched company id=${id}`)),
      catchError(this.handleError<ICompany>(`getCompany id=${id}`))
    );
  }

  /** PUT: update the company on the server */
  updateCompany(company: ICompany): Observable<any> {
    return this.http.put(this.companiesUrl, company, this.httpOptions).pipe(
      tap(_ => this.log(`updated company id=${company.id}`)),
      catchError(this.handleError<any>('updateCompany'))
    );
  }

  /** POST: add a new company to the server */
  addCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(this.companiesUrl, company, this.httpOptions).pipe(
      tap((newCompany: ICompany) => this.log(`added company w/ id=${newCompany.id}`)),
      catchError(this.handleError<ICompany>('addCompany'))
    );
  }

  /** DELETE: delete the company from the server */
  deleteCompany(id: number): Observable<ICompany> {
    const url = `${this.companiesUrl}/${id}`;

    return this.http.delete<ICompany>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted company id=${id}`)),
      catchError(this.handleError<ICompany>('deleteCompany'))
    );
  }

  /** GET companies whose name contains search term */
  searchCompanies(term: string): Observable<ICompany[]> {
    if (!term.trim()) {
      // if not search term, return empty company array.
      return of([]);
    }
    return this.http.get<ICompany[]>(`${this.companiesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found companies matching "${term}"`) :
        this.log(`no companies matching "${term}"`)),
      catchError(this.handleError<ICompany[]>('searchCompanies', []))
    );
  }
}
