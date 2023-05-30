import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {InfoLkFromTeacherService} from "./info-lk-from-teacher.service";
import {ISubject} from "./info.interfases";

@Injectable({
    providedIn: 'root'
  }
)
export class SubjectResolver implements Resolve<boolean> {
  constructor(private router: Router, private infoLkFromTeacherService: InfoLkFromTeacherService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const subject: string = route.params['subjectId'];
    return this.infoLkFromTeacherService.getSubjects().pipe(map((subjects: ISubject[]) => {
      const subjectsIds: number[] = subjects.map((item) => item.id);

      if (subjectsIds.includes(parseInt(subject))) {
        return true;
      } else {
        this.router.navigateByUrl('/');
        return false;
      }
    }));
  }
}
