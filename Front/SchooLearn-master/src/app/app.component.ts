import {Component, OnInit} from "@angular/core";
import {AuthService} from "./modules/auth/services/auth.service";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  title = 'SchooLearn';
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    // const potentialToken = localStorage.getItem('auth-token');
    // if (potentialToken !== null) {
    //   this._auth.setToken(potentialToken);
    // }
  }
}
