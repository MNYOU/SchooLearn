import { Component } from '@angular/core';
import {AuthService} from "../../modules/auth/services/auth.service";
import {IAuthResponseUserInterface} from "../../modules/auth/interfaces/auth/auth-responce-user.interface";

@Component({
  selector: 'app-student-room',
  templateUrl: './student-room.component.html',
  styleUrls: ['./student-room.component.scss']
})
export class StudentRoomComponent {
  constructor(private authService: AuthService) { }
  value: IAuthResponseUserInterface | null | undefined;

  ngOnInit() {
    this.value = this.authService.userValue2;
    console.log(this.value);
  }
}
