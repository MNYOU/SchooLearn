import { Component } from "@angular/core";
import {INavigation, navigation} from "./navbar.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  navList: INavigation[] = navigation;
}


