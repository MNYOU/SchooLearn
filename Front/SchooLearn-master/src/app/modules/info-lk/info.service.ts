import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router} from "@angular/router";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs/operators";
import { Observable, of} from "rxjs";
import {IAppTakFullInfo, IAppTask, IGroup, ISolvedTask, ISolvedTaskFullInfo} from "./info.interfases";


@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private readonly noApi: boolean = false;

  subject: any = {}
  constructor(private http: HttpClient, private _router: Router) { }

  getGroups(subjectId?: number): Observable<IGroup[]> {
    if(subjectId) {
      return this.http.get<IGroup[]>(`https://www.schoolearn.store/student/groups?subjectId=${subjectId}`);
    }
    return this.http.get<IGroup[]>(`https://www.schoolearn.store/student/groups`);
  }

  getGroupInfo(id: number, noApi: boolean = false): Observable<string> {
    if(id === 0) {
      return of();
    }
    if(noApi) {
      return of("teacherName")
    }
    const group = localStorage.getItem("groupInfo");
    const groupInfoInLocal: Record<string, string> = group !== null ? JSON.parse(group) : {};
    if (groupInfoInLocal && Object.entries(groupInfoInLocal).length !== 0 && id.toString() in groupInfoInLocal) {
      return of(groupInfoInLocal[id.toString()])
    }

    return this.http.get<string>(`https://www.schoolearn.store/student/groups/${id}`)
      .pipe(
        tap((data) => {
          groupInfoInLocal[id.toString()] = data;
          localStorage.setItem("groupInfo", JSON.stringify(groupInfoInLocal));
        })
      );
  }

  getSolvedTasksInfo(id: number, noApi: boolean = false): Observable<ISolvedTask[]> {
    if(id === 0) {
      return of();
    }
    if (this.noApi) {
      return of([{id: 1, name: "name-1", scores: 1 }, {id: 2, name: "name-2", scores: 1 }, {id: 3, name: "name-3", scores: 1 }])
    }
    return this.http.get<ISolvedTask[]>(`https://www.schoolearn.store/task/solved?groupId=${id}`);
  }

  getSolvedTaskFullInfo(id: number, noApi: boolean = false): Observable<ISolvedTaskFullInfo> {
    if(id === 0) {
      return of();
    }
    if (this.noApi) {
      const tasksInfo: ISolvedTaskFullInfo = {
        id: 1,
        name: "name-1",
        description: "description-1",
        difficulty: "difficulty-1",
        subject: "subject-1",
        receivedAnswer: "receivedAnswer-1",
        deadline: new Date(),
        scores: 1
      }
      return of(tasksInfo);
    }

    // const solvedTaskFullInfo = localStorage.getItem("solvedTaskFullInfo");
    // const solvedTaskInLocal: ISolvedTaskFullInfo = solvedTaskFullInfo !== null ? JSON.parse(solvedTaskFullInfo) : {};
    // if (solvedTaskInLocal && Object.entries(solvedTaskInLocal).length !== 0 && solvedTaskInLocal.id === id) {
    //   return of(solvedTaskInLocal)
    // }

    return this.http.get<ISolvedTaskFullInfo>(`https://www.schoolearn.store/task/solved/${id}`);
    // .pipe(
    //   tap((data) => {
    //     localStorage.setItem("solvedTaskFullInfo", JSON.stringify(data));
    //   })
    // );
  }
  //IAppTakFullInfo
  getAppTasks(id: number, noApi: boolean = false): Observable<IAppTask[]> {
    if(id === 0) {
      return of();
    }
    if(this.noApi) {
      const tasksInfo: IAppTask[] = [{
        id: 1,
        name: "name-1",
        deadline: new Date(),
      }, {
        id: 2,
        name: "name-2",
        deadline: new Date(),
      }, {
        id: 3,
        name: "name-3",
        deadline: new Date(),
      }
      ]

      if(id === 1) {
        const tasksInfo2: IAppTask[] = []
        return of(tasksInfo2);
      }
      return of(tasksInfo);

    }
    return this.http.get<IAppTask[]>(`https://www.schoolearn.store/task/current?groupId=${id}`);
  }

  getAppTaskFullInfo(id: number, noApi: boolean = false): Observable<IAppTakFullInfo> {
    if(id === 0) {
      return of();
    }
    return this.http.get<IAppTakFullInfo>(`https://www.schoolearn.store/task/${id}`);
  }

  getInfoStudent(noApi: boolean = false) {
    let value = localStorage.getItem('user');
    if (value)
      return JSON.parse(value);
  }
  accessionGroup(codeGroup: string) {
    return this.http.post<boolean>(`https://www.schoolearn.store/student/group/create-application?invitationCode=${codeGroup}`, {})
  }

  changeNickName(newNickName: string) {
    return this.http.put(`https://www.schoolearn.store/account/rename?name=${newNickName}`, {})
  }
  //POST
  // https://localhost:7079/student/group/{groupId}/create-application?invitationCode=gjnbj4

  sendReply(): Observable<any> {
    return of();
  }

  // getInfoSubjectFromStudent(subject: string): Observable<ISubjectFromLK> {
  //   const subjects = localStorage.getItem("subjectsInfo");
  //   const subjectsInLocal: Record<string, ISubjectFromLK> = subjects !== null ? JSON.parse(subjects) : {};
  //   if (subjectsInLocal && subjectsInLocal[subject]) {
  //     return of(subjectsInLocal[subject])
  //   }
  //
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders()
  //     .set('Authorization', 'Bearer ' + token);
  //
  //   const body = {
  //     subject: subject
  //   };
  //
  //   return this.http.post<ISubjectFromLK>(`${this.subjectUrl}`, body, { headers }).pipe(
  //     tap((data) => {
  //       subjectsInLocal[subject] = data;
  //       localStorage.setItem("subjectsInfo", JSON.stringify(subjectsInLocal));
  //     })
  //   );
  // }
}
