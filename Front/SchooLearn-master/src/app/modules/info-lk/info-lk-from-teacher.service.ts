import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {
  IAppTakFullInfo,
  IAppTask,
  ICreateTask,
  IGroup,
  ISolvedTask,
  ISolvedTaskFullInfo,
  ISubject
} from "./info.interfases";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IAuthResponseUserInterface} from "../auth/interfaces/auth/auth-responce-user.interface";
import {Role} from "../auth/enums/role.enum";
import {ITask} from "../tasks/interfaces/task.itnerface";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InfoLkFromTeacherService {
  private readonly noApi: boolean = false;
  constructor(private http: HttpClient, private _router: Router) { }

  getGroups(id: number, noApi: boolean = false): Observable<IGroup[]> {
    if(this.noApi) {
      const groups: IGroup[] = [{id: 1, name: "nameGroup-1"}, {id: 2, name: "nameGroup-2"}, {id: 3, name: "nameGroup-3"}]
      return of(groups);
    }
    return this.http.get<IGroup[]>(`https://www.schoolearn.store/teacher/groups?subjectId=${id}`);
  }

  getSubjects(noApi: boolean = false): Observable<ISubject[]> {
    if(this.noApi) {
      const groups: ISubject[] = [{id: 1, name: "nameSubject-1"}, {id: 2, name: "nameSubject-2"}, {id: 3, name: "nameSubject-3"}]
      return of(groups);
    }
    return this.http.get<ISubject[]>(`https://www.schoolearn.store/task/subjects`);
  }

  getCode(groupId: number, noApi: boolean = false): Observable<{code: string}>  {
    if(this.noApi) {
      return of({ code: "code-from-group"})
    }
    return this.http.get<{code: string}>(`https://www.schoolearn.store/teacher/group/${groupId}/code`);
  }

  getNewCode(groupId: number, noApi: boolean = false) {
    return this.http.put(`https://www.schoolearn.store/teacher/group/${groupId}/generate-code`, {});
  }

  getInfoUser(noApi: boolean = false) {
    let value = localStorage.getItem('user');
    if (value)
      return JSON.parse(value);
  }

  createSubject(subject: string) {
    return this.http.post<boolean>('https://www.schoolearn.store/teacher/subject/add', subject)
  }
  createGroup(subjectId: number, group: string) {
    let groupName: {name: string } = {
      name: group,
    }
    return this.http.post<boolean>(`https://www.schoolearn.store/teacher/group/create?subjectId=${subjectId}`, groupName)
      .pipe(    catchError(err => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe({
        next: x => console.log(x),
        error: err => console.log(err)
      });
  }

  addTask(groupId: number, task: ICreateTask) {
    return this.http.post<boolean>(`https://www.schoolearn.store/task/add?groupId=${groupId}`, task)
  }
  getSolvedTasksInfoFromTeacher(id: number, noApi: boolean = false): Observable<IAppTask[]> {
    return this.http.get<IAppTask[]>(`https://www.schoolearn.store/task/assigned?groupId=${id}`);
  }
  getSolvedTasksInfoFromTeacherFull(taskId: number): Observable<ISolvedTaskFullInfo> {
    return this.http.get<ISolvedTaskFullInfo>(`https://www.schoolearn.store/task/${taskId}`);
  }

  getCodeFromAdmin(): Observable<{code: string}>  {
    return this.http.get<{code: string}>(`https://www.schoolearn.store/administrator/invitation-code`);
  }

  getNewCodeFromAdmin() {
    return this.http.put(`https://www.schoolearn.store/administrator/invitation-code/new `, {});
  }

  getApplicationStudents(groupId: number): Observable<applicationStudent[]> {
    return this.http.get<applicationStudent[]>(`https://www.schoolearn.store/teacher/group/${groupId}/applications`);
  }

  getConnectedStudents(groupId: number): Observable<applicationStudent[]> {
    return this.http.get<applicationStudent[]>(`https://www.schoolearn.store/teacher/group/${groupId}/all`);
  }
  putConnectedStudentsInGroup(groupId: number, studentId: number, isApproved: boolean) {
    return this.http.put(`https://www.schoolearn.store/teacher/group/${groupId}/application/consider?studentId=${studentId}&isApproved=${isApproved}`, {});
  }
}

export interface applicationStudent {
  id: number,
  nickname: string
}
