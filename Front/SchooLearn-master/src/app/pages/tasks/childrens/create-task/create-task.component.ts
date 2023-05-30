import { Component } from '@angular/core';
import {Observable, Subscriber, Subscription} from "rxjs";
import {ICreateTask, IGroup, ISubject} from "../../../../modules/info-lk/info.interfases";
import {InfoLkFromTeacherService} from "../../../../modules/info-lk/info-lk-from-teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  constructor(private formBuilder: FormBuilder,
              private infoLkFromTeacherService: InfoLkFromTeacherService,
              private route: ActivatedRoute,
              private router: Router) { }
  newSubject?: boolean;
  phase: number = 1;
  selectedSubject?: ISubject;
  subjects$?: Observable<ISubject[]>
  groups$?: Observable<IGroup[]>
  idGroup: number = 0;
  lkSubscription?: Subscription;

  public taskForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    difficulty: new FormControl("", Validators.required),
    subject: new FormControl("", Validators.required),
    answer: new FormControl("", Validators.required),
    isExtended: new FormControl(false, Validators.required),
    isPublic: new FormControl(false, Validators.required),
    deadline: new FormControl("", Validators.required),
  });
  loading = false;

  ngOnInit() {
    this.subjects$ = this.infoLkFromTeacherService.getSubjects(true);
    this.route.queryParams.subscribe(params => {
      this.newSubject = params['newSubject'];
      if (this.newSubject) {
        this.subjects$ = this.infoLkFromTeacherService.getSubjects(true);
      }
    });
  }

  editSubject(subject: ISubject) {
    this.selectedSubject = subject;
    this.groups$ = this.infoLkFromTeacherService.getGroups(subject.id);
    this.taskForm.controls['subject'].setValue(subject.name);
  }

  backPhase(){
    if(this.phase === 1){
      this.router.navigate(["lk-teacher"]);
    } else {
      this.phase--;
    }
  }

  nextPhase() {
    if(this.phase < 3)
      this.phase++;
  }

  submit() {
    const data: ICreateTask = {
      name: this.taskForm.controls["name"].value,
      description: this.taskForm.controls["description"].value,
      difficulty:this.taskForm.controls["difficulty"].value,
      subject:this.taskForm.controls["subject"].value,
      answer: this.taskForm.controls["answer"].value,
      isExtended: this.taskForm.controls["isExtended"].value,
      isPublic: this.taskForm.controls["isPublic"].value,
      deadline: this.taskForm.controls["deadline"].value,
    };
    this.loading = true;
    this.lkSubscription = this.infoLkFromTeacherService.addTask(this.idGroup, data).subscribe(
      (data) => {
        this.loading = false;
        this.taskForm.reset();
        this.router.navigate(["/lk-teacher"])
      },
      error => {
        this.loading = false;
        this.taskForm.reset();
        alert("Ошибка, попробуйте еще раз. перепроверьте все")
        console.error(error);
      }
    );
  }

  ngOnDestroy() {
    this.lkSubscription?.unsubscribe();
  }
}
