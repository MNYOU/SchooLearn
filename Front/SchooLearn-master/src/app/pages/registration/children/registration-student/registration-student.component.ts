import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationStudent} from "../../../../modules/auth/interfaces/registration/registration-student.interface";
import {IRegistrationUser} from "../../../../modules/auth/interfaces/registration/registration-user.interface";
import {Observable, Subscription} from "rxjs";
import {AuthService} from "../../../../modules/auth/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  confirmPasswordValidator,
  emailValidator,
  loginValidator,
  passwordValidator,
  usernameValidator
} from "../components/validators";

@Component({
  selector: 'app-registration-student',
  templateUrl: './registration-student.component.html',
  styleUrls: ['./registration-student.component.scss']
})
export class RegistrationStudentComponent {
  constructor(public _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute,
              private fb: FormBuilder) {
  }
  institution$?: Observable<{id: number, name: string}[]>;

  ngOnInit() {
    this.institution$ = this._authService.getInstitution();
  }
  public registrationStudentForm: FormGroup = new FormGroup({
    companyName: new FormControl("", Validators.required),
    studentEmail: new FormControl("", [Validators.required, emailValidator()]),
    studentName: new FormControl("", [Validators.required, usernameValidator()]),
    studentLogin: new FormControl("", [Validators.required, loginValidator()]),
    userPassword: new FormControl("", [Validators.required, passwordValidator()]),
    repeatPassword: new FormControl("", [Validators.required, passwordValidator(), confirmPasswordValidator("userPassword")]),
  });
  phase = 1;
  submitted: boolean = false;
  private _asyncSubscribeRegistration: Subscription = new Subscription(); //TODO: переделать без объявления
  private _asyncSubscribeAuthorization: Subscription = new Subscription();

  onSubmitRegistration() {
    this.submitted = true;
    const data: IRegistrationUser = new RegistrationStudent(
      this.registrationStudentForm.controls["studentName"].value,
      this.registrationStudentForm.controls["studentLogin"].value,
      this.registrationStudentForm.controls["studentEmail"].value,
      4,
      this.registrationStudentForm.controls["userPassword"].value,
      this.registrationStudentForm.controls["repeatPassword"].value,
    );

    this.registrationStudentForm.disable();

    this._asyncSubscribeRegistration = this._authService.registerStudent(data).subscribe({
      next: (value) => {
        this.registrationStudentForm.reset();
        this.submitted = false;
        this._router.navigate(['']);
      },

      error: (error) => {
        console.error("Ошибка регистрации");
        console.log(error);
        this.registrationStudentForm.enable();
        this.submitted = false;
      },
    });
  }

  // myForm!: FormGroup;
  //
  //
  // ngOnInit() {
  //   this.myForm = this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', Validators.email],
  //     age: ['', [Validators.required, Validators.min(18)]],
  //     address: this.fb.group({
  //       street: [''],
  //       city: [''],
  //       state: ['']
  //     })
  //   });
  // }

  nextPhase() {
    this.phase++;
  }

  prevPhase() {
    this.phase--;
  }

  back() {

  }

  ngOnDestroy(): void {
    this._asyncSubscribeRegistration.unsubscribe();
    this._asyncSubscribeAuthorization.unsubscribe();
  }
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  panelColor = new FormControl('red');
}

