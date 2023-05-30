import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {InformationRoleButtonsComponent} from "../information-role-buttons/information-role-buttons.component";
import {LoginRegistrationFormComponent} from "../login-registration-form/login-registration-form.component";
import {AuthService} from "../../modules/auth/services/auth.service";
import {Role} from "../../modules/auth/enums/role.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu?: ElementRef;

  isEntered: boolean = false;
  nickname: string | undefined = undefined;
  isMenuOpen = false;
  isOpenRegistrationForm: boolean = false;

  constructor(private renderer: Renderer2, private authService: AuthService) {}

  ngOnInit() {
    this.isEntered = this.authService.isAuthenticated();
    if(this.authService.user)
      this.nickname = this.authService.user!.login;
    else {
      this.nickname = undefined;
    }
  }
  ngAfterViewInit() {
    this.renderer.listen('window', 'click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target !== this.toggleButton.nativeElement
        && this.menu
        && target !== this.menu.nativeElement
        && !this.menu.nativeElement.contains(target)
        && !target.closest('app-login-registration-form')
        && !this.isOpenRegistrationForm
      ) {
        this.isMenuOpen = false;
      }
    });
  }

  openRegistrationChanged() {
    this.isOpenRegistrationForm = true;
    setTimeout(() => {
      this.isOpenRegistrationForm = false;
    }, 0);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogin(isLogin: boolean) {
    if(isLogin) {
      this.isEntered = true;
      console.log(this.authService.user);

      if(this.authService.user)
        this.nickname = this.authService.user!.login;
    } else {
      alert("Вы не авторизованы")
    }
  }

  exit() {
    this.nickname = undefined;
    this.authService.logout()
    this.isEntered = false;
  }

  goToLK() {
    const roleString = this.authService.role;
    if(roleString) {
      console.log(roleString)
      const role: Role = roleString as Role;
      this.authService.navigateLk(role);
    }
  }
}
