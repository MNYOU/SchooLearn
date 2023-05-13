import { Component, EventEmitter, Output } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-registration-form',
  templateUrl: 'registration.open.form.component.html',
  styleUrls: ['registration.open.form.component.scss'],
})
export class RegistrationOpenFormComponent {
  constructor(private route: Router) { }
  @Output() redirectRegistrationPage = new EventEmitter<boolean>();


  role!: string;

  goToRegistrationPage() {
    this.redirectRegistrationPage.emit();
    this.route.navigate([`/registration/${this.role}`]).then();
  }
}

