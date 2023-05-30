import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {InfoLkFromTeacherService} from "../../modules/info-lk/info-lk-from-teacher.service";
import {Observable, Subscription} from "rxjs";
import { ISubject} from "../../modules/info-lk/info.interfases";
import * as events from "events";
import {InfoService} from "../../modules/info-lk/info.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements AfterViewInit{
  constructor(private infoLkFromTeacherService: InfoLkFromTeacherService, private renderer: Renderer2, private infoService: InfoService) { }
  subjects$?: Observable<ISubject[]>;
  selectedSubjectId: number = 0;
  isEditNickname: boolean = false;
  newNickName: string = "";
  newNickNameSubscription?: Subscription;
  @Input() nickname: string = "";

  @Input() role: string = "";
  @Output() subjectId = new EventEmitter<number>();
  @Output() isApplicationEventEmitter = new EventEmitter<boolean>();
  isApplication: boolean = false;
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu?: ElementRef;
  currentPage = 1;
  productsPerPage = 5;
  ngOnInit() {
    if(this.role === 'teacher') {
      this.subjects$ = this.infoLkFromTeacherService.getSubjects(true);
    }
    let id = sessionStorage.getItem("id-student-subject");
    if(id) {
      this.selectedSubjectId = JSON.parse(id);
    }
  }
  emitSubject(subjectId: number) {
    this.selectedSubjectId = subjectId;
    sessionStorage.setItem("id-student-subject", JSON.stringify(this.selectedSubjectId));
    this.subjectId.emit(subjectId);
  }

  editNickname() {
    setTimeout(() => {
      this.isEditNickname = !this.isEditNickname;
    },0)
  }

  ngAfterViewInit() {
    this.renderer.listen('window', 'click', (e: Event) => {
      const target = e.target as HTMLElement;

      if (
        target !== this.toggleButton.nativeElement
        && !!this.menu
        && target !== this.menu.nativeElement
        && !this.menu.nativeElement.contains(target)
        && this.isEditNickname
      ) {
        console.log(123)
        this.isEditNickname = false;
      }
    });
  }


  changeNickName() {
    this.newNickNameSubscription = this.infoService.changeNickName(this.newNickName).subscribe(
      (data) => {
        console.log(data)
        this.nickname = this.newNickName;
      }
    );
  }

  ngOnDestroy() {
    this.newNickNameSubscription?.unsubscribe();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }


}
