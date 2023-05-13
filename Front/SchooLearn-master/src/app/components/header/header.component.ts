import {Component, ElementRef, ViewChild} from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["header.component.scss"]
})
export class HeaderComponent {
  nickname: string | undefined = undefined;

  isFormVisible: boolean = false;
  loginForm: boolean = false;

  showForm() {
    this.isFormVisible = !this.isFormVisible;
    this.loginForm = this.isFormVisible ;
  }

  registrationForm() {
    this.loginForm = false;
  }
}


