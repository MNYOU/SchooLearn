import { Component } from '@angular/core';
import {Location} from "@angular/common";
import {InfoLkFromTeacherService} from "../../../../modules/info-lk/info-lk-from-teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of, switchMap} from "rxjs";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {
  constructor(private location: Location,
              private infoLkFromTeacherService: InfoLkFromTeacherService,
              private router: Router,
              private route: ActivatedRoute) { }
  currentSubjectId?: number;
  currentGroupName: string = "";


  ngOnInit() {
    let a: string | null = this.route.snapshot.paramMap.get('subjectId');
    this.currentSubjectId = a ? parseInt(a) : -1;
    // this.route.paramMap.pipe(
    //   switchMap(params => {
    //     let subjectId: string | null =  params.get('subjectId')
    //     this.currentSubjectId = subjectId? parseInt(subjectId) : undefined;
    //     return of();
    //   })
    // );
  }

  backPhase() {
    this.location.back();
  }

  createGroup() {
    if(this.currentSubjectId)
    {
      this.infoLkFromTeacherService.createGroup(this.currentSubjectId, this.currentGroupName);
      this.router.navigate(["tasks/create/subject"], { queryParams: { newGroup: "true"}});
    }
  }
}
