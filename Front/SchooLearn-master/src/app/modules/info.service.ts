import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthResponseInterface} from "./auth/interfaces/auth-response.interface";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {catchError, Observable, of} from "rxjs";

export interface ISubjectFromLK {
  id: number;
  name: string;
  teacher: string;
  class: string;
  ratingNumber: number;
  score: number;
  tasksCompleted: number;
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  subject: any = {}
  private subjectUrl = `${environment.apiUrl}/subjects`;  // URL to web api
  constructor(private http: HttpClient, private _router: Router) {

  }

  getInfoStudent() {
    let value = localStorage.getItem('user');
    if (value)
      return JSON.parse(value);
  }

  getInfoSubjectFromStudent(subject: string): Observable<ISubjectFromLK> {
    const subjects = localStorage.getItem("subjectsInfo");
    const subjectsInLocal: Record<string, ISubjectFromLK> = subjects !== null ? JSON.parse(subjects) : {};
    if (subjectsInLocal && subjectsInLocal[subject]) {
      return of(subjectsInLocal[subject])
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);

    const body = {
      subject: subject
    };

    return this.http.post<ISubjectFromLK>(`${this.subjectUrl}`, body, { headers }).pipe(
      tap((data) => {
        subjectsInLocal[subject] = data;
        localStorage.setItem("subjectsInfo", JSON.stringify(subjectsInLocal));
      })
    );
  }
}
