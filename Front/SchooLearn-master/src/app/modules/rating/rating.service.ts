import { Injectable } from '@angular/core';
import { Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { IAppTakFullInfo } from "../info-lk/info.interfases";

export interface IRatingUser {
  place: number;
  nickname: string;
  scores: number;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  constructor(private http: HttpClient, private _router: Router) { }
  sort(subjectId: number, groupId: number,fromDate: string,  toDate: string): Observable<IRatingUser[]> {
    if((fromDate === null || toDate === null) && (groupId === null || groupId === 0))
      return this.http.get<IRatingUser[]>(`https://www.schoolearn.store/rating/get?subjectId=${subjectId}`);
    if((fromDate === null || toDate === null) && groupId !== null && groupId !== 0)
      return this.http.get<IRatingUser[]>(`https://www.schoolearn.store/rating/get?groupId=${groupId}&subjectId=${subjectId}`);
    if((groupId === null || groupId === 0) && fromDate !== null && toDate !== null)
      return this.http.get<IRatingUser[]>(`https://www.schoolearn.store/rating/get?&subjectId=${subjectId}&from=${fromDate}&to=${toDate}`);
    return this.http.get<IRatingUser[]>(`https://www.schoolearn.store/rating/get?groupId=${groupId}&subjectId=${subjectId}&from=${fromDate}&to=${toDate}`);
  }

  getMyRating(subjectId: number, groupId: number,fromDate: string,  toDate: string): Observable<IRatingUser> {
    return this.http.get<IRatingUser>(`https://www.schoolearn.store/rating/my?groupId=${groupId}&subjectId=${subjectId}&from=${fromDate}&to=${toDate}`);
  }

  getMyRatingInLK(groupId: number): Observable<IRatingUser> {
    return this.http.get<IRatingUser>(`https://www.schoolearn.store/rating/my?groupId=${groupId}`);
  }

  getFullRatingScoresFromStudent(): Observable<IRatingUser> {
    return this.http.get<IRatingUser>(`https://www.schoolearn.store/rating/my`);
  }
}
