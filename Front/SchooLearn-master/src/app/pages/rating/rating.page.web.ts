import { Component } from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {IGroup, ISubject} from "../../modules/info-lk/info.interfases";
import {InfoLkFromTeacherService} from "../../modules/info-lk/info-lk-from-teacher.service";
import {IRatingUser, RatingService} from "../../modules/rating/rating.service";
import {AuthService} from "../../modules/auth/services/auth.service";
import {Role} from "../../modules/auth/enums/role.enum";
import {InfoService} from "../../modules/info-lk/info.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: "rating",
  templateUrl: "rating.page.web.html",
  styleUrls: ["rating.page.web.scss"],
  providers: [DatePipe]
})

export class RatingPageWeb{
  constructor(private formBuilder: FormBuilder,
              private infoLkFromTeacherService: InfoLkFromTeacherService,
              private ratingService: RatingService, private auth: AuthService, private infoService: InfoService,
              public datepipe: DatePipe) { }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  subjects$?: Observable<ISubject[]>;
  groups$?: Observable<IGroup[]>;
  currentSubjectOption: number = 0;
  currentGroupOption: number = 0;
  ratingList$?: Observable<IRatingUser[]>;

  ngOnInit() {
    this.subjects$ = this.infoLkFromTeacherService.getSubjects();
  }

  onSortSubjectOptionChange() {
    this.currentGroupOption=0;

    if(this.auth.role === Role.Teacher)
      this.groups$ = this.infoLkFromTeacherService.getGroups(this.currentSubjectOption);
    if(this.auth.role === Role.Student)
      this.groups$ = this.infoService.getGroups(this.currentSubjectOption);
  }

  sort() {
    let formattedStartDate= this.datepipe.transform(this.range.controls.start.value, 'yyyy/MM/dd');
    let formattedEndDate =this.datepipe.transform(this.range.controls.end.value, 'yyyy/MM/dd');
    this.ratingList$ = this.ratingService.sort(this.currentSubjectOption, this.currentGroupOption, formattedStartDate!, formattedEndDate!);
    // if(!!this.currentSubjectOption && !!this.currentGroupOption && this.range.controls.start.value && this.range.controls.end.value) {
    //
    // }
  }
}
