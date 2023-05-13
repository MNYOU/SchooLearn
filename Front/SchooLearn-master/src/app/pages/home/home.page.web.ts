import { Component } from "@angular/core";

@Component({
  selector: "home",
  templateUrl: "home.page.web.html",
  styleUrls: ["home.page.web.scss"]
})
export class HomePageWeb{
  isStudentInfo: boolean = false;
  onStudentInfo(event: boolean) {
    this.isStudentInfo = event;
  }
}
