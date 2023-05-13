import { Injectable } from '@angular/core';
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "../../message/services/message.service";
import {ISubject} from "../interfaces/subject.interface";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http: HttpClient,
              private messageService: MessageService,
              private authService: AuthService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private subjectUrl = `${environment.apiUrl}/subjects`;  // URL to web api

  /** GET Subjects from the server */
  getSubjects(): Observable<ISubject[]> {
    return this.http.get<ISubject[]>(this.subjectUrl)
      .pipe(
        tap(_ => this.log('fetched subjects')),
        catchError(this.handleError<ISubject[]>('getSubjects', []))
      );
  }

  /** GET Subject by id. Will not-found if id not found */
  getSubject(id: number): Observable<ISubject> {
    const url = `${this.subjectUrl}/${id}`;
    return this.http.get<ISubject>(url).pipe(
      tap(_ => this.log(`fetched subject id=${id}`)),
      catchError(this.handleError<ISubject>(`getSubject id=${id}`))
    );
  }

  /** GET Subject by id. Return `undefined` when id not found */
  getSubjectNo404<Data>(id: number): Observable<ISubject> {
    const url = `${this.subjectUrl}/?id=${id}`;
    return this.http.get<ISubject[]>(url)
      .pipe(
        map(subjects => subjects[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} subject id=${id}`);
        }),
        catchError(this.handleError<ISubject>(`getSubject id=${id}`))
      );
  }

  /* GET Subjects whose name contains search term */
  searchSubjects(term: string): Observable<ISubject[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<ISubject[]>(`${this.subjectUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found subjects matching "${term}"`) :
        this.log(`no subjects matching "${term}"`)),
      catchError(this.handleError<ISubject[]>('searchSubjects', []))
    );
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

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getSubject2(subject: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);

    const body = {
      subject: subject
    };

    return this.http.post(`${this.subjectUrl}/subject`, body, { headers });
  }
}
