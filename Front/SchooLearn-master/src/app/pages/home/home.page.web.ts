import { Component } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {IAuthResponseUserInterface} from "../../modules/auth/interfaces/auth/auth-responce-user.interface";
import {IAuthorizationUser} from "../../modules/auth/interfaces/auth/athorization-user.interface";

@Component({
  selector: "home",
  templateUrl: "home.page.web.html",
  styleUrls: ["home.page.web.scss"]
})
export class HomePageWeb{
  constructor(private http: HttpClient ) { }

  isStudentInfo: boolean = false;
  onStudentInfo(event: boolean) {
    this.isStudentInfo = event;
  }
}
