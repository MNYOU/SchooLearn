// https://localhost:7079/task/any?subjectId=1&difficultyId=2
// public long Id { get; set; }
//
// public string Name { get; set; }
//
// public string Description { get; set; }
//
// public SubjectApiModel Subject { get; set; }
//
// public Difficulty Difficulty { get; set; }
//
// public TeacherApiModel Teacher { get; set; }
//
// public InstitutionApiModel Institution { get; set; }
//
// public string? Answer { get; set; }
//
// public bool IsPublic { get; set; }
//
// public bool IsExtendedTask { get; set; }
//
// public DateTime CreationDateTime { get; set; }
//
// public DateTime Deadline { get; set; }
import { Injectable } from '@angular/core';
import { Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { IAppTakFullInfo } from "../info-lk/info.interfases";

@Injectable({
  providedIn: 'root'
})
export class NewTaskService {
  constructor(private http: HttpClient, private _router: Router) { }

  getFreeTask(subjectId: number): Observable<IAppTakFullInfo> {
    return this.http.get<IAppTakFullInfo>(`https://www.schoolearn.store/task/any?subjectId=${subjectId}`);
  }

  checkAnswer(taskId: number, answer: string) {
    return this.http.post(`https://www.schoolearn.store/task/check`, {
      taskId: taskId,
      answer: answer,
    });
  }
}
