import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {InfoService} from "../../../modules/info-lk/info.service";
import {finalize, Observable, Subscription} from "rxjs";
import {IGroup, } from "../../../modules/info-lk/info.interfases";
import {IInstitution} from "../../../modules/auth/interfaces/auth/auth-responce-user.interface";
import {IRatingUser, RatingService} from "../../../modules/rating/rating.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private infoService: InfoService, private ratingService: RatingService) {
  }

  nickName?: string;
  organization?: IInstitution;
  groups$?: Observable<IGroup[]>;
  currentGroup?: number;
  id: number = 0;
  nameTeacher$?: Observable<string>;
  isOpenAddInGroupBox: boolean = false;
  groupCode: string = "";
  subjectsCount?: number;
  accessionGroupSubscription?: Subscription;
  myRating$?: Observable<IRatingUser>;
  myFullScores$?: Observable<IRatingUser>;
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu?: ElementRef;
  isLoading?: boolean;

  ngOnInit() {
    this.groups$ = this.infoService.getGroups().pipe(finalize(() => console.log(123)));
    let user = this.infoService.getInfoStudent(true);
    this.nickName = user.nickName;
    if (user.institution)
      this.organization = user.institution.name;
    let id = sessionStorage.getItem("id-student-group");
    if (id) {
      this.id = JSON.parse(id);
      this.myRating$ = this.ratingService.getMyRatingInLK(this.id);
    }
    this.myFullScores$ = this.ratingService.getFullRatingScoresFromStudent() // установить значение свойства isLoading в false после получения всех необходимых данных
  }

  ngAfterViewInit() {
    this.renderer.listen('window', 'click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target !== this.toggleButton.nativeElement
        && this.menu
        && target !== this.menu.nativeElement
        && !this.menu.nativeElement.contains(target)
      ) {
        this.isOpenAddInGroupBox = false;
      }
    });
  }

  onFindGroup() {
    sessionStorage.setItem("id-student-group", JSON.stringify(this.id));
    if (this.id) {
      this.nameTeacher$ = this.infoService.getGroupInfo(this.id, true);
    }
    this.myRating$ = this.ratingService.getMyRatingInLK(this.id);
  }

  addInGroup() {
    this.isOpenAddInGroupBox = !this.isOpenAddInGroupBox;
  }

  onAccessionClick() {
    this.accessionGroupSubscription = this.infoService.accessionGroup(this.groupCode).subscribe();
  }

  ngOnDestroy() {
    this.accessionGroupSubscription?.unsubscribe();
  }

  onSubjectsCount(count: number) {
    this.subjectsCount = count;
  }
}
